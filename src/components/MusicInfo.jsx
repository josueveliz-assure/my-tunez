import React from 'react';

const MusicInfo = ({ music }) => {

  return (
    <div className="flex flex-row items-center gap-3">
      { music ?
        <>
          <div className="mt-4 mb-4 mr-2">
            <img className="object-cover h-20 w-20 rounded-md" src={music && music.albumCover}/>
          </div>
          <div className="flex flex-col mt-4 mb-4 mr-2 w-60">
            <h3 className="font-bold">{music && music.title}</h3>
            <h4 className=''>{music && music.artist}</h4>
          </div>
        </>
        : <h3 className="font-bold ml-10">No music selected</h3>
      }
    </div>
  );
}

export default MusicInfo;