import { useRef, useState, useEffect } from "react";
import MusicInfo from "./MusicInfo";
import { usePlayerStore } from "../stores/usePlayerStore";
import { getMusicById } from "../services/localStorageHandler";
import Play from '../assets/Play';
import Pause from '../assets/Pause';
import Next from '../assets/Next';
import Previous from '../assets/Previous';
import Shuffle from '../assets/Shuffle';
import Repeat from '../assets/Repeat';
import VolumeSilence from "../assets/VolumeSilence";
import Volume from "../assets/Volume";
import { Slider } from "./Slider";

const SongControl = ({ audio }) => {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        audio.current.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.current.removeEventListener('timeupdate', handleTimeUpdate);
        }
    }, []);

    const handleTimeUpdate = () => {
        setCurrentTime(audio.current.currentTime);
    };

    const formatTime = (time) => {
        if (time === 0 || isNaN(time)) {
            return '0:00';
        }

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    const duration = audio.current ? audio.current.duration : 0;

    return (
        <div className="flex gap-x-3 mt-2">
            <span className="opacity-70">{formatTime(currentTime)}</span>
                {   audio.current &&
                    <Slider
                        defaultValue={[0]}
                        value={[currentTime]}
                        min={0}
                        max={audio.current.duration ?? 0}
                        className="w-[400px]"
                        onValueChange={(time) => {
                            audio.current.currentTime = time;
                        }}
                    />
                }
            <span className="opacity-70">{formatTime(duration)}</span>
        </div>
    );
}

const VolumeControl = () => {
    const [withVolume, setWithVolume] = useState(true);
    const {volume, setVolume} = usePlayerStore();
    const previousVolumeRef = useRef(volume);
    const {currentSong} = usePlayerStore();

    const handleVolume = (volume) => {
        const [newVolume] = volume;
        const volumeValue = newVolume / 100;

        setVolume(volumeValue);
        previousVolumeRef.current = volumeValue;
    }

    const handleSilence = () => {
        if (withVolume) {
            setVolume(0);
        } else {
            setVolume(previousVolumeRef.current);
        }
        setWithVolume(!withVolume);
    };

    return (
        <div className="flex justify-center gap-x-2 text-gray-200">
            <button
                className={`h-4 w-4 ${!currentSong ? 'opacity-25' : 'hover:cursor-pointer opacity-70 hover:opacity-100 transition'}`}
                disabled={!currentSong}
                onClick={handleSilence}>
                {volume > 0 ? <Volume /> : <VolumeSilence />}
            </button>
            <Slider
                defaultValue={[50]}
                min={0}
                max={100}
                value={[volume * 100]}
                className={`w-[120px] ${!currentSong ? 'opacity-25' : 'hover:cursor-pointer opacity-90 hover:opacity-100 transition'}`}
                onValueChange={(volume) => handleVolume(volume)}
                disabled={!currentSong}
            />
        </div>
    );
}

const MusicPlayer = () => {
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);
    const [music, setMusic] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const audioRef = useRef();

    const { isPlaying, setIsPlaying, playlist, currentPosition, setCurrentPosition, currentSong, setCurrentSong, volume } = usePlayerStore();

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleShuffle = () => {
        setIsShuffle(!isShuffle);
    };

    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
    };

    const handleNext = () => {
        if (isShuffle) {
            const randomPosition = Math.floor(Math.random() * playlist.length);
            setCurrentPosition(randomPosition);
        } else if (currentPosition < playlist.length - 1) {
            setCurrentPosition(currentPosition + 1);
        } else {
            setCurrentPosition(0);
        }
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