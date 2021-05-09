import { Main, ReturnData } from "./main.js";

export class RestAPI
{
    public static async GetStarred(_user: string)
    {
        return await this.AJAX(["users", _user, "starred"])
    }

    public static async GetRepository(_owner: string, _repository: string)
    {
        //I could cut down on the cache a bit here if I tried to seach the cached repositories.
        return await this.AJAX(["repos", _owner, _repository]);
    }

    public static async GetRepositories(_user: string)
    {
        return await this.AJAX(["users", _user, "repos"]);
    }

    private static async AJAX(_path: string[]): Promise<IRestAPIResponse>
    {
        //Cache exists?
        var existingCache = Main.GetCache(`restAPI_${_path.join('_')}`);
        if (existingCache !== false)
        {
            return {
                error: false,
                data: existingCache.data
            };
        }

        //AJAX.
        var ajax: JQuery.jqXHR<any>;
        try
        {
            ajax = jQuery.ajax(
            {
                url: `https://api.github.com/${_path.join('/')}`,
                method: "GET",
                dataType: "json"
            });
            await ajax;
        }
        catch (ex)
        {
            return {
                error: true,
                data: (<JQuery.jqXHR<any>>ex).status,
                request: ex
            };
        }

        //Rate limit.
        var rateLimit = parseInt(ajax.getResponseHeader("x-ratelimit-limit") ?? "NaN");
        var rateLimitUsed = parseInt(ajax.getResponseHeader("x-ratelimit-used") ?? "NaN");
        if (isNaN(rateLimit) || isNaN(rateLimitUsed))
        {
            return {
                error: true,
                data: "RATELIMIT_NOT_FOUND",
                request: ajax
            };
        } 
        else if (rateLimitUsed == rateLimit)
        {
            return {
                error: true,
                data: "RATE_LIMIT_EXCEEDED",
                request: ajax
            };
        }

        //Data errors.
        if (ajax.responseJSON === undefined)
        {
            return {
                error: true,
                data: "NO_DATA_FOUND",
                request: ajax
            };
        }
        else if (ajax.responseJSON.message !== undefined)
        {
            return {
                error: true,
                data: ajax.responseJSON.message,
                request: ajax
            };
        }
        
        //Set cache.
        if (!Main.SetCache(`restAPI_${_path.join('_')}`, ajax.responseJSON, new Date().getTime() + (1*60*60*1000))) //TTL: 1 hour.
        {
            return {
                error: true,
                data: "CACHE_ERROR",
                request: ajax
            };
        }

        //Return data if all was successful.
        return {
            error: false,
            data: ajax.responseJSON,
            request: ajax
        };
    }
}

export interface IRestAPIResponse extends ReturnData
{
    request?: JQuery.jqXHR<any>
}

export interface RestAPIRepository
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
  
export interface ILicense
{
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}
  
export interface IOwner
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