import { useRef, useState, useEffect } from "react";
import MusicInfo from "./MusicInfo";
import { usePlayerStore } from "../stores/usePlayerStore";
import { useMusicStore } from "../stores/useMusicStore";
import { getMusicById } from "../services/localStorageHandler";
import Play from '../assets/Play';
import Pause from '../assets/Pause';
import Next from '../assets/Next';
import Previous from '../assets/Previous';
import Shuffle from '../assets/Shuffle';
import Repeat from '../assets/Repeat';
import SongControl from "./SongControl";
import VolumeControl from "./VolumeControl";

const MusicPlayer = () => {
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [music, setMusic] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const audioRef = useRef(null);
    const shufflePlaylistRef = useRef([]);
    const shufflePositionRef = useRef(0);

    const {
        isPlaying,
        setIsPlaying,
        playlist,
        currentPosition,
        setCurrentPosition,
        currentSong,
        setCurrentSong,
        volume,
        hasShuffled,
    } = usePlayerStore();

    const { setMusicId } = useMusicStore();

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleShuffle = () => {
        setIsShuffle(!isShuffle);
        if (!isShuffle) {
            buildShufflePlaylist();
        }
    };

    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
    };

    const handleNext = () => {
        if (isShuffle) {
            if (shufflePositionRef.current < shufflePlaylistRef.current.length - 1) {
                shufflePositionRef.current++;
            } else {
                shufflePositionRef.current = 0;
            }
            const shuffleMusic = getMusicById(shufflePlaylistRef.current[shufflePositionRef.current].id);
            setCurrentSong(
                {
                    id:shuffleMusic.id,
                    title:shuffleMusic.title,
                    artist:shuffleMusic.artist.name,
                    album:shuffleMusic.album.title,
                    albumCover:shuffleMusic.album.albumCover,
                    link:shuffleMusic.link
                }
            );
        } else if (currentPosition < playlist.length - 1) {
            setCurrentPosition(currentPosition + 1);
        } else {
            setCurrentPosition(0);
        }

        if (!isPlaying) {
            setIsPlaying(true);
        }
    };

    const handlePrevious = () => {
        if(audioRef.current.currentTime > 10) {
            audioRef.current.currentTime = 0;
            return;
        }

        if (isShuffle) {
            if (shufflePositionRef.current > 0) {
                shufflePositionRef.current--;
            } else {
                shufflePositionRef.current = shufflePlaylistRef.current.length - 1;
            }
            const shuffleMusic = getMusicById(shufflePlaylistRef.current[shufflePositionRef.current].id);
            setCurrentSong(
                {
                    id:shuffleMusic.id,
                    title:shuffleMusic.title,
                    artist:shuffleMusic.artist.name,
                    album:shuffleMusic.album.title,
                    albumCover:shuffleMusic.album.albumCover,
                    link:shuffleMusic.link
                }
            );
        } else if (currentPosition > 0) {
            setCurrentPosition(currentPosition - 1);
        } else {
            setCurrentPosition(playlist.length - 1);
        }
    };


    const buildShufflePlaylist = () => {
        const currentList = [...playlist];
        const shuffledList = currentList.sort(() => Math.random() - 0.5);

        shufflePlaylistRef.current = shuffledList;
        shufflePositionRef.current = shuffledList.findIndex(music => music.id === currentSong.id);
    };

    useEffect(() => {
        if (playlist.length > 0) {
          const songLS = getMusicById(playlist[currentPosition].id);
          setCurrentSong({
            id:songLS.id,
            title:songLS.title,
            artist:songLS.artist.name,
            album:songLS.album.title,
            albumCover:songLS.album.albumCover,
            link:songLS.link
          });
        }
    }, [playlist, currentPosition]);

    useEffect(() => {
        if (currentSong){
            setMusic(currentSong);
            audioRef.current.src = currentSong.link;
            audioRef.current.volume = volume;
            audioRef.current.play();
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [currentSong]);

    useEffect(() => {
        isPlaying
            ? audioRef.current.play()
            : audioRef.current.pause();
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            if (audio.currentTime === audio.duration) {
              if (isRepeat) {
                audio.currentTime = 0;
                audio.play();
              } else {
                handleNext();
              }
            }
          };

        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
          audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [isRepeat, isPlaying]);

    useEffect(() => {
        if (isShuffle && currentSong) {
            buildShufflePlaylist();
        }
    }, [hasShuffled, playlist, currentPosition]);

    useEffect(() => {
        if(currentSong)
            setMusicId(currentSong.id);
    }, [currentSong]);


    return (
        <div className="h-full flex items-center">
            <div className="flex justify-start ml-4 items-center w-96 h-16">
                <MusicInfo music={music} />
            </div>
            <div className="flex justify-center items-center grow h-16">
                <div className="flex flex-col items-center">
                    <div className="flex gap-2 items-center mt-2">
                        <button
                            className={`h-6 w-6 bg-transparent border-transparent pl-1 pr-1 ${isShuffle ? 'fill-white' : 'fill-slate-400'}`}
                            onClick={handleShuffle}
                            disabled={isDisabled ? "disabled" : ""}
                        >
                            <Shuffle />
                        </button>
                        <button
                            className="btn btn-xs btn-circle bg-gray-300 pl-1 pr-1"
                            onClick={handlePrevious}
                            disabled={isDisabled ? "disabled" : ""}
                        >
                            <Previous />
                        </button>
                        <button
                            className="btn btn-sm btn-circle bg-gray-300 pl-1 pr-1"
                            onClick={handlePlay}
                            disabled={isDisabled ? "disabled" : ""}
                        >
                            {isPlaying ? <Pause /> : <Play />}
                        </button>
                        <button
                            className="btn btn-xs btn-circle bg-gray-300 pl-1 pr-1"
                            onClick={handleNext}
                            disabled={isDisabled ? "disabled" : ""}
                        >
                            <Next />
                        </button>
                        <button
                            className={`h-6 w-6 bg-transparent border-transparent pl-1 pr-1 ${isRepeat ? 'fill-white' : 'fill-slate-400'}`}
                            onClick={handleRepeat}
                            disabled={isDisabled ? "disabled" : ""}
                        >
                            <Repeat />
                        </button>
                    </div>
                    <SongControl audio={audioRef} />
                    <audio ref={audioRef} />
                </div>
            </div>
            <div className="flex justify-center items-center w-96 h-16">
                <VolumeControl />
            </div>
        </div>
    );
};

export default MusicPlayer;