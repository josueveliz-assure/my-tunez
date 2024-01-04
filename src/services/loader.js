export const loadLocalStorage = () => {
  localStorage.setItem('artists', JSON.stringify(artists));
  localStorage.setItem('music', JSON.stringify(musicList));
  localStorage.setItem('albums', JSON.stringify(albums));
}

const artists = [
  {
    id: '1',
    name: 'The Neighbourhood',
    genreList: ['alternative', 'indie'],
    members: [
      'Jesse Rutherford',
      'Zach Abels',
      'Brandon Alexander Fried',
      'Mikey Margott',
      'Bryan Sammins',
      'Jeremy Freedman'
    ],
    website: 'https://thenbhd.com/',
    imagePath: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/50233830-e600-44b0-b94e-3cedc6406004/d73jgne-f3eada32-7199-4b18-be12-84f2f608b68e.jpg/v1/fill/w_204,h_204,q_75,strp/the_neighbourhood_logo_by_vampykatty_d73jgne-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjA0IiwicGF0aCI6IlwvZlwvNTAyMzM4MzAtZTYwMC00NGIwLWI5NGUtM2NlZGM2NDA2MDA0XC9kNzNqZ25lLWYzZWFkYTMyLTcxOTktNGIxOC1iZTEyLTg0ZjJmNjA4YjY4ZS5qcGciLCJ3aWR0aCI6Ijw9MjA0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.A-DF8ggAGxd7n92KLtpcHapSsN1ZKyZz4iHgLHZVfto'
  },
  {
    id: '2',
    name: 'Arctic Monkeys',
    genreList: ['indie', 'rock'],
    members: [
      'Alex Turner',
      'Jamie Cook',
      'Nick O\'Malley',
      'Matt Helders'
    ],
    website: 'https://www.arcticmonkeys.com/',
    imagePath: 'https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f'
  },
  {
    id: '3',
    name: 'The Strokes',
    genreList: ['indie', 'rock'],
    members: [
      'Julian Casablancas',
      'Albert Hammond Jr.',
      'Nick Valensi',
      'Nikolai Fraiture',
      'Fabrizio Moretti'
    ],
    website: 'https://www.thestrokes.com/',
    imagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/The_Strokes_by_Roger_Woolman.jpg/300px-The_Strokes_by_Roger_Woolman.jpg'
  },
  {
    id: '4',
    name: 'The Killers',
    genreList: ['indie', 'rock'],
    members: [
      'Brandon Flowers',
      'Dave Keuning',
      'Mark Stoermer',
      'Ronnie Vannucci Jr.'
    ],
    website: 'https://www.thekillersmusic.com/',
    imagePath: 'https://i.scdn.co/image/ab6761610000e5eb207b21f3ed0ee96adce3166a'
  },
  {
    id: '5',
    name: 'The Black Keys',
    genreList: ['indie', 'rock'],
    members: [
      'Dan Auerbach',
      'Patrick Carney'
    ],
    website: 'https://www.theblackkeys.com/',
    imagePath: 'https://i.scdn.co/image/ab6761610000e5ebae537808bd15be9f7031e99b'
  },
  {
    id: '6',
    name: 'The Kooks',
    genreList: ['indie', 'rock'],
    members: [
      'Luke Pritchard',
      'Hugh Harris',
      'Peter Denton',
      'Alexis Nunez'
    ],
    website: 'https://thekooks.com/',
    imagePath: 'https://i.scdn.co/image/ab6761610000e5ebd263e0042b36fd357c8c7cdb'
  }
];

const musicList = [
  {
    id: '1',
    title: 'Sweater Weather',
    genre: 'alternative',
    releaseDate: '2013-02',
    artistId: '1',
    albumId: '1',
    length: '4:00',
    link: 'src/music/04 The Neighbourhood - Sweater Weather.mp3'
  },
  {
    id: '2',
    title: 'Daddy Issues',
    genre: 'alternative',
    releaseDate: '2015-04',
    artistId: '1',
    albumId: '2',
    length: '3:55',
    link: 'src\\music\\06 The Neighbourhood - Daddy Issues.mp3'
  },
  {
    id: '3',
    title: 'Softcore',
    genre: 'alternative',
    releaseDate: '2018-07',
    artistId: '1',
    albumId: '3',
    length: '3:26',
    link: 'src\\music\\05 The Neighbourhood - Softcore.mp3'
  },
  {
    id: '4',
    title: 'Reflections',
    genre: 'indie',
    releaseDate: '2018-11',
    artistId: '1',
    albumId: '3',
    length: '4:04',
    link: 'src\\music\\10 The Neighbourhood - Reflections.mp3'
  },
  {
    id: '5',
    title: 'You Get Me So High',
    genre: 'alternative',
    releaseDate: '2018-01',
    artistId: '1',
    albumId: '3',
    length: '2:33',
    link: 'src\\music\\09 The Neighbourhood - You Get Me So High.mp3'
  },
  {
    id: '6',
    title: 'Nervous',
    genre: 'alternative',
    releaseDate: '2018-2',
    artistId: '1',
    albumId: '3',
    length: '4:05',
    link: 'src\\music\\19 The Neighbourhood - Nervous.mp3'
  },
  {
    id: '7',
    title: 'Dust',
    genre: 'indie',
    releaseDate: '2018-02',
    artistId: '1',
    albumId: '3',
    length: '3:28',
    link: 'src\\music\\01 The Neighbourhood - Dust.mp3'
  },
  {
    id: '8',
    title: 'Scary Love',
    releaseDate: '2018-01',
    artistId: '1',
    albumId: '3',
    length: '3:42',
    link: 'src\\music\\04 The Neighbourhood - Scary Love.mp3'
  },
  {
    id: '9',
    title: 'Do I Wanna Know?',
    releaseDate: '2013-06',
    artistId: '2',
    albumId: '4',
    length: '4:32',
    link: 'src\\music\\01 Arctic Monkeys - Do I Wanna Know.mp3'
  }
];

const albums = [
  {
    id: '1',
    title: 'I Love You',
    releaseDate: '2013-04',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b273a6de8caf3859196ec74650f9',
    musicList: [
      '1'
    ],
    artistId: '1'
  },
  {
    id: '2',
    title: 'Wiped Out!',
    releaseDate: '2015-10',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b2733066581d697fbdee4303d685',
    musicList: [
      '2'
    ],
    artistId: '1'
  },
  {
    id: '3',
    title: 'Hard To Imagine The Neighbourhood Ever Changing',
    releaseDate: '2018-09',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b2739b6ac98a52f62d5cb473da40',
    musicList: [
      '3', '4', '5', '6', '7', '8'
    ],
    artistId: '1'
  },
  {
    id: '4',
    title: 'AM',
    releaseDate: '2013-09',
    albumCover: 'https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163',
    musicList: [
      '9'
    ],
    artistId: '2'
  }

];