import { Main } from "./assets/js/main.js";

class Index
{
    private pinnedProjects: HTMLTableSectionElement;
    private projectsRatelimit: HTMLParagraphElement;

    constructor()
    {
        new Main();

        this.pinnedProjects = Main.ThrowIfNullOrUndefined(document.querySelector("#pinnedProjects"));
        this.projectsRatelimit = Main.ThrowIfNullOrUndefined(document.querySelector("#projectsRatelimit"));

        jQuery.ajax(
        {
            //The github api is subject to rate limiting (60 per hour without a login per IP, this should be fine though, I'd like to cache the result and then clear them every hour but I cant seem to store it as the response is too big).
            //https://api.github.com/users/kofreadie/starred //Best option as I haven't starred any repos so I can use this to simulate the pins. Unfortunatly it's not in the same order, I'll sort them by most stars.
            //https://api.github.com/users/kofreadie/subscriptions //Not ideal as I watch all of my repos
            //https://api.github.com/repos/kofreadie/bsdatapuller/stargazers -> check if I am watching it (not ideal as id need to loop all repos)
            
            url: `${Main.WEB_ROOT}/assets/sample_data/pinnedRepositories.json`, //For local testing only
            //url: "https://api.github.com/users/kofreadie/starred",
            method: "GET",
            dataType: "json",
            error: Main.ThrowAJAXJsonError,
            success: (response, statusText, request) =>
            {
                var rateLimit = parseInt(request.getResponseHeader("x-ratelimit-limit") ?? "NaN");
                var rateLimitUsed = parseInt(request.getResponseHeader("x-ratelimit-used") ?? "NaN");

                if (isNaN(rateLimit) || isNaN(rateLimitUsed))
                {
                    this.projectsRatelimit.style.display = "none";
                }
                else if (rateLimitUsed == rateLimit)
                {
                    this.projectsRatelimit.style.color = "red";
                    this.projectsRatelimit.style.display = "block";
                    this.projectsRatelimit.innerText = `Rate limit exceeded (${rateLimitUsed} of ${rateLimit}/h)`;
                    return;
                }
                //else if (rateLimitUsed > rateLimit - 10)
                else
                {
                    this.projectsRatelimit.style.color = "rgba(var(--foregroundColour), 1)";
                    this.projectsRatelimit.style.display = "block";
                    this.projectsRatelimit.innerText = `Rate limit ${rateLimitUsed} of ${rateLimit}/h`;
                }

                if (response.message !== undefined)
                {
                    //Error
                }
                else
                {
                    this.DisplayPinnedRepos(response);
                }
            }
        });
    }

    private DisplayPinnedRepos(repos: IGitHubRestAPIRepository[])
    {
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

            container.classList.add("mainContainer");
            title.innerText = repos[i].name;
            description.innerText = repos[i].description;

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

interface IGitHubRestAPIRepository
{
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: IOwner;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage?: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language?: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url?: any;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: ILicense;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
}
  
interface ILicense
{
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}
  
interface IOwner
{
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}