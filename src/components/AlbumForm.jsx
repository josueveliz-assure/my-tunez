import { useState } from 'react';
import {
  saveAlbum,
  getAllArtist,
  albumsOfArtist
} from '../services/localStorageHandler';
import { useAlbumStore } from '../stores/useAlbumStore';

import TextForm from './form/TextForm';
import DateForm from './form/DateForm';
import SelectForm from './form/SelectForm';

import toast from 'react-hot-toast';

const AlbumForm = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverImage, setCoverImage] = useState('');
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

  const notify = () => {
    toast.success('Album saved!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: '#e5e6e6',
        color: '#1f2937',
      }
    });
  }

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

  return (
    <form
      onSubmit={e => {e.preventDefault();}}
      noValidate
    >
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
        <button
          type='button'
          onClick={() => resetValues()}
          className="btn btn-outline mr-2"
        >
          Reset Values
        </button>
        <form method="dialog">
          <button
              type='submit'
              disabled={!title || !genre || !releaseDate || !coverImage}
              onClick={() => {
                notify();
                save();
              }}
              className="btn btn-outline"
            >
            Submit
          </button>
        </form>
      </div>
    </form>
  );
}

export default AlbumForm;