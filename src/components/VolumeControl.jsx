import { useRef, useState, useEffect } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";
import VolumeSilence from "../assets/VolumeSilence";
import Volume from "../assets/Volume";
import { Slider } from "./Slider";

const VolumeControl = () => {
  const [withVolume, setWithVolume] = useState(true);
  const { volume, setVolume } = usePlayerStore();
  const previousVolumeRef = useRef(volume);
  const { currentSong } = usePlayerStore();

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
    <div className="flex justify-center gap-x-2 text-gray-200 w-[120px]">
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

export default VolumeControl;