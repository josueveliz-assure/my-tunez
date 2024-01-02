import { useState, useEffect } from "react";
import MusicInfo from "./MusicInfo";
import { useMusicStore } from "../stores/useMusicStore";
import { getMusicById } from "../services/localStorageHandler";

const Reproducer = () => {
    const [music, setMusic] = useState(null);
    const { musicId } = useMusicStore();

    useEffect(() => {
        setMusic(getMusicById(musicId));
    }, [musicId]);

    useEffect(() => {
        console.log(music);
    }, [music]);

    return (
        <div className="h-full flex items-center">
            <div className="flex justify-start ml-4 items-center w-96 h-16">
                <MusicInfo music={music} />
            </div>
            <div className="flex justify-center items-center grow h-16">Player</div>
            <div className="flex justify-center items-center w-96 h-16">Music Controls</div>
        </div>
    );
};

export default Reproducer;