import { useEffect, useState, useRef } from 'react';
import { saveArtist } from '../services/localStorageHandler';
import { useArtistStore } from '../stores/useArtistStore';

import TextForm from './form/TextForm';
import MultiValueForm from './form/MultiValueForm';

import toast from 'react-hot-toast';

const ArtistForm = () => {
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);
  const [website, setWebsite] = useState('');
  const [image, setImage] = useState('');

  const { setArtists } = useArtistStore();

  const needResetRef = useRef(false);

  const notify = () => {
    toast.success('Artist saved!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: '#e5e6e6',
        color: '#1f2937',
      }
    });
  };

  const resetValues = () => {
    setName('');
    setMembers([]);
    setWebsite('');
    setImage('');
  }

  const save = () => {
    const newArtist = {
      name,
      members,
      website,
      image,
    };

    saveArtist(newArtist);
    setArtists();

    needResetRef.current = true;
  }

  useEffect(() => {
    if (needResetRef.current) {
      resetValues();
      needResetRef.current = false;
    }
  }, [needResetRef.current]);

  return (
    <form
      onSubmit={e => {e.preventDefault(); resetValues();}}
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
          <button
              type='submit'
              disabled={!name || !members || !website || !image || members.length === 0}
              className="btn btn-outline"
              onClick={() => {
                notify();
                save();
              }}
            >
            Submit
          </button>
        </form>
      </div>
    </form>
  );
}

export default ArtistForm;