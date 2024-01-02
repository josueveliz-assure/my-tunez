import React from "react";
import { useState } from "react";
import addMusicLogo from "../assets/addMusic.svg";
import addAlbumLogo from "../assets/addAlbum.svg";
import addArtistLogo from "../assets/addArtist.svg";
import {
  getAllArtist,
  saveArtist,
  getAllMusic,
  saveMusic,
  getAllAlbums,
  saveAlbum,
  albumsOfArtist
} from "../services/localStorageHandler";
import { loadLocalStorage } from "../services/loader";
import ModalForm from "./ModalForm";

const SaveOptions = () => {
  const [typeForm, setTypeForm] = useState('');

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
      <ModalForm typeForm={typeForm}/>
    </div>
  );
};

export default SaveOptions;