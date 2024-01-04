import { useEffect, useState } from "react";
import { useMusicStore } from "../stores/useMusicStore";
import { usePlayerStore } from '../stores/usePlayerStore';
import Play from '../assets/Play';
import Pause from '../assets/Pause';

const AlbumsList = ({ albums }) => {
    const { musicId, setMusicId } = useMusicStore();
    const [currentMusicId, setCurrentMusicId] = useState(null);
    const [pressed, setPressed] = useState(true);

    const { isPlaying, setIsPlaying, setPlaylist, setCurrentPosition } = usePlayerStore();

    const handleClick = (musicId) => {
        setMusicId(musicId);
        console.log("musicId: ", musicId);
        if (currentMusicId === musicId) {
            setIsPlaying(!isPlaying);
        } else if(pressed) {
            setIsPlaying(true);
            setPressed(false);
        } else {
            setIsPlaying(true);
        }
        setCurrentMusicId(musicId);

        changePlaylist(musicId);
    };

    const changePlaylist = (musicId) => {
        const currentList = albums.map(album => album.musicList).flat();
        const pos = currentList.findIndex(music => music.id === musicId);

        setCurrentPosition(pos);
        setPlaylist(currentList);
    };

    return (
        <div className="overflow-y-auto max-h-full max-w-full">
            <ul className="menu bg-base-200">
                {albums.map((album, index) => (
                    <div className="">
                        <div className="flex flex-row">
                            <div className="mt-4 mb-4 mr-3">
                                <img className="object-cover h-48 w-48 rounded-md" src={album.albumCover}/>
                            </div>
                            <li key={index} className="flex-grow block-item">
                                <h2 className="menu-title">{album.title}{' • '}{album.releaseDate.split('-')[0]}</h2>
                                <ul className="overflow-y-auto max-h-48">
                                    {album.musicList.map((music, index) => (
                                        <li key={index}>
                                            <a
                                                className="pt-3 pb-3 music-item"
                                                onClick={() => handleClick(music.id)}
                                            >
                                                <div className="h-4 w-4 player-btn">
                                                    {(isPlaying && musicId === music.id) ? <Pause/>  : <Play/>}
                                                </div>
                                                <p>{music.title}</p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </div>
                        <hr/>
                    </div>
                ))}
                {albums.length === 0 && (
                    <li>
                        <a className='pt-3 pb-3 text-xl'>No Albums </a>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default AlbumsList;