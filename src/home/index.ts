import { Main } from "../assets/js/main.js";
//I could import as 'RestAPI' to add the prefix to the interfaces which I would do but it means I need to type 'RestAPI' twice to access the class in the file.
import { RestAPI, RestAPIRepository, IRestAPIResponse } from "../assets/js/restAPI.js";

class Index
{
    private pinnedProjects: HTMLTableSectionElement;
    private ratelimitText: HTMLParagraphElement;

    constructor()
    {
        new Main();

        this.GetPinnedRepos();

        this.pinnedProjects = Main.ThrowIfNullOrUndefined(document.querySelector("#pinnedProjects"));
        this.ratelimitText = Main.ThrowIfNullOrUndefined(document.querySelector("#ratelimitText"));
    }

    private async GetPinnedRepos()
    {
        var response = await RestAPI.GetStarred("kofreadie")
        if (response.error)
        {
            switch (response.data)
            {
                case "CACHE_ERROR":
                    break;
                default:
                    this.pinnedProjects.style.display = "none";
                    return;
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

        var repos: RestAPIRepository[] = response.data;
            
        //Only display public, non-forked repos by me.
        repos = repos.filter(repo => !repo.private && !repo.fork && repo.owner.id === 60425965);

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

        for (let i = 0, j = 0, tr: HTMLTableRowElement; i < repos.length; i++)
        {
            var td = document.createElement("td");
            var a = document.createElement("a");

            var container = document.createElement("div");
            var title = document.createElement("h3");
            var description = document.createElement("p");
            
            var infoContainer = document.createElement("div");
            var language = document.createElement("span");
            var stars = document.createElement("span");
            var forks = document.createElement("span");

            a.classList.add("bottomStrip");
            a.href = `${Main.WEB_ROOT}/project/${repos[i].name}`;

            container.classList.add("mainContainer");
            title.innerText = repos[i].name;
            description.innerText = repos[i].description;
            description.classList.add("light");

            language.classList.add("light");
            stars.classList.add("light");
            forks.classList.add("light");

            infoContainer.classList.add("infoContainer");
            if (repos[i].language !== undefined)
            {
                language.innerText = `Language: ${repos[i].language!}`;
                infoContainer.appendChild(language);
            }
            if (repos[i].stargazers_count > 0)
            {
                stars.innerText = `Stars: ${repos[i].stargazers_count}`;
                infoContainer.appendChild(stars);
            }
            if (repos[i].forks_count > 0)
            {
                forks.innerText = `Forks: ${repos[i].forks_count}`;
                infoContainer.appendChild(forks);
            }

            container.append(title, description);
            a.append(container, infoContainer);
            td.appendChild(a);

            if (j == 0)
            {
                tr = document.createElement("tr");
                this.pinnedProjects.appendChild(tr);
            }

            tr!.appendChild(td);

            if (++j > 1) { j = 0; }
        }
    }
}
new Index();