import { findAllVideoGames } from "@workspace/database";
import { WithId } from "mongodb";
import { JSX, use } from "react";
import { VideoGame } from "../../../../packages/database/src/videoGames";

export default function JeuVideo() {
    const videoGames: WithId<VideoGame>[] = use(findAllVideoGames());
    console.log(videoGames);
    const stringGames: JSX.Element[] = videoGames.map((game) => {
        return (
            <div key={game.name}>
                <h1>{game.name}</h1>
                <img src={game.image}></img>
            </div>
        );
    });
    const length: number = stringGames.length;
    return <div>{length != 0 && <ul> {stringGames}</ul>}</div>;
}
