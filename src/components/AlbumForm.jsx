import { useState } from 'react';
import TextForm from './form/TextForm';
import DateForm from './form/DateForm';

const AlbumForm = () => {
  const [title, setTitle] = useState('');
  const [gender, setGender] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    console.log('submit');

    setTitle('');
    setGender('');
    setReleaseDate('');
    setCoverImage('');

    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextForm label='Title' value={title} onInput={setTitle} isRequired/>
      <TextForm label='Gender' value={gender} onInput={setGender} isRequired/>
      <DateForm label='Release Date' value={releaseDate} onInput={setReleaseDate} isRequired/>
      <TextForm label='Cover Image' value={coverImage} onInput={setCoverImage} isRequired/>
      <div className="modal-action">
        <form method="dialog">
          <button className="btn">Close</button>
        </form>
        <button
            type="submit"
            disabled={!title || !gender || !releaseDate || !coverImage}
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