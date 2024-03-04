import { FormEvent } from "react";

type RiotJson = {
    playerName: string;
    riotTag: string;
    summonerLevel: string;
    profileIcon: string;
};

export const riotFetch = async (
    e: FormEvent<HTMLFormElement>
): Promise<RiotJson> => {
    const formData = new FormData(e.currentTarget);
    const riotName = formData.get("playerName")?.toString() ?? "";
    const riotTag = formData.get("playerTag")?.toString() ?? "";

    const res = await fetch(
        `http://127.0.0.1:3000/summoner?name=${riotName}&tag=${riotTag}`,
        {
            method: "GET",
            mode: "cors",
        }
    );

    return await res.json();
};
