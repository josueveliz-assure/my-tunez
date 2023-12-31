import React from "react";
import addMusicLogo from "../assets/addMusic.svg";
import addAlbumLogo from "../assets/addAlbum.svg";
import addArtistLogo from "../assets/addArtist.svg";

const SaveOptions = () => {
  return (
    <div className="join join-vertical lg:join-horizontal">
      <button className="btn join-item">
        <img className="w-7 h-7" src={addMusicLogo} alt="add Music" />
      </button>
      <button className="btn join-item">
        <img className="w-7 h-7" src={addAlbumLogo} alt="add Album" />
      </button>
      <button className="btn join-item">
        <img className="w-7 h-7" src={addArtistLogo} alt="add Album" />
      </button>
    </div>
  );
};

export default SaveOptions;