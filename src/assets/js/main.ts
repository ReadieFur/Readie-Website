declare var WEB_ROOT: string;

export class Main
{
    public static readonly months =
    [
        "January",
        "February",
        "March", "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    public static WEB_ROOT: string;
    public static header: HTMLElement;
    public static footer: HTMLElement;
    public static urlParams: URLSearchParams;
    public static zoom: number;
    public static accountContainer: HTMLIFrameElement;

    private static alertBoxContainer: HTMLDivElement;
    private static alertBoxText: HTMLParagraphElement;
    private static alertBoxTextBox: HTMLInputElement;

    constructor()
    {
        Main.WEB_ROOT = WEB_ROOT;
        Main.urlParams = new URLSearchParams(location.search);
        Main.header = Main.ThrowIfNullOrUndefined(document.querySelector("#header"));
        Main.footer = Main.ThrowIfNullOrUndefined(document.querySelector("#footer"));
        Main.accountContainer = Main.ThrowIfNullOrUndefined(Main.header.querySelector("#accountContainer"));

        Main.alertBoxContainer = Main.ThrowIfNullOrUndefined(document.querySelector("#alertBoxContainer"));
        Main.alertBoxText = Main.ThrowIfNullOrUndefined(document.querySelector("#alerBoxText"));
        Main.alertBoxTextBox = Main.ThrowIfNullOrUndefined(document.querySelector("#alertBoxTextBox"));
        Main.alertBoxContainer.addEventListener("click", () => { Main.alertBoxContainer.style.display = "none"; });
        
        window.addEventListener("message", (ev) => { this.WindowMessageEvent(ev); });
        window.addEventListener("resize", () => { this.WindowResizeEvent(); });
        Main.ThrowIfNullOrUndefined(document.querySelector("#accountButton")).addEventListener("click", () => { Main.AccountMenuToggle(true); });
        this.WindowResizeEvent();

        if (Main.RetreiveCookie("READIE_DARK") != "false") { Main.DarkTheme(true); }
        else { Main.DarkTheme(false); }
        Main.ThrowIfNullOrUndefined(document.querySelector("#darkMode")).addEventListener("click", () =>
        {
            var cachedValue = Main.RetreiveCookie("READIE_DARK");
            if (cachedValue == undefined || cachedValue == "false") { Main.DarkTheme(true); }
            else { Main.DarkTheme(false); }
            //CBA to do the dynamic url thing I normally do, nothing sensitive is being sent over anyway.
            if (Main.accountContainer.contentWindow != null)
            { Main.accountContainer.contentWindow.postMessage("UPDATE_THEME", "*" /*Main.accountContainer.contentWindow?.location.href*/ /*Main.accountContainer.src*/); }
        });

        this.HighlightActivePage();

        let staticStyles = document.createElement("style");
        staticStyles.innerHTML = `
            *
            {
                transition:
                    background 400ms ease 0s,
                    background-color 400ms ease 0s,
                    color 100ms ease 0s;
            }
        `;
        document.head.appendChild(staticStyles);
    }

    private WindowResizeEvent(): void
    {
        if (window.innerWidth < 1280) { Main.zoom = 0.75; }
        else { Main.zoom = 1; }
    }

    private HighlightActivePage(): void
    {
        let path = window.location.pathname.split("/").filter((el) => { return el != ""; });
        for (let i = 0; i < path.length; i++) { path[i] = path[i].replace("_", ""); }
        
        Main.ThrowIfNullOrUndefined(document.querySelector("#header")).querySelectorAll("a").forEach((element: HTMLLinkElement) =>
        {
            if (element.href == window.location.origin + window.location.pathname)
            {
                element.classList.add("accent");
                let whyIsThisSoFarBack = element.parentElement?.parentElement?.parentElement;
                if (whyIsThisSoFarBack !== null || whyIsThisSoFarBack !== undefined)
                {
                    if (whyIsThisSoFarBack!.classList.contains("naviDropdown")) { whyIsThisSoFarBack!.firstElementChild!.classList.add("accent"); }
                }
            }
        });
    }

    private WindowMessageEvent(ev: MessageEvent<any>): void
    {
        var host = window.location.host.split('.');
        if (ev.origin.split('/')[2] == `api-readie.global-gaming.${host[host.length - 1]}`)
        {
            if (Main.TypeOfReturnData(ev.data))
            {
                /*if (ev.data.error)
                {
                    console.error(ev);
                    Main.AccountMenuToggle(false);
                }
                else if (typeof(ev.data.data) === "string")
                {
                    switch (ev.data.data)
                    {
                        case "BACKGROUND_CLICK":
                            Main.AccountMenuToggle(false);
                            break;
                        case "LOGGED_IN":
                            Main.AccountMenuToggle(false);
                            break;
                        case "LOGGED_OUT":
                            window.location.reload();
                            break;
                        case "ACCOUNT_DELETED":
                            window.location.reload();
                            break;
                        default:
                            //Not implemented.
                            break;
                    }
                }
                else
                {
                    //Alert unknown error/response.
                    console.log("Unknown response: ", ev);
                    Main.AccountMenuToggle(false);
                }*/

                switch (ev.data.data)
                {
                    case "BACKGROUND_CLICK":
                        Main.AccountMenuToggle(false);
                        break;
                    case "LOGGED_IN":
                        Main.AccountMenuToggle(false);
                        break;
                    case "LOGGED_OUT":
                        window.location.reload();
                        break;
                    case "ACCOUNT_DELETED":
                        window.location.reload();
                        break;
                    default:
                        //Not implemented.
                        break;
                }
            }
            else
            {
                //Alert unknown error/response.
                console.log("Unknown response: ", ev);
                Main.AccountMenuToggle(false);
            }
        }
    }

    public static AccountMenuToggle(show: boolean)
    {
        if (show)
        {
            if (Main.accountContainer.contentWindow != null) { Main.accountContainer.contentWindow.postMessage("UPDATE_THEME", "*"); }
            Main.accountContainer.style.display = "block";
        }
        Main.accountContainer.classList.remove(show ? "fadeOut" : "fadeIn");
        Main.accountContainer.classList.add(show ? "fadeIn" : "fadeOut");
        if (!show) { setTimeout(() => { Main.accountContainer.style.display = "none"; }, 399); }
    }

    public static TypeOfReturnData(data: any): data is ReturnData
    {
        return (data as ReturnData).error !== undefined && (data as ReturnData).data !== undefined;
    }

    public static ThrowIfNullOrUndefined(variable: any): any
    {
        if (Main.IsNullOrUndefined(variable)) { throw new TypeError(`${variable} is null or undefined`); }
        return variable;
    }

    public static IsNullOrUndefined(variable: any): boolean
    {
        return variable === null || variable === undefined;
    }

    public static DarkTheme(dark: boolean): void
    {
        Main.SetCookie("READIE_DARK", dark ? "true" : "false", 365);
        var darkButton: HTMLInputElement = Main.ThrowIfNullOrUndefined(document.querySelector("#darkMode"));
        var themeColours: HTMLStyleElement = Main.ThrowIfNullOrUndefined(document.querySelector("#themeColours"));
        if (dark) { darkButton.classList.add("accent"); }
        else { darkButton.classList.remove("accent"); }
        themeColours!.innerHTML = `
            :root
            {
                --foregroundColour: ${dark ? "255, 255, 255" : "0, 0, 0"};
                --backgroundColour: ${dark ? "13, 17, 23" : "255, 255, 255"};
                --backgroundAltColour: ${dark ? "22, 27, 34" : "225, 225, 225"};
                --linkColour: ${dark ? "30, 140, 255" : "0, 100, 215"};
                --accentColour: 100, 0, 255;
                --accentColourAlt: 255, 120, 0;
            }
        `;
    }

    //I did not realise that PHP could also get the cookies, look into getting cookies from PHP instead for better security.
    public static RetreiveCookie(cookie_name: string): string
    {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++)
        {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == cookie_name) { return unescape(y); }
        }
        return "";
    }

    public static SetCookie(cookie_name: string, value: string, hours: number, path: string = '/'): void
    {
        var hostSplit = window.location.host.split(".");
        var domain = `.${hostSplit[hostSplit.length - 2]}.${hostSplit[hostSplit.length - 1]}`;
        var expDate = new Date();
        expDate.setTime(expDate.getTime() + (hours*60*60*1000));
        document.cookie = `${cookie_name}=${value}; expires=${expDate.toUTCString()}; path=${path}; domain=${domain};`;
    }

    //#region Cache
    public static DeleteExpiredCache()
    {
        for (const key of Object.keys(localStorage))
        {
            var cache = localStorage.getItem(key);
            if (cache == null) { continue; }

            var parsedCache: any;
            try { parsedCache = JSON.parse(cache); }
            catch { parsedCache = null; }
            if (parsedCache == null || ((parsedCache as ICache).expirationDate === undefined))
            { continue; }

            if (new Date().getTime() > (<ICache>parsedCache).expirationDate)
            { localStorage.removeItem(key); }
        }
    }

    public static SetCache(key: string, data: any, expirationDate: number): boolean
    {
        var existingCache = localStorage.getItem(key);
        if (existingCache !== null)
        {
            var parsedCache: any;
            try { parsedCache = JSON.parse(existingCache); }
            catch (ex) { parsedCache = null; }
            if (
                parsedCache != null &&
                (
                    (parsedCache as ICache).expirationDate === undefined ||
                    new Date().getTime() > (parsedCache as ICache).expirationDate
                )
            )
            { this.DeleteCache(key); }
        }

        try
        {
            localStorage.setItem(key, JSON.stringify(
            {
                data: data,
                expirationDate: expirationDate
            }));

            var newCache = localStorage.getItem(key);
            if (newCache === null || (<ICache>JSON.parse(newCache)).expirationDate !== expirationDate) { return false; }

            return true;
        }
        catch { return false; }
    }

    public static DeleteCache(key: string)
    {
        localStorage.removeItem(key);
    }

    public static GetCache(key: string): ICache | false
    {
        var cache = localStorage.getItem(key);
        if (cache === null) { return false; }

        var parsedCache: ICache;
        try { parsedCache = JSON.parse(cache); }
        catch (ex)
        {
            this.DeleteCache(key);
            return false;
        }

        if (parsedCache.expirationDate === undefined) { return false; }
        else if (new Date().getTime() > parsedCache.expirationDate)
        {
            this.DeleteCache(key);
            return false;
        }

        return parsedCache;
    }
    //#endregion

    public static ThrowAJAXJsonError(data: any) { throw new TypeError(`${data} could not be steralised`); }

    //This is asyncronous as I will check if the user has dismissed the alert box in the future.
    public static async Alert(message: string/*, solidBackground = false*/): Promise<void>
    {
        if (Main.alertBoxTextBox != null && Main.alertBoxText != null && Main.alertBoxContainer != null)
        {
            console.log("Alert:", message);
            Main.alertBoxTextBox.focus();
            Main.alertBoxText.innerHTML = message;
            Main.alertBoxContainer.style.display = "block";
        }
    }

    public static TimeSinceString(_date: Date, _since = new Date()): string
    {
        var since = _since.getTime();
        var date: string;

        if (
            //Newer than 1 minute.
            _date.getTime() > since - 1000 //updated < now - 1 minute.
        )
        {
            date = "less than a minute ago";
        }
        else if (
            //Older than 1 minute, newer than 1 hour.
            _date.getTime() < since - (60*1000) && //updated < now - 1 minute.
            _date.getTime() > since - (60*60*1000) //updated > now - 1 hour.
        )
        {
            var minutes = Math.trunc(((since / 1000) - (_date.getTime() / 1000)) / 60);
            date = `${minutes} ${minutes == 1 ? "minute" : "minutes"} ago`;
        }
        else if (
            //Older than 1 hour, newer than 1 day.
            _date.getTime() < since - (60*60*1000) && //updated < now - 1 hour.
            _date.getTime() > since - (24*60*60*1000) //updated > now - 1 day.
        )
        {
            var hours = Math.trunc(((since / 1000) - (_date.getTime() / 1000)) / 3600);
            date = `${hours} ${hours == 1 ? "hour" : "hours"} ago`;
        }
        else if (
            //Older than 1 day, newer than 2 weeks.
            _date.getTime() < since - (24*60*60*1000) && //updated < now - 1 day.
            _date.getTime() > since - (14*24*60*60*1000) //updated > now - two weeks.
        )
        {
            //Less than a day.
            var days = Math.trunc(((since / 1000) - (_date.getTime() / 1000)) / 86400);
            date = `${days} ${days == 1 ? "day" : "days"} ago`;
        }
        else
        {
            //More than two weeks.
            date = `${Main.months[_date.getMonth()]} ${_date.getDate()}, ${_date.getFullYear()}`;
        }
        //TODO Add more time periods, return false if the _since date is larger than the _date value, add a time period limit (return no larger than x days), create a time class for different return values.

        return date;
    }

    public static Sleep(milliseconds: number): Promise<unknown>
    {
        return new Promise(r => setTimeout(r, milliseconds));
    }

    public static GetErrorMessage(error: any): string
    {
        switch (error)
        {
            case "NO_QUERY_FOUND":
                return "No query found.";
            case "NO_METHOD_FOUND":
                return "No method found.";
            case "NO_DATA_FOUND":
                return "No data found.";
            case "INVALID_METHOD":
                return "Invalid method.";
            case "INVALID_DATA":
                return "Invalid data.";
            case "ACCOUNT_NOT_FOUND":
                return "Account not found.";
            case "ACCOUNT_NOT_VERIFIED":
                return "Account not verified.";
            case "ACCOUNT_ALREADY_EXISTS":
                return "Account already exists.";
            case "ENCRYPTION_ERROR":
                return "Encryption error.";
            case "SET_COOKIE_ERROR":
                return "Set cookie error.";
            case "GET_COOKIE_ERROR":
                return "Get cookie error.";
            case "COOKIE_NOT_FOUND":
                return "Cookie not found.";
            case "SESSION_INVALID":
                return "Session invalid.";
            case "INVALID_CREDENTIALS":
                return "Invalid credentials.";
            case "INVALID_UID":
                return "Invalid user ID.";
            case "INVALID_EMAIL":
                return "Invalid email.";
            case "INVALID_USERNAME":
                return "Invalid username.";
            case "INVALID_PASSWORD":
                return "Invalid password.";
            case "INVALID_OTP":
                return "Invalid OTP.";
            case "VERIFICATION_FAILED":
                return "Verification failed.";
            case "MAIL_ERROR":
                return "Mail error."
            case "NO_RESULTS":
                return "No results found.";
            case "NOT_LOGGED_IN":
                return "Not logged in.";
            case "RATE_LIMIT_EXCEEDED":
                return "Rate limit exceeded.";
            case "CACHE_ERROR":
                return "Cache error";
            default:
                return `Unknown error.<br><small>${String(error)}</small>`;
        }
    }
}

export interface ReturnData
{
    error: boolean,
    data: any
}

export interface ICache
{
    data: any,
    expirationDate: number
}