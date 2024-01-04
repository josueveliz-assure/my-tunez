import { useEffect, useState } from 'react';
import { saveArtist } from '../services/localStorageHandler';
import { useArtistStore } from '../stores/useArtistStore';

import TextForm from './form/TextForm';
import MultiValueForm from './form/MultiValueForm';

const ArtistForm = () => {
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);
  const [website, setWebsite] = useState('');
  const [image, setImage] = useState('');
  const [saved, setSaved] = useState(false);

  const { setArtists } = useArtistStore();

  const resetValues = () => {
    setName('');
    setMembers([]);
    setWebsite('');
    setImage('');
  }

  const handleSubmit = event => {
    event.preventDefault();
    save();
    setSaved(true);

    resetValues();
  };

  const save = () => {
    const newArtist = {
      name,
      members,
      website,
      image,
    };

    saveArtist(newArtist);
    setArtists();
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
    <form
      onSubmit={handleSubmit}
      noValidate
      onKeyDown={e => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
      }}
    >
      <TextForm label='Name' value={name} onInput={setName} isRequired/>
      <MultiValueForm label='Members' values={members} onInput={setMembers} isRequired/>
      <TextForm label='website' value={website} onInput={setWebsite} isRequired/>
      <TextForm label='image' value={image} onInput={setImage} isRequired/>
      <div className="modal-action">
        <form method="dialog">
          <button className="btn" onClick={resetValues}>Close</button>
        </form>
        <button
            type="submit"
            disabled={!name || !members || !website || !image || members.length === 0}
            className="btn btn-outline"
          >
          Submit
        </button>
      </div>
      {saved && <p>Saved!</p>}
    </form>
  );
}

export default ArtistForm;