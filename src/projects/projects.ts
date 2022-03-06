import { Main } from "../assets/js/main.js";
import { RestAPI, RestAPIRepository } from "../assets/js/restAPI.js";

class Projects
{
    private readonly resultsPerPage = 15;

    private ratelimitText: HTMLParagraphElement;
    private search: HTMLFormElement;
    private searchText: HTMLInputElement;
    private reposTable: HTMLTableElement;
    private pageButtonsContainer: HTMLDivElement;
    private resultsText: HTMLParagraphElement;

    private projectsFilter: IProjectsFilter;
    private projects?: RestAPIRepository[];

    constructor()
    {
        new Main();

        this.ratelimitText = Main.ThrowIfNullOrUndefined(document.querySelector("#ratelimitText"));
        this.search = Main.ThrowIfNullOrUndefined(document.querySelector("#search"));
        this.searchText = Main.ThrowIfNullOrUndefined(document.querySelector("#searchText"));
        this.reposTable = Main.ThrowIfNullOrUndefined(document.querySelector("#repos"));
        this.pageButtonsContainer = Main.ThrowIfNullOrUndefined(document.querySelector("#pages"));
        this.resultsText = Main.ThrowIfNullOrUndefined(document.querySelector("#resultsText"));

        this.projectsFilter =
        {
            sort: "updated",
            data: "",
            page: 1
        };

        this.search.addEventListener("submit", (ev) => { this.UserSearchSubmitted(ev); });

        this.LoadProjects();
    }

    private UserSearchSubmitted(ev: Event)
    {
        ev.preventDefault();
        ev.returnValue = false;

        var searchText = this.searchText.value.split(':');

        if (searchText[1] === "") { Main.Alert("Invalid search."); return; }

        if (searchText[0] === "" && searchText[1] === undefined)
        {
            //Default search.
            this.projectsFilter.sort = "updated";
            this.projectsFilter.data = "false";
        }
        else if (searchText[0] !== "" && searchText[1] === undefined)
        {
            //Assume that the user is searching by project name.
            this.projectsFilter.sort = "name";
            this.projectsFilter.data = searchText[0];
        }
        else if (
            (
                searchText[0] === "name" ||
                searchText[0] === "language" ||
                searchText[0] === "stars" || 
                searchText[0] === "forks"
            ) && (searchText[1] !== "" || searchText[1] !== undefined)
        )
        {
            this.projectsFilter.sort = searchText[0];
            this.projectsFilter.data = searchText[1];
        }
        else
        {
            Main.Alert("Invalid search filter.");
        }

        this.DisplayProjects();
    }

    private async LoadProjects()
    {
        var response = await RestAPI.GetRepositories("readiefur");
        if (response.error)
        {
            switch (response.data)
            {
                case "CACHE_ERROR":
                    break;
                case "RATE_LIMIT_EXCEEDED":
                    Main.Alert(Main.GetErrorMessage(response.data));
                    await Main.Sleep(1000);
                    window.location.href = `${Main.WEB_ROOT}/`;
                    break;
                default:
                    Main.Alert(Main.GetErrorMessage(response.data));
                    await Main.Sleep(1000);
                    window.location.href = `${Main.WEB_ROOT}/projects/`;
                    break;
            }
        }

        if (response.request !== undefined)
        {
            //These numbers shouldn't ever be NAN as they were checked for in RestAPI.ts
            var rateLimit = parseInt(response.request.getResponseHeader("x-ratelimit-limit")!);
            var rateLimitUsed = parseInt(response.request.getResponseHeader("x-ratelimit-used")!);
    
            if (rateLimitUsed > rateLimit - 10)
            {
                this.ratelimitText.style.color = "rgba(var(--foregroundColour), 1)";
                this.ratelimitText.innerText = `Rate limit ${rateLimitUsed} of ${rateLimit}/h`;
                this.ratelimitText.style.display = "block";
            }
        }

        //Only display public repos by me.
        this.projects = (<RestAPIRepository[]>response.data).filter(repo => !repo.private && repo.owner.id === 60425965);

        this.DisplayProjects();
    }

    //This shouldn't have issues with the filter data changing while it is running.
    private DisplayProjects(/*filter: IProjectsFilter*/)
    {
        if (this.projects === undefined) { return; }

        var repos = this.projects;

        //When this is true it will be sorted oldest to newest, when false it will be newest to oldest.
        var pushAscending = this.projectsFilter.sort === "updated" &&
            (
                this.projectsFilter.data === "asc" ||
                this.projectsFilter.data === "ascending" ||
                this.projectsFilter.data === "true"
            ) ? true : false;
        repos.sort((item1, item2) =>
        {
            if (new Date(item1.pushed_at).getTime() < new Date(item2.pushed_at).getTime())
            { return pushAscending ? -1 : 1; }
            else if (new Date(item1.pushed_at).getTime() > new Date(item2.pushed_at).getTime())
            { return pushAscending ? 1 : -1; }
            else { return 0; }
        });

        //Apply any additional sorts.
        switch (this.projectsFilter.sort)
        {
            case "name":
                //Filter out results that match less than 25% of the search.
                repos = repos.filter(repo => Main.CompareStringSimilarity(repo.name, this.projectsFilter.data) > 0.25);

                //Sort the items by similarity.
                repos.sort((item1, item2) =>
                {
                    var item1Similarity = Main.CompareStringSimilarity(item1.name, this.projectsFilter.data);
                    var item2Similarity = Main.CompareStringSimilarity(item2.name, this.projectsFilter.data);

                    if (item1Similarity < item2Similarity)
                    { return 1; } //Move it up the array one.
                    else if (item1Similarity > item2Similarity)
                    { return -1; } //Move it down the array by one.
                    else { return 0; } //Don't move it.
                });
                break;
            case "language":
                //Filter out results that match less than 25% of the search.
                repos = repos.filter(repo => Main.CompareStringSimilarity(repo.language??"", this.projectsFilter.data) > 0.25);
                
                //Sort the items by similarity.
                repos.sort((item1, item2) =>
                {
                    var item1Similarity = Main.CompareStringSimilarity(item1.language??"", this.projectsFilter.data);
                    var item2Similarity = Main.CompareStringSimilarity(item2.language??"", this.projectsFilter.data);

                    if (item1Similarity < item2Similarity)
                    { return 1; } //Move it up the array one.
                    else if (item1Similarity > item2Similarity)
                    { return -1; } //Move it down the array by one.
                    else { return 0; } //Don't move it.
                });
                break;
            case "stars":
                var starsAscending =
                    this.projectsFilter.data === "asc" ||
                    this.projectsFilter.data === "ascending" ||
                    this.projectsFilter.data === "true"
                    ? true : false;

                repos.sort((item1, item2) =>
                {
                    if (item1.stargazers_count < item2.stargazers_count)
                    { return starsAscending ? -1 : 1; }
                    else if (item1.stargazers_count > item2.stargazers_count)
                    { return starsAscending ? 1 : -1; }
                    else { return 0; }
                });
                break;
            case "forks":
                var forksAscending =
                    this.projectsFilter.data === "asc" ||
                    this.projectsFilter.data === "ascending" ||
                    this.projectsFilter.data === "true"
                    ? true : false;

                repos.sort((item1, item2) =>
                {
                    if (item1.forks_count < item2.forks_count)
                    { return forksAscending ? -1 : 1; }
                    else if (item1.forks_count > item2.forks_count)
                    { return forksAscending ? 1 : -1; }
                    else { return 0; }
                });
                break;
            default:
                //The push sort is always done first for all sorts.
                break;
        }

        //#region Results text.
        this.resultsText.innerText = `Showing results: ${
            repos.length === 0 ? 0 : ((this.projectsFilter.page - 1) * this.resultsPerPage) + 1} - ${
            (this.projectsFilter.page - 1) * this.resultsPerPage + (repos.length < this.resultsPerPage ? repos.length : this.resultsPerPage)} of ${repos.length}`;
        //#endregion

        //#region Page buttons.
        var pageNumbers: number[] = [];
        if (repos.length > 15)
        {
            var pagesAroundCurrent = 2;
            var pages = repos.length / this.resultsPerPage;
            if (pages > 0 && pages < 1) { pages = 1; }
            else if (pages % 1 != 0) { pages = Math.trunc(pages) + 1; } //Can't have half a page, so make a new one.

            //I could simplify this but it would make it harder to read.
            var lowerPage = this.projectsFilter.page - pagesAroundCurrent;
            var upperPage = this.projectsFilter.page + pagesAroundCurrent;

            //Just in case something bad happens and I end up with decimals I don't want those to show as the page numbers (Math.trunc).

            pageNumbers.push(1);

            for (let i = lowerPage; i < this.projectsFilter.page; i++)
            {
                if (i <= 1) { continue; }
                pageNumbers.push(Math.trunc(i));
            }

            if (this.projectsFilter.page != 1 && this.projectsFilter.page != pages) { pageNumbers.push(Math.trunc(this.projectsFilter.page)); }

            for (let i = this.projectsFilter.page + 1; i <= upperPage; i++)
            {
                if (i >= pages) { break; }
                pageNumbers.push(Math.trunc(i));
            }

            pageNumbers.push(pages);
        }
        else if (repos.length > 0)
        {
            this.projectsFilter.page = 1;
            pageNumbers.push(1);
        }
        else
        {
            this.projectsFilter.page = 0;
        }

        this.pageButtonsContainer.innerHTML = "";
        pageNumbers.forEach(page =>
        {
            var button = document.createElement("button");
            button.innerText = page.toString();

            //It's not ideal to run this if statment every loop but I don't want to rewrite this whole section for one less line.
            if (pageNumbers.length == 1) { button.classList.add("ignore"); }

            if (page == this.projectsFilter.page) { button.classList.add("active"); }
            else
            {
                button.onclick = () =>
                {
                    this.projectsFilter.page = page;
                    this.DisplayProjects();
                }
            }

            this.pageButtonsContainer.appendChild(button);
        });
        //#endregion

        //#region Projects.
        this.reposTable.tBodies[1]!.innerHTML = "";
        repos.forEach(repo =>
        {
            var tr = document.createElement("tr");
            var projectCell = document.createElement("td");
            var projectName = document.createElement("h4");
            var descriptionCell = document.createElement("td");
            var detailsCell = document.createElement("td");
            var license = document.createElement("p");
            var language = document.createElement("span");
            var stars = document.createElement("span");
            var forks = document.createElement("span");
            var updatedAt = document.createElement("p");

            //Project name.
            projectName.innerText = repo.name;
            projectCell.appendChild(projectName);
            projectCell.classList.add("projectColumn");

            //Project description.
            descriptionCell.innerText = repo.description;
            descriptionCell.classList.add("descriptionColumn");

            //Project details.
            license.innerText = !Main.IsNullOrUndefined(repo.license) ? repo.license!.name : "";
            language.innerText = `Language: ${repo.language ?? ""}`;
            stars.innerText = `Stars: ${repo.stargazers_count.toString()}`;
            forks.innerText = `Forks: ${repo.forks_count.toString()}`;

            var date = Main.TimeSinceString(new Date(repo.pushed_at));
            var datePrefix: string = "Updated ";
            for (let i = 0; i < Main.months.length; i++) { if (date.startsWith(Main.months[i])) { datePrefix += "on "; } }
            updatedAt.innerText = `${datePrefix}${date}`;

            if (Main.IsNullOrUndefined(repo.license)) { license.style.display = "none"; }
            if (Main.IsNullOrUndefined(repo.language)) { language.style.display = "none"; }
            if (repo.stargazers_count <= 0) { stars.style.display = "none"; }
            if (repo.forks_count <= 0) { forks.style.display = "none"; }

            language.classList.add("light");
            stars.classList.add("light");
            forks.classList.add("light");
            updatedAt.classList.add("light");

            detailsCell.append(license, language, stars, forks, updatedAt);
            detailsCell.classList.add("detailsColumn");

            //Build table row.
            tr.append(projectCell, descriptionCell, detailsCell);
            tr.onclick = () => { window.location.href = `${Main.WEB_ROOT}/project/${repo.name}`; };
            tr.classList.add("listItem");
            this.reposTable.tBodies[1]!.appendChild(tr);
        });
        //#endregion
    }
}
new Projects();

interface IProjectsFilter
{
    sort: "name" | "language" | "stars" | "forks" | "updated",
    data: string,
    page: number,
}