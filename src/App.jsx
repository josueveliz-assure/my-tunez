import React from 'react';
import { useState, useEffect } from 'react';
import Artists from './components/ArtistsList';
import AlbumsList from './components/AlbumsList';
import Reproducer from './components/Reproducer';
import OptionsToolbar from './components/OptionsToolbar';
import { loadLocalStorage } from './services/loader';
import { getAllArtist, getAllAlbums } from './services/localStorageHandler';

const App = () => {
    /*
    if (!localStorage.getItem('artists')) {
        loadLocalStorage();
    }
    */

    const [artists, setArtists] = useState(getAllArtist());
    const [albums, setAlbums] = useState(getAllAlbums(true));


    return (
        <div className='app flex flex-col'>
            <div className='h-[15vh] bg-base-content text-slate-400'>
                <Reproducer />
            </div>
            <div className='h-[10vh] bg-base-300'>
                <OptionsToolbar />
            </div>
            <div className='h-[75vh] flex flex-row'>
                <div className='basis-1/4 bg-base-200 artist-block'>
                    <Artists artists={artists}/>
                </div>
                <div className='flex-grow bg-base-200'>
                    <AlbumsList albums={albums}/>
                </div>
            </div>
        </div>
    );
}

export default App;

/*
const artists = [
        { name: 'Artist 1' },
        { name: 'Artist 2' },
        { name: 'Artist 3' },
        { name: 'Artist 4' },
        { name: 'Artist 5' },
        { name: 'Artist 6' },
        { name: 'Artist 7' },
        { name: 'Artist 8' },
        { name: 'Artist 9' },
        { name: 'Artist 10'},
        { name: 'Artist 11'},
        { name: 'Artist 12'},
        { name: 'Artist 13'},
      ];

    const albums = [
        {
            name: 'Album 1', artist: 'Artist 1', portrait: 'https://picsum.photos/200/300',
            musics: [
                'Music 1',
                'Music 2',
                'Music 3',
                'Music 4',
                'Music 5',
                'Music 6',
                'Music 7',
            ]
        },
        {
            name: 'Album 2', artist: 'Artist 2', portrait: 'https://picsum.photos/200/300',
            musics: [
                'Music 1',
                'Music 2',
                'Music 3',
            ]
        },
        {
            name: 'Album 3', artist: 'Artist 3', portrait: 'https://picsum.photos/200/300',
            musics: [
                'Music 1',
                'Music 2',
                'Music 3',
                'Music 4',
            ]
        }
    ]
*/