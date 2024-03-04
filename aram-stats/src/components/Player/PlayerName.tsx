export type PlayerProps = {
    riotTag?: string;
    playerName?: string;
    playerIcon?: string;
    summonerLevel?: string;
};

const PlayerName = ({ playerName, riotTag }: PlayerProps) => {
    return (
        <p className="font-bold text-xl">
            {playerName}
            <span className="text-zinc-500">#{riotTag}</span>
        </p>
    );
};

export default PlayerName;
