import { useState } from "react";
import PlayerName from "./components/Player/PlayerName";
import PlayerIcon from "./components/Player/PlayerIcon";
import SummonerLevel from "./components/Player/SummonerLevel";

type RiotData = {
    riotName: FormDataEntryValue;
    riotTag: FormDataEntryValue;
};

function App() {
    const [playerName, setPlayerName] = useState<string>("");
    const [playerIcon, setPlayerIcon] = useState<string>("");
    const [summonerLevel, setSummonerLevel] = useState<string>("");
    const [playerTag, setRiotTag] = useState<string>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchPlayer = async ({ riotName, riotTag }: RiotData) => {
        setIsLoading(true);

        const res = await fetch(
            `http://127.0.0.1:3000/summoner?name=${riotName}&tag=${riotTag}`,
            {
                method: "GET",
                mode: "cors",
            }
        );

        const playerStats = await res.json();

        setRiotTag(riotTag.toString());
        setPlayerName(playerStats.playerName);
        setPlayerIcon(
            `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/${playerStats.profileIcon}.png`
        );
        setSummonerLevel(playerStats.summonerLevel);

        if (res.ok) {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div>
                <form
                    className="flex flex-col p-12 justify-center items-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const riotData = {
                            riotName: formData.get("playerName") ?? "",
                            riotTag: formData.get("playerTag") ?? "",
                        };

                        fetchPlayer(riotData);
                    }}
                >
                    <div className="flex flex-col">
                        <label
                            className="mb-2 font-semibold"
                            htmlFor="playerName"
                        >
                            Player Name:
                        </label>
                        <input
                            id="playerName"
                            className="p-2 mb-2 rounded-sm border text-fuchsia-200 border-fuchsia-600 focus-visible:outline-fuchsia-500 focus-visible:outline bg-zinc-800 placeholder:text-neutral-500"
                            name="playerName"
                            placeholder="Enter your nickname:"
                        />
                        <label
                            className="mb-2 font-semibold"
                            htmlFor="playerTag"
                        >
                            Player Tag:
                        </label>
                        <input
                            id="playerTag"
                            className="p-2 mb-2 rounded-sm border text-fuchsia-200 border-fuchsia-600 focus-visible:outline-fuchsia-500 focus-visible:outline bg-zinc-800 placeholder:text-neutral-500"
                            name="playerTag"
                            placeholder="Enter your riot tag:"
                        />
                        <button className="bg-fuchsia-800 font-semibold rounded-md p-2 px-12 mt-6 hover:bg-fuchsia-700 duration-150 transition-all">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex justify-center mt-8 flex-col items-center">
                {isLoading ? (
                    <span className="loader"></span>
                ) : playerName ? (
                    <>
                        <PlayerName
                            playerName={playerName}
                            riotTag={playerTag}
                        />
                        <PlayerIcon playerIcon={playerIcon} />
                        <SummonerLevel summonerLevel={summonerLevel} />
                    </>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}

export default App;
