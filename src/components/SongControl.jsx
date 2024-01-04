import { useState, useEffect } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";
import { Slider } from "./Slider";

const SongControl = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);

  const {currentSong} = usePlayerStore();

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
          return '-:-';
      }

      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);

      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const duration = audio.current ? audio.current.duration : 0;

  return (
      <div className="flex gap-x-3 mt-2 w-[400px]">
          <span className="opacity-70">{formatTime(currentTime)}</span>
              {   audio.current &&
                  <Slider
                      defaultValue={[0]}
                      value={[currentTime]}
                      min={0}
                      max={audio.current.duration ?? 0}
                      className={`w-[400px] ${!currentSong ? 'opacity-25' : 'hover:cursor-pointer opacity-90 hover:opacity-100 transition'}`}
                      disabled={!currentSong}
                      onValueChange={(time) => {
                          audio.current.currentTime = time;
                      }}
                  />
              }
          <span className="opacity-70">{formatTime(duration)}</span>
      </div>
  );
}

export default SongControl;