import { useState, useEffect } from 'react';
import TextForm from './form/TextForm';
import DateForm from './form/DateForm';
import SelectForm from './form/SelectForm';
import TimeForm from './form/TimeForm';
import {
  getAllArtist,
  getAllAlbums,
  albumsOfArtist,
  artistsOfAlbum,
  saveMusic
} from '../services/localStorageHandler';
import { useAlbumStore } from '../stores/useAlbumStore';
import { useArtistStore } from '../stores/useArtistStore';

const MusicForm = () => {
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [artist, setArtist] = useState(null);
  const [album, setAlbum] = useState(null);
  const [albumList, setAlbumList] = useState(getAllAlbums());
  const [artists, setArtists] = useState(getAllArtist());
  const [duration, setDuration] = useState('');
  const [link, setLink] = useState('');
  const [saved, setSaved] = useState(false);

  const { setAlbums } = useAlbumStore();
  const { artistId } = useArtistStore();

  const resetValues = () => {
    setTitle('');
    setGender('');
    setReleaseDate('');
    setArtist('');
    setAlbum('');
    setDuration('00:00');
    setLink('');
  }

  const handleSubmit = event => {
    event.preventDefault();
    save();

    resetValues();

    setSaved(true);
    console.log(artistId)
    if (!artistId) {
      setAlbums(getAllAlbums(true));
    } else {
      setAlbums(albumsOfArtist(artist));
    }
  };

  const save = () => {
    const newMusic = {
      title,
      gender,
      releaseDate,
      artistId : artist,
      albumId : album,
      length: duration,
      link,
    };

    saveMusic(newMusic);
  };

  useEffect(() => {
    if (artist) {
      console.log("#: ", artist);
      setAlbumList(albumsOfArtist(artist));
    } else {
      setAlbumList(getAllAlbums());
    }
  }, [artist]);

  useEffect(() => {
    if (album) {
      setArtists(artistsOfAlbum(album));
    } else {
      setArtists(getAllArtist());
    }
  }, [album]);

  useEffect(() => {
    console.log(duration);
  }, [duration]);

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => {
        setSaved(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [saved]);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextForm label='Title' value={title} onInput={setTitle} isRequired/>
      <TextForm label='Gender' value={gender} onInput={setGender} isRequired/>
      <DateForm label='Release Date' value={releaseDate} onInput={setReleaseDate} isRequired/>
      <SelectForm
        label='Artist'
        value={artist}
        onInput={setArtist}
        isRequired
        options={
          artists.map(artist => ({value: artist.id, label: artist.name}))
        }
      />
      <SelectForm
        label='Album'
        value={album}
        onInput={setAlbum}
        isRequired
        options={
          albumList.map(album => ({value: album.id, label: album.title}))
        }
      />
      <TimeForm label='Duration' value={duration} onInput={setDuration} isRequired/>
      <TextForm label='Link mp3' value={link} onInput={setLink} isRequired/>
      <div className="modal-action">
        <form method="dialog">
          <button className="btn" onClick={resetValues}>Close</button>
        </form>
        <button
            type="submit"
            disabled={!title || !gender || !releaseDate || !artist || !album || !duration || !link}
            className="btn btn-outline"
          >
          Submit
        </button>
      </div>
      {saved && <p>Saved!</p>}
    </form>
  );
}

export default MusicForm;