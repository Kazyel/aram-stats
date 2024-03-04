import { FormEvent, useState } from "react";
import PlayerName from "./components/Player/PlayerName";
import PlayerIcon from "./components/Player/PlayerIcon";
import SummonerLevel from "./components/Player/SummonerLevel";
import { riotFetch } from "./services/riotFetch";

function App() {
    const [playerName, setPlayerName] = useState<string>("");
    const [playerIcon, setPlayerIcon] = useState<string>("");
    const [summonerLevel, setSummonerLevel] = useState<string>("");
    const [playerTag, setRiotTag] = useState<string>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchPlayer = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true);

        try {
            const res = await riotFetch(e);
            setPlayerName(res.playerName);
            setPlayerIcon(
                `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/${res.profileIcon}.png`
            );
            setSummonerLevel(res.summonerLevel);
            setRiotTag(res.riotTag);
        } catch (err) {
            console.warn("Not enough context provided.");
        } finally {
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
                        fetchPlayer(e);
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
