import React from "react";
import MusicInfo from "./MusicInfo";

const Reproducer = () => {
    const music = {
        imageAlbum: "https://picsum.photos/200/300",
        title: "Music 1",
        author: "Artist 1",
    }

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