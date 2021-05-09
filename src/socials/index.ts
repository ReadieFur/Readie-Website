import { Main, ReturnData } from "../assets/js/main.js";

class Socials
{
    constructor()
    {
        new Main();

        jQuery.ajax(
        {
            //From this page just adding 'api-' to the start of the hostname should be fine.
            url: `${window.location.protocol}//api-${window.location.hostname}/twitch/twitchAPI.php`,
            method: "GET",
            dataType: "json",
            data:
            {
                "q": JSON.stringify(
                {
                    method: "streams",
                    data: "user_login=kof_readie"
                })
            },
            success: (response: ReturnData) =>
            {
                if (typeof(response.data) === "string")
                {
                    var channels: ITwitchResponse = JSON.parse(response.data);
                    
                    if (channels.data.length > 0)
                    {
                        for (let i = 0; i < channels.data.length; i++)
                        {
                            if (channels.data[i].user_name == "kof_readie")
                            {
                                (<HTMLLinkElement>Main.ThrowIfNullOrUndefined(document.querySelector("#twitch"))).classList.add("live");
                                break;
                            }
                        }
                    }
                }
            }
        });
    }
}
new Socials();

interface ITwitchResponse
{
    data: ITwitchChannel[],
    pagination: {}
}

interface ITwitchChannel
{
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name: string;
    type: string;
    title: string;
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
    tag_ids: string[];
    is_mature: boolean;
}