import React from 'react';

const ArtistsList = ({ artists }) => {
  return (
    <div className='overflow-y-auto max-h-full'>
      <ul className='menu bg-base-200'>
        {artists.map((artist, index) => (
          <li key={index}><a className='pt-3 pb-3'>{artist.name}</a></li>
        ))}
      </ul>
    </div>
  );
};

export default ArtistsList;
