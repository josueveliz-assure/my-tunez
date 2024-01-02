import { useState, useEffect } from 'react';
import TextForm from './form/TextForm';
import DateForm from './form/DateForm';
import SelectForm from './form/SelectForm';
import TimeForm from './form/TimeForm';
import {
  getAllArtist,
  getAllAlbums,
  albumsOfArtist
} from '../services/localStorageHandler';

const MusicForm = () => {
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [albums, setAlbums] = useState(getAllAlbums());
  const [duration, setDuration] = useState('');
  const [link, setLink] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    console.log('submit');

    setTitle('');
    setGender('');
    setReleaseDate('');
    setArtist('');
    setAlbum('');
    setDuration('00:00');
    setLink('');

    setSaved(true);
  };

  useEffect(() => {
    if (artist !== '') {
      setAlbums(albumsOfArtist(parseInt(artist)));
    } else {
      setAlbums(getAllAlbums());
    }
  }, [artist]);

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
          getAllArtist().map(artist => ({value: artist.id, label: artist.name}))
        }
      />
      <SelectForm
        label='Album'
        value={album}
        onInput={setAlbum}
        isRequired
        options={
          albums.map(album => ({value: album.id, label: album.title}))
        }
      />
      <TimeForm label='Duration' value={duration} onInput={setDuration} isRequired/>
      <TextForm label='Link mp3' value={link} onInput={setLink} isRequired/>
      <div className="modal-action">
        <form method="dialog">
          <button className="btn">Close</button>
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