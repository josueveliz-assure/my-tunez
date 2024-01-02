import React from 'react';

const ArtistsList = ({ artists }) => {
  return (
    <div className='overflow-y-auto max-h-full'>
      <ul className='menu bg-base-200'>
        <li key={0}><a className='pt-3 pb-3'>All Artists</a></li>
        {artists.map((artist, index) => (
          <li key={index}><a className='pt-3 pb-3'>{artist.name}</a></li>
        ))}
        {artists.length === 0 && (
          <li>
            <a className='pt-3 pb-3 text-xl'>No artists </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ArtistsList;
