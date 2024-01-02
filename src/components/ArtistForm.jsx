import { useEffect, useState } from 'react';
import TextForm from './form/TextForm';
import MultiValueForm from './form/MultiValueForm';

const ArtistForm = () => {
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);
  const [website, setWebsite] = useState('');
  const [image, setImage] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    console.log('submit');

    setName('');
    setMembers([]);
    setWebsite('');
    setImage('');

    setSaved(true);
  };

  useEffect(() => {
    console.log(members);
  }, [members]);

  return (
    <form onSubmit={handleSubmit}>
      <TextForm label='Name' value={name} onInput={setName} isRequired/>
      <MultiValueForm label='Members' values={members} onInput={setMembers} isRequired/>
      <TextForm label='website' value={website} onInput={setWebsite} isRequired/>
      <TextForm label='image' value={image} onInput={setImage} isRequired/>
      <div className="modal-action">
        <form method="dialog">
          <button className="btn">Close</button>
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