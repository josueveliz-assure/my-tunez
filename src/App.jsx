import React from 'react';
import { useState, useEffect } from 'react';
import Artists from './components/ArtistsList';
import AlbumsList from './components/AlbumsList';
import MusicPlayer from './components/MusicPlayer';
import OptionsToolbar from './components/OptionsToolbar';
import { loadLocalStorage } from './services/loader';
import { getAllArtist, getAllAlbums, albumsOfArtist } from './services/localStorageHandler';
import { useArtistStore } from './stores/useArtistStore';
import { useAlbumStore } from './stores/useAlbumStore';

const App = () => {
    
    if (!localStorage.getItem('artists')) {
        loadLocalStorage();
    }
    
    const [artistList, setArtistList] = useState(getAllArtist());
    const [albumList, setAlbumList] = useState(getAllAlbums(true));

    const { artistId, artists } = useArtistStore();
    const { albums } = useAlbumStore();

    useEffect(() => {
        if (artistId) {
            setAlbumList(albumsOfArtist(artistId));
        } else {
            setAlbumList(getAllAlbums(true));
        }
    }, [artistId]);

    useEffect(() => {
        setArtistList(getAllArtist());
    }, [artists]);

    useEffect(() => {
        setAlbumList(albums);
    }, [albums]);

    return (
        <div className='app flex flex-col'>
            <div className='h-[15vh] bg-base-content text-slate-400'>
                <MusicPlayer />
            </div>
            <div className='h-[10vh] bg-base-300'>
                <OptionsToolbar />
            </div>
            <div className='h-[75vh] flex flex-row'>
                <div className='basis-1/4 bg-base-200 artist-block'>
                    <Artists artists={artistList}/>
                </div>
                <div className='flex-grow bg-base-200'>
                    <AlbumsList albums={albumList}/>
                </div>
            </div>
        </div>
    );
}

export default App;
