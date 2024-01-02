import { useEffect, useState } from 'react';
import { useArtistStore } from '../stores/useArtistStore'
import { useAlbumStore } from '../stores/useAlbumStore';
import { albumsOfArtist, getAllAlbums } from '../services/localStorageHandler';

const ArtistsList = ({ artists }) => {
  const [artistSelectedId, setArtistSelectedId] = useState(null);

  const { setArtistId } = useArtistStore();
  const { setAlbums } = useAlbumStore();

  useEffect(() => {
    setArtistId(artistSelectedId);
    if (artistSelectedId) {
      setAlbums(albumsOfArtist(artistSelectedId));
    } else {
      setAlbums(getAllAlbums(true));
    }
  }, [artistSelectedId]);

  return (
    <div className='overflow-y-auto max-h-full'>
      <ul className='menu bg-base-200'>
        {artists.length !==0 && <li key={0}><a className='pt-3 pb-3' onClick={() => setArtistSelectedId(null)}>All Artists</a></li>}
        {artists.map((artist, index) => (
          <li key={index} ><a className='pt-3 pb-3' onClick={() => setArtistSelectedId(artist.id)}>{artist.name}</a></li>
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
