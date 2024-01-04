import { useRef, useState, useEffect } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";
import { useMusicStore } from "../stores/useMusicStore";
import { getMusicById } from "../services/localStorageHandler";

import MusicInfo from "./MusicInfo";
import SongControl from "./SongControl";
import VolumeControl from "./VolumeControl";

import Play from '../assets/Play';
import Pause from '../assets/Pause';
import Next from '../assets/Next';
import Previous from '../assets/Previous';
import Shuffle from '../assets/Shuffle';
import Repeat from '../assets/Repeat';

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
    if (!isPlaying) {
      setIsPlaying(true);
    }

    if (!isShuffle) {
      if (currentPosition < playlist.length - 1) {
        setCurrentPosition(currentPosition + 1);
        return;
      }
      setCurrentPosition(0);
      return;
    }
    if (shufflePositionRef.current < shufflePlaylistRef.current.length - 1) {
      shufflePositionRef.current++;
    } else {
      shufflePositionRef.current = 0;
    }
    setCurrentSongWithId(shufflePlaylistRef.current[shufflePositionRef.current].id);
  };

  const handlePrevious = () => {
    if (audioRef.current.currentTime > 10) {
      audioRef.current.currentTime = 0;
      return;
    }

    if (!isShuffle) {
      if(currentPosition > 0) {
        setCurrentPosition(currentPosition - 1);
        return;
      }
      setCurrentPosition(playlist.length - 1);
      return;
    }
    if (shufflePositionRef.current > 0) {
      shufflePositionRef.current--;
    } else {
      shufflePositionRef.current = shufflePlaylistRef.current.length - 1;
    }
    setCurrentSongWithId(shufflePlaylistRef.current[shufflePositionRef.current].id);
  };

  const buildShufflePlaylist = () => {
    const currentList = [...playlist];
    const shuffledList = currentList.sort(() => Math.random() - 0.5);

    shufflePlaylistRef.current = shuffledList;
    shufflePositionRef.current = shuffledList.findIndex(music => music.id === currentSong.id);
  };

  const setCurrentSongWithId = (id) => {
    const songLS = getMusicById(id);
    setCurrentSong({
      id: songLS.id,
      title: songLS.title,
      artist: songLS.artist.name,
      album: songLS.album.title,
      albumCover: songLS.album.albumCover,
      link: songLS.link
    });
  }

  useEffect(() => {
    if (playlist.length > 0) {
      setCurrentSongWithId(playlist[currentPosition].id);
    }
  }, [playlist, currentPosition]);

  useEffect(() => {
    if (currentSong) {
      setMusic(currentSong);
      audioRef.current.src = currentSong.link;
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsDisabled(false);
      setMusicId(currentSong.id);

      if (isShuffle) {
        shufflePositionRef.current = shufflePlaylistRef.current.findIndex(music => music.id === currentSong.id);
      }
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