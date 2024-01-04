import { useState } from "react";
import { loadLocalStorage } from '../services/loader';
import { getAllAlbums, getAllArtist } from "../services/localStorageHandler";
import { useAlbumStore } from "../stores/useAlbumStore";
import { useArtistStore } from "../stores/useArtistStore";

import addMusicLogo from "../assets/addMusic.svg";
import addAlbumLogo from "../assets/addAlbum.svg";
import addArtistLogo from "../assets/addArtist.svg";
import fillIn from "../assets/fillIn.svg";

import ModalForm from "./ModalForm";

const SaveOptions = () => {
  const [typeForm, setTypeForm] = useState('');

  const { setAlbums } = useAlbumStore();
  const { setArtists } = useArtistStore();

  const loadData = () => {
    if (!localStorage.getItem('artists')) {
      loadLocalStorage();
    }

    setAlbums(getAllAlbums(true));
    setArtists(getAllArtist());
  }

  return (
    <div className="join join-horizontal lg:join-horizontal">
      <button className="btn join-item"  onClick={ ()=>{setTypeForm('music'); document.getElementById('form_modal').showModal()}}>
        <img className="w-7 h-7" src={addMusicLogo} alt="add Music" />
      </button>
      <button className="btn join-item" onClick={()=>{setTypeForm('album'); document.getElementById('form_modal').showModal()}}>
        <img className="w-7 h-7" src={addAlbumLogo} alt="add Album" />
      </button>
      <button className="btn join-item" onClick={()=>{setTypeForm('artist'); document.getElementById('form_modal').showModal()}}>
        <img className="w-7 h-7" src={addArtistLogo} alt="add Artist" />
      </button>
      <button className="btn join-item" onClick={loadData}>
        <img className="w-7 h-7" src={fillIn} alt="add Music" />
      </button>
      <ModalForm typeForm={typeForm}/>
    </div>
  );
};

export default SaveOptions;