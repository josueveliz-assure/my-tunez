import React from "react";
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

const SaveOptions = () => {

  const artist = () => {
    let artists = getAllArtist();
    if (artists.length === 0) {
      loadLocalStorage();
      artists = getAllArtist();
    }
    console.log(artists);
  }

  const music = () => {
    let music = getAllMusic();
    if (music.length === 0) {
      loadLocalStorage();
      music = getAllMusic();
    }
    console.log(music);
  }

  const album = () => {
    let albums = getAllAlbums(true);
    if (albums.length === 0) {
      loadLocalStorage();
      albums = getAllAlbums();
    }
    console.log(albums);
  }

  const albumOfArtist = () => {
    let albums = albumsOfArtist(1);
    if (albums.length === 0) {
      loadLocalStorage();
      albums = albumsOfArtist(1);
    }
    console.log(albums);
  }

  return (
    <div className="join join-vertical lg:join-horizontal">
      <button className="btn join-item" onClick={music}>
        <img className="w-7 h-7" src={addMusicLogo} alt="add Music" />
      </button>
      <button className="btn join-item" onClick={album}>
        <img className="w-7 h-7" src={addAlbumLogo} alt="add Album" />
      </button>
      <button className="btn join-item" onClick={albumOfArtist}>
        <img className="w-7 h-7" src={addArtistLogo} alt="add Artist" />
      </button>
    </div>
  );
};

export default SaveOptions;