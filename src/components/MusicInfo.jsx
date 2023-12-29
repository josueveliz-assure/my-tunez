import React from 'react';

const MusicInfo = ({ music }) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="mt-4 mb-4 mr-2">
        <img className="object-cover h-20 w-20 rounded-md" src={music.imageAlbum}/>
      </div>
      <div className="flex flex-col mt-4 mb-4 mr-2 max-w-60 min-w-60">
        <h3 className="font-bold">{music.title}</h3>
        <h4 className=''>{music.author}</h4>
      </div>
    </div>
  );
}

export default MusicInfo;