import { PlayerProps } from "./PlayerName";

const SummonerLevel = ({ summonerLevel }: PlayerProps) => {
    return (
        <p className="font-bold text-xl">
            Level <span className="text-fuchsia-600">{summonerLevel}</span>
        </p>
    );
};

export default SummonerLevel;
