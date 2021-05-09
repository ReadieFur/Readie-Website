import { Main } from "../assets/js/main.js";
import { RestAPI, RestAPIRepository } from "../assets/js/restAPI.js";

class Projects
{
    private ratelimitText: HTMLParagraphElement;
    private reposTable: HTMLTableElement;

    constructor()
    {
        new Main();

        this.ratelimitText = Main.ThrowIfNullOrUndefined(document.querySelector("#ratelimitText"));
        this.reposTable = Main.ThrowIfNullOrUndefined(document.querySelector("#repos"));

        this.LoadProjects();
    }

    private async LoadProjects()
    {
        var response = await RestAPI.GetRepositories("kofreadie");
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

        var repos: RestAPIRepository[] = response.data;
            
        //Only display public repos by me.
        repos = repos.filter(repo => !repo.private && repo.owner.id === 60425965);

        //Sort ascending to descending by star count.
        repos.sort((item1, item2) =>
        {
            if (item1.stargazers_count < item2.stargazers_count)
            { return 1; } //Move it up the array one.
            else if (item1.stargazers_count > item2.stargazers_count)
            { return -1; } //Move it down the array by one.
            else
            { return 0; } //Don't move it.
        });

        //Then sort by the most recent push.
        repos.sort((item1, item2) =>
        {
            if (new Date(item1.pushed_at).getTime() < new Date(item2.pushed_at).getTime())
            { return 1; }
            else if (new Date(item1.pushed_at).getTime() > new Date(item2.pushed_at).getTime())
            { return -1; }
            else
            { return 0; }
        });

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
    }
}
new Projects();