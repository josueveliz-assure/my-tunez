import { v4 as uuid } from 'uuid';

export const saveArtist = ({name, members, website, imagePath}) => {
  const artist = {
    id: uuid(),
    name,
    genderList: [],
    members,
    website,
    imagePath
  }

  const artists = getAllArtist();
  artists.push(artist);

  localStorage.setItem('artists', JSON.stringify(artists));
}

export const getAllArtist = () => {
  return JSON.parse(localStorage.getItem('artists')) || [];
}

export const saveMusic = ({title, gender, releaseYear, artistId, albumId, length, link}) => {
  const music = {
    id: uuid(),
    title,
    gender,
    releaseYear,
    artistId,
    albumId,
    length,
    link
  }

  const musicList = getAllMusic();
  musicList.push(music);

  addGender(artistId, gender);
  addAlbum(albumId, music.id);

  localStorage.setItem('music', JSON.stringify(musicList));
}

const addGender = (artistId, gender) => {
  const artists = getAllArtist();
  const artist = artists.find(artist => artist.id === artistId);
  if (artist && !artist.genderList.includes(gender)) {
    artist.genderList.push(gender);

    localStorage.setItem('artists', JSON.stringify(artists));
  }
};

const addAlbum = (albumId, musicId) => {
  const albums = getAllAlbums();
  const album = albums.find(album => album.id === albumId);
  if (album && !album.musicList.includes(musicId)) {
    album.musicList.push(musicId);

    localStorage.setItem('albums', JSON.stringify(albums));
  }
};

export const getAllMusic = () => {
  return JSON.parse(localStorage.getItem('music')) || [];
}

const getMusicOfArtist = ({artistId}) => {
  const musicList = getAllMusic();

  const artistMusic = musicList.filter(music => music.artistId === artistId);

  return artistMusic;
}

export const saveAlbum = ({title, gender, releaseYear, albumCover}) => {
  const album = {
    id: uuid(),
    title,
    gender,
    releaseYear,
    albumCover,
    musicList: []
  };

  const albums = getAllAlbums();

  albums.push(album);

  localStorage.setItem('albums', JSON.stringify(albums));
}

export const getAllAlbums = (detail = false) => {
  if(detail){
    const albums = getAllAlbums();
    return albums.map(album => {
      album.musicList = getMusicListOfAlbum(album);
      return album;
    });
  }
  return JSON.parse(localStorage.getItem('albums')) || [];
}

const getMusicListOfAlbum = (album) => {
  const allMusic = getAllMusic();
  return allMusic.filter(music => album.musicList.includes(music.id));
}

export const albumsOfArtist = (artistId) => {
  const albums = getAllAlbums(true);
  return albums.filter(album => isOwnerOfAlbum(artistId, album));
}

const isOwnerOfAlbum = (artistId, album) => {
  return album.musicList.some(music => music.artistId === artistId);
}