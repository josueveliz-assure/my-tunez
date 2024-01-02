import { v4 as uuid } from 'uuid';

export const saveArtist = ({name, members, website, imagePath}) => {
  const artist = {
    id: uuid(),
    name,
    genreList: [],
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

export const saveMusic = ({title, genre, releaseDate, artistId, albumId, length, link}) => {
  const music = {
    id: uuid(),
    title,
    genre,
    releaseDate,
    artistId,
    albumId,
    length,
    link
  }

  const musicList = getAllMusic();
  musicList.push(music);

  addGenre(artistId, genre);
  addAlbum(albumId, music.id);

  localStorage.setItem('music', JSON.stringify(musicList));
}

const addGenre = (artistId, genre) => {
  const artists = getAllArtist();
  const artist = artists.find(artist => artist.id === artistId);
  if (artist && !artist.genreList.includes(genre)) {
    artist.genreList.push(genre);

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

export const getMusicById = (musicId) => {
  const musicList = getAllMusic();
  const music =  musicList.find(music => music.id === musicId);
  if (music) {
    music.artist = getArtistById(music.artistId);
    music.album = getAlbumById(music.albumId);
  }
  return music;
}

const getAlbumById = (albumId) => {
  const albums = getAllAlbums();
  const album = albums.find(album => album.id === albumId);
  return album;
}

const getArtistById = (artistId) => {
  const artists = getAllArtist();
  const artist = artists.find(artist => artist.id === artistId);
  return artist;
}

export const saveAlbum = ({title, genre, releaseDate, albumCover, artistId}) => {
  const album = {
    id: uuid(),
    title,
    genre,
    releaseDate,
    albumCover,
    musicList: [],
    artistId
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
  return albums.filter(album => album.artistId === artistId);
}

export const artistsOfAlbum = (albumId) => {
  const album = getAllAlbums().find(album => album.id === albumId);
  console.log(album);
  const artists = getAllArtist();
  return artists.filter(artist => artist.id === album.artistId);
}