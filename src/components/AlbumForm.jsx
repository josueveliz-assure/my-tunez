import { useState, useEffect } from 'react';
import TextForm from './form/TextForm';
import DateForm from './form/DateForm';
import SelectForm from './form/SelectForm';
import {
  saveAlbum,
  getAllArtist,
  albumsOfArtist
} from '../services/localStorageHandler';
import { useAlbumStore } from '../stores/useAlbumStore';

const AlbumForm = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [saved, setSaved] = useState(false);
  const [artist, setArtist] = useState('');
  const [artistList, setArtistList] = useState(getAllArtist());

  const { setAlbums } = useAlbumStore();

  const resetValues = () => {
    setTitle('');
    setGenre('');
    setReleaseDate('');
    setCoverImage('');
    setArtistList(getAllArtist());
  }

  const handleSubmit = event => {
    event.preventDefault();
    save();
    setSaved(true);

    resetValues();
  };

  const save = () => {
    const newAlbum = {
      title,
      artistId: artist,
      genre,
      releaseDate,
      albumCover: coverImage,
    };

    saveAlbum(newAlbum);
    setAlbums(albumsOfArtist(artist));
  }

  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => {
        setSaved(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [saved]);

  return (
    <form onSubmit={handleSubmit}>
      <TextForm label='Title' value={title} onInput={setTitle} isRequired/>
      <SelectForm
        label='Artist'
        value={artist}
        onInput={setArtist}
        isRequired
        options={
          artistList.map(artist => ({value: artist.id, label: artist.name}))
        }
      />
      <TextForm label='Genre' value={genre} onInput={setGenre} isRequired/>
      <DateForm label='Release Date' value={releaseDate} onInput={setReleaseDate} isRequired/>
      <TextForm label='Cover Image' value={coverImage} onInput={setCoverImage} isRequired/>
      <div className="modal-action">
        <form method="dialog">
          <button className="btn" onClick={resetValues}>Close</button>
        </form>
        <button
            type="submit"
            disabled={!title || !genre || !releaseDate || !coverImage}
            className="btn btn-outline"
          >
          Submit
        </button>
      </div>
      {saved && <p>Saved!</p>}
    </form>
  );
}

export default AlbumForm;