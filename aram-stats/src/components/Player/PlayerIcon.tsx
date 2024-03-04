import { PlayerProps } from "./PlayerName";

const PlayerIcon = ({ playerIcon }: PlayerProps) => {
    return (
        <img
            className="rounded-md mt-4 mb-4 border-2 border-fuchsia-800 drop-shadow-xl"
            src={playerIcon}
            alt="Ícone do perfil"
        ></img>
    );
};

export default PlayerIcon;
