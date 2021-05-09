import { Main } from "../assets/js/main.js";
import { RestAPI, RestAPIRepository } from "../assets/js/restAPI.js";

class Project
{
    private ratelimitText: HTMLParagraphElement;
    private title: HTMLHeadElement;
    private description: HTMLParagraphElement;
    private license: HTMLParagraphElement;
    private projectHome: HTMLLinkElement;
    private githubSource: HTMLLinkElement;
    private language: HTMLSpanElement;
    private stars: HTMLSpanElement;
    private forks: HTMLSpanElement;
    private updatedAt: HTMLParagraphElement;
    private readmeContainer: HTMLTableElement;
    private readmeContents: HTMLDivElement;

    constructor()
    {
        new Main();

        var path = window.location.pathname.split('/').filter((part) => { return part != ""; });
        if (path[path.length - 1] === "project" || path[path.length - 2] !== "project")
        { window.location.href = `${Main.WEB_ROOT}/projects/`; }

        this.ratelimitText = Main.ThrowIfNullOrUndefined(document.querySelector("#ratelimitText"));
        this.title = Main.ThrowIfNullOrUndefined(document.querySelector("#title"));
        this.description = Main.ThrowIfNullOrUndefined(document.querySelector("#description"));
        this.license = Main.ThrowIfNullOrUndefined(document.querySelector("#license"));
        this.projectHome = Main.ThrowIfNullOrUndefined(document.querySelector("#projectHome"));
        this.githubSource = Main.ThrowIfNullOrUndefined(document.querySelector("#githubSource"));
        this.language = Main.ThrowIfNullOrUndefined(document.querySelector("#language"));
        this.stars = Main.ThrowIfNullOrUndefined(document.querySelector("#stars"));
        this.forks = Main.ThrowIfNullOrUndefined(document.querySelector("#forks"));
        this.updatedAt = Main.ThrowIfNullOrUndefined(document.querySelector("#updatedAt"));
        this.readmeContainer = Main.ThrowIfNullOrUndefined(document.querySelector("#readmeContainer"));
        this.readmeContents = Main.ThrowIfNullOrUndefined(document.querySelector("#readmeContents"));

        this.LoadProject(path[path.length - 1]);
    }

    private async LoadProject(_projectName: string)
    {
        var response = await RestAPI.GetRepository("kofreadie", _projectName);
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

        var project: RestAPIRepository = response.data;

        //Only display public repos by me.
        if (project.private || project.owner.id !== 60425965)
        {
            Main.Alert("Invalid repository");
            await Main.Sleep(1000);
            window.location.href = `${Main.WEB_ROOT}/projects/`;
        }
        
        this.title.innerText = project.name;
        this.description.innerText = project.description;
        this.license.innerText = !Main.IsNullOrUndefined(project.license) ? project.license!.name : "";
        this.projectHome.href = project.homepage ?? "";
        this.githubSource.href = project.html_url;
        this.language.innerText = `Language: ${project.language ?? ""}`;
        this.stars.innerText = `Stars: ${project.stargazers_count.toString()}`;
        this.forks.innerText = `Forks: ${project.forks_count.toString()}`;

        var date = Main.TimeSinceString(new Date(project.pushed_at));
        var datePrefix: string = "Updated ";
        for (let i = 0; i < Main.months.length; i++) { if (date.startsWith(Main.months[i])) { datePrefix += "on "; } }
        this.updatedAt.innerText = `${datePrefix}${date}`;
        
        if (Main.IsNullOrUndefined(project.license)) { this.license.style.display = "none"; }
        if (Main.IsNullOrUndefined(project.homepage) || project.homepage == "")
        {
            this.projectHome.style.display = "none";
            this.githubSource.classList.add("ignore");
        }
        if (Main.IsNullOrUndefined(project.language)) { this.language.style.display = "none"; }
        if (project.stargazers_count <= 0) { this.stars.style.display = "none"; }
        if (project.forks_count <= 0) { this.forks.style.display = "none"; }

        //Load project readme if it exists.
        var readmeMD: string | false = await jQuery.ajax(
        {
            url: `https://raw.githubusercontent.com/kOFReadie/${_projectName}/${project.default_branch}/README.md`,
            method: "GET",
            dataType: "text",
        })
        .catch((ex) => { return false; });
        if (typeof(readmeMD) === "string")
        {
            //I don't know why intellisense dosen't see this as a string here.
            readmeMD = readmeMD as string;

            //This table parser currently will only be able to make one type of table (| --- |)
            var lines = readmeMD.split(/\r?\n/);
            var newLines: string[] = [];
            var replaceIDs: [string, string][] = []; //ID, value.
            for (let i = 0; i < lines.length; i++)
            {
                //Convert the lines to a table.
                if (
                    (
                        lines[i].startsWith("| --- |") ||
                        lines[i].startsWith("| :-- |") ||
                        lines[i].startsWith("| --: |")
                    ) &&
                    lines[i - 1].startsWith("|") &&
                    lines[i + 1].startsWith("|")
                )
                {
                    var mdHeaderColumn = lines[i - 1].split("|").filter(column => column !== "");
                    var mdColumnLayout = lines[i].split("|").filter(column => column !== "");
                    var mdRows: string[] = [];
                    while (lines[++i].startsWith("|")) { mdRows.push(lines[i]); }

                    var columnLayout: ("left" | "center" | "right")[] = [];
                    mdColumnLayout.forEach(position =>
                    {
                        switch (position)
                        {
                            /*case " :-- ":
                                //Left
                                rowLayout.push("left");
                                break;*/
                            case " --- ":
                                //Center
                                columnLayout.push("center");
                                break;
                            case " --: ":
                                //Right
                                columnLayout.push("right");
                                break;
                            default:
                                columnLayout.push("left");
                                break;
                        }
                    });

                    var counter = 0;
                    var headerRow = document.createElement("tr");
                    mdHeaderColumn.forEach(columnContent =>
                    {
                        var cell = document.createElement("th");
                        cell.style.textAlign = columnLayout[counter];
                        cell.innerHTML = marked.parse(columnContent);
                        headerRow.appendChild(cell);

                        if (++counter >= columnLayout.length) { counter = 0; }
                    });

                    counter = 0;
                    var columns: HTMLTableDataCellElement[] = [];
                    mdRows.forEach(rowsString =>
                    {
                        var mdColumns = rowsString.split("|").filter(column => column !== "");
                        
                        mdColumns.forEach(columnContent =>
                        {
                            var cell = document.createElement("td");
                            cell.style.textAlign = columnLayout[counter];
                            cell.innerHTML = marked.parse(columnContent);
                            columns.push(cell);

                            if (++counter >= columnLayout.length) { counter = 0; }
                        });
                    });

                    var tbody = document.createElement("tbody");
                    tbody.appendChild(headerRow);

                    counter = 0;
                    var row: HTMLTableRowElement = document.createElement("tr");
                    columns.forEach(column =>
                    {
                        row.appendChild(column);

                        if (++counter >= columnLayout.length)
                        {
                            counter = 0;
                            tbody.appendChild(row);
                            row = document.createElement("tr");
                        }
                    });

                    var table = document.createElement("table");
                    table.appendChild(tbody);

                    var id: string
                    while(true)
                    {
                        id = Math.ceil(Math.random() * Date.now()).toString();
                        var match = true;
                        for (let j = 0; j < lines.length; j++)
                        { match = lines[j].indexOf(id) == -1 ? false : true; }
                        if (!match) { break; }
                    }
                    replaceIDs.push([id, table.outerHTML]);
                    newLines.push(id);
                    //newLines.push(table.outerHTML);
                }
                //Skip because the next line is a table.
                else if (
                    (lines[i + 1] !== undefined && lines[i + 2] !== undefined) &&
                    (
                        lines[i + 1].startsWith("| --- |") ||
                        lines[i + 1].startsWith("| :-- |") ||
                        lines[i + 1].startsWith("| --: |")
                    ) &&
                    lines[i + 2].startsWith("|")
                )
                { continue; }
                //Add the unchanged line to the array.
                else { newLines.push(lines[i]); }
            }
            readmeMD = newLines.join("\n");

            var parsedReadme = marked.parse(readmeMD);
            replaceIDs.forEach(keyValue => { parsedReadme = parsedReadme.replace(keyValue[0], keyValue[1]); });

            this.readmeContents.innerHTML = parsedReadme;

            this.readmeContents.querySelectorAll("img").forEach(element =>
            {
                if ((element.getAttribute("src")??"").startsWith("./"))
                {
                    //https://raw.githubusercontent.com/kOFReadie/BSDP-Overlay/master/previews/mapDetails.png
                    element.src = `https://raw.githubusercontent.com/kOFReadie/${project.name}/${project.default_branch}/${element.getAttribute("src")!.substr(2)}`;
                }

                if (element.previousElementSibling !== null) { (<HTMLElement>element.previousElementSibling).style.marginBottom = "0"; }
                
                element.insertAdjacentElement("beforebegin", document.createElement("br"));
            });
        }
        else
        { this.readmeContainer.style.display = "none"; }
    }
}
new Project();