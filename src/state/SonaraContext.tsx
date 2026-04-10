import React from 'react';

export type TabKey = 'home' | 'search' | 'library' | 'profile';

export type Artist = {
  id: string;
  name: string;
  bio: string;
  genre: string;
  imageUri: string;
};

export type LyricsLine = {
  time: number;
  text: string;
};

export type Track = {
  id: string;
  title: string;
  artistId: string;
  album: string;
  duration: string;
  artworkUri: string;
  recommended?: boolean;
  trending?: boolean;
  favouriteArtist?: boolean;
  tags: string[];
  lyrics: LyricsLine[];
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  trackIds: string[];
  editable: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUri: string;
};

type AuthResult = {
  ok: boolean;
  message?: string;
};

type SonaraState = {
  users: User[];
  currentUserId: string | null;
  tracks: Track[];
  artists: Artist[];
  playlists: Playlist[];
  selectedPlaylistId: string;
  queueTrackIds: string[];
  currentTrackId: string;
  isPlaying: boolean;
  trackProgress: number;
};

type SonaraContextValue = SonaraState & {
  currentUser: User | null;
  currentTrack: Track;
  currentArtist: Artist;
  selectedPlaylist: Playlist;
  currentTrackDurationSeconds: number;
  currentTrackIndexInQueue: number;
  signIn: (email: string, password: string) => AuthResult;
  signUp: (name: string, email: string, password: string) => AuthResult;
  logout: () => void;
  playTrack: (trackId: string, queueTrackIds?: string[], playlistId?: string) => void;
  togglePlayback: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seekTo: (seconds: number) => void;
  selectPlaylist: (playlistId: string) => void;
  createPlaylist: (name: string, description?: string) => Playlist;
  renamePlaylist: (playlistId: string, name: string, description?: string) => void;
  addTrackToPlaylist: (playlistId: string, trackId: string) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
};

const artists: Artist[] = [
  {
    id: 'artist-blueprint',
    name: 'The Blueprint Collective',
    bio: 'Known for structural field recordings and calm synth arrangements.',
    genre: 'Ambient / Neoclassical',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAayWOnJqyJErnCaSWxnUSe08qEZF1l2YAAktIqH0UH-ZayZJmoLRfIocjw9QKSprrr7y8yCL8x8_0yBzirgXyfCpJvSjGVZqCsjzrT8UByaQtBfH06Ws2EjkD1zhFWm6Cvf_ypMuBHX36LcXhJj1jivEZQ3P0EfSKPdmMXmjMpjdqKSU3VrFyny7bouUE2nI_QmUODPWP_0lFRv4bsxawQtdFGqwkHQTavKq7NIMTvORnyteBDKvZM6DkVtdPNjCEmvsZTIt8A',
  },
  {
    id: 'artist-drafting-suite',
    name: 'Drafting Suite',
    bio: 'Precise melodies that sit between design sketches and nocturnal listening.',
    genre: 'Lo-fi / Dream Pop',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfyfeF0Nh5-s4QtoO1iSbOiD0VLcgvqsXw-z_rB3SLon9zmZKeE2dfqWWCbvB_bGhCV__UAHyXfWcUUQ1mTYpoffYf7sJYvo3WXjB6RO_FTD8infdFiZ6ncA7x7fQm8Dxe0-ZBXPe6oGGVde4evOF4RbzKDpbGnu6FhRAUW4zAJt_1xZdi8rqFJiOUZkFdxfuGGmItNmUVD8u9yvvs53fvMMrgnNf_2NQslOutHbuQ_XjLY36e3Y_opnvBFmPEnK7RsmsIDP1w',
  },
  {
    id: 'artist-concrete-dreams',
    name: 'Concrete Dreams',
    bio: 'Heavy textures and warm low-end designed for late sessions.',
    genre: 'Electronic / Instrumental',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuYG_KsJJuTId5-JhRDzff_P3PV3ptY-pdRfcNe-v-vrm6k77HqtuQOwtEBaoeU4S3BQtEatovOkL45Q3aerDa2JnC1FRXObDe-snfkmWSLSDOjGkFiaCP4FFF3KlA5ICYV6AEHjMjMT0farGhcs0u5FnysDueKD2CuYzpQzbRRJul6418AhEh_i8oTJHXXheO0huJR42fCgqsdO-ivGcuOgKfjuu28fTv982RD7j-95riaE-FuBmppUlkYby43EyFismSGlxt',
  },
  {
    id: 'artist-isometric-theory',
    name: 'Isometric Theory',
    bio: 'Minimal, measured structures with a melodic edge.',
    genre: 'Indie / Experimental',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdkeZiYpXMErutdazzK7jr9DM3L66bArrxO-Xiq6_p7lGFWCzNTIHgJX6c1wTozqIE6ldCq8gNlaGPGa2XGPnDZ8oKvKJmppa4Gl7qAN9yukXNPxHQw0sMs58e6URCMcZwrcnnlrp7j7eK0BFh1C4zeEVEZki-YzTKgCXj9COCTKOR-4cviBakYc78nGs_6D4sbvofFiuYTtejte8JJ8QDzHYwJQyIrRHoDjyTspjG7P-ewS0xdzklaFwFQHf9FvyN01LEVlx1',
  },
  {
    id: 'artist-axonometric',
    name: 'Axonometric',
    bio: 'A fluid blend of rhythm, architecture, and motion.',
    genre: 'Alternative / Pop',
    imageUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAk1O8NuzWKx6dQK9umPUHGjE4DO9WpTrjQvfwChtLpQHq2kijhbNQV4gMdcPGM8GzV7hSAg-v8ViYMVq76vcIvcIBa-FcvzEGTDqOZWXJ9yzTLH6RQBUqMG_zw6iVjIR-nE5mM3qkQY7tFbWWIYi1jruzQnw01VArhHgX8k-6g5Dy24XVfw3xQWBYva-TjC125bXwHbdkw11q95tXaOeUcdCOMKBgsRRH94hMKx_8kZ71pynLzkfaJALmQtx_S_xLq7W0NRwWp',
  },
];

const tracks: Track[] = [
  {
    id: 'track-kinetic-structures',
    title: 'Kinetic Structures',
    artistId: 'artist-blueprint',
    album: 'Structural Lines',
    duration: '3:18',
    artworkUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAk1O8NuzWKx6dQK9umPUHGjE4DO9WpTrjQvfwChtLpQHq2kijhbNQV4gMdcPGM8GzV7hSAg-v8ViYMVq76vcIvcIBa-FcvzEGTDqOZWXJ9yzTLH6RQBUqMG_zw6iVjIR-nE5mM3qkQY7tFbWWIYi1jruzQnw01VArhHgX8k-6g5Dy24XVfw3xQWBYva-TjC125bXwHbdkw11q95tXaOeUcdCOMKBgsRRH94hMKx_8kZ71pynLzkfaJALmQtx_S_xLq7W0NRwWp',
    recommended: true,
    trending: true,
    favouriteArtist: true,
    tags: ['ambient', 'focus'],
    lyrics: [
      { time: 0, text: 'Lines converge in the quiet frame' },
      { time: 42, text: 'A pulse inside the scaffolding' },
      { time: 84, text: 'Every echo becomes a shape' },
      { time: 126, text: 'The structure breathes again' },
    ],
  },
  {
    id: 'track-vellum-echoes',
    title: 'Vellum Echoes',
    artistId: 'artist-drafting-suite',
    album: 'Paper Cities',
    duration: '4:22',
    artworkUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDjSFGlPYofrI5QyKNQVVRDiOT3tTwi7mkQqPvRV6hOiOit-yfXN-JeuPlCckjC69UpbCOn5yTVsSWtBL6ao_qhX4g6VwLSydfFkcI3BN0nUNkeylZ3Ux3unBo9n3Orgl3XSS34xywi8yBHs4bfH96lrAPLXd-NsE1v8OkcMySJyXFuUbmmRpDg7f3irYvckQ8DNKUWNEx0fGNTkPzZxdjNVY3iF4zLgDcD7-uj12Z_1fRd0--SdsvXdr_gz5kDzoe7Dm-kr3I-',
    recommended: true,
    tags: ['lo-fi', 'dream pop'],
    lyrics: [
      { time: 0, text: 'Fold the morning into soft geometry' },
      { time: 58, text: 'Ink dries slowly on the vellum line' },
      { time: 118, text: 'Echoes move through empty rooms' },
      { time: 180, text: 'We keep the light in outline form' },
    ],
  },
  {
    id: 'track-axis-alignment',
    title: 'Axis Alignment',
    artistId: 'artist-isometric-theory',
    album: 'Measured Space',
    duration: '2:54',
    artworkUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdkeZiYpXMErutdazzK7jr9DM3L66bArrxO-Xiq6_p7lGFWCzNTIHgJX6c1wTozqIE6ldCq8gNlaGPGa2XGPnDZ8oKvKJmppa4Gl7qAN9yukXNPxHQw0sMs58e6URCMcZwrcnnlrp7j7eK0BFh1C4zeEVEZki-YzTKgCXj9COCTKOR-4cviBakYc78nGs_6D4sbvofFiuYTtejte8JJ8QDzHYwJQyIrRHoDjyTspjG7P-ewS0xdzklaFwFQHf9FvyN01LEVlx1',
    recommended: true,
    trending: true,
    tags: ['indie', 'experimental'],
    lyrics: [
      { time: 0, text: 'Rotate the frame until it settles' },
      { time: 36, text: 'Find the center in the drift' },
      { time: 90, text: 'The axis holds the moving world' },
      { time: 140, text: 'Alignment is another kind of drift' },
    ],
  },
  {
    id: 'track-synthetic-elevations',
    title: 'Synthetic Elevations',
    artistId: 'artist-concrete-dreams',
    album: 'Pulse Studies',
    duration: '4:22',
    artworkUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuYG_KsJJuTId5-JhRDzff_P3PV3ptY-pdRfcNe-v-vrm6k77HqtuQOwtEBaoeU4S3BQtEatovOkL45Q3aerDa2JnC1FRXObDe-snfkmWSLSDOjGkFiaCP4FFF3KlA5ICYV6AEHjMjMT0farGhcs0u5FnysDueKD2CuYzpQzbRRJul6418AhEh_i8oTJHXXheO0huJR42fCgqsdO-ivGcuOgKfjuu28fTv982RD7j-95riaE-FuBmppUlkYby43EyFismSGlxt',
    trending: true,
    tags: ['electronic', 'pulse'],
    lyrics: [
      { time: 0, text: 'We build a tower from oscillation' },
      { time: 64, text: 'Rise above the static floor' },
      { time: 128, text: 'The skyline answers in delay' },
      { time: 192, text: 'Synthetic, but still alive' },
    ],
  },
  {
    id: 'track-brutalist-harmony',
    title: 'Brutalist Harmony',
    artistId: 'artist-concrete-dreams',
    album: 'Stone & Light',
    duration: '3:51',
    artworkUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDuYG_KsJJuTId5-JhRDzff_P3PV3ptY-pdRfcNe-v-vrm6k77HqtuQOwtEBaoeU4S3BQtEatovOkL45Q3aerDa2JnC1FRXObDe-snfkmWSLSDOjGkFiaCP4FFF3KlA5ICYV6AEHjMjMT0farGhcs0u5FnysDueKD2CuYzpQzbRRJul6418AhEh_i8oTJHXXheO0huJR42fCgqsdO-ivGcuOgKfjuu28fTv982RD7j-95riaE-FuBmppUlkYby43EyFismSGlxt',
    trending: true,
    tags: ['ambient', 'bass'],
    lyrics: [
      { time: 0, text: 'A concrete beat beneath the glow' },
      { time: 52, text: 'Mass and motion in balance' },
      { time: 104, text: 'The harmony is harder here' },
      { time: 156, text: 'Still the city holds the tone' },
    ],
  },
  {
    id: 'track-drafting-lines',
    title: 'Drafting Lines',
    artistId: 'artist-drafting-suite',
    album: 'Paper Cities',
    duration: '4:01',
    artworkUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfyfeF0Nh5-s4QtoO1iSbOiD0VLcgvqsXw-z_rB3SLon9zmZKeE2dfqWWCbvB_bGhCV__UAHyXfWcUUQ1mTYpoffYf7sJYvo3WXjB6RO_FTD8infdFiZ6ncA7x7fQm8Dxe0-ZBXPe6oGGVde4evOF4RbzKDpbGnu6FhRAUW4zAJt_1xZdi8rqFJiOUZkFdxfuGGmItNmUVD8u9yvvs53fvMMrgnNf_2NQslOutHbuQ_XjLY36e3Y_opnvBFmPEnK7RsmsIDP1w',
    favouriteArtist: true,
    tags: ['focus', 'dream pop'],
    lyrics: [
      { time: 0, text: 'Every line is a promise in pencil' },
      { time: 60, text: 'Measure twice, then drift away' },
      { time: 120, text: 'We are the margin notes tonight' },
      { time: 180, text: 'The plan becomes a feeling' },
    ],
  },
  {
    id: 'track-modern-patio',
    title: 'Modern Patio',
    artistId: 'artist-axonometric',
    album: 'Open Plan',
    duration: '5:10',
    artworkUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAk1O8NuzWKx6dQK9umPUHGjE4DO9WpTrjQvfwChtLpQHq2kijhbNQV4gMdcPGM8GzV7hSAg-v8ViYMVq76vcIvcIBa-FcvzEGTDqOZWXJ9yzTLH6RQBUqMG_zw6iVjIR-nE5mM3qkQY7tFbWWIYi1jruzQnw01VArhHgX8k-6g5Dy24XVfw3xQWBYva-TjC125bXwHbdkw11q95tXaOeUcdCOMKBgsRRH94hMKx_8kZ71pynLzkfaJALmQtx_S_xLq7W0NRwWp',
    favouriteArtist: true,
    tags: ['alternative', 'pop'],
    lyrics: [
      { time: 0, text: 'Patio light and the evening air' },
      { time: 72, text: 'We never rush the chorus here' },
      { time: 144, text: 'Open plan, open heart' },
      { time: 216, text: 'Let the outline hold the song' },
    ],
  },
];

const playlists: Playlist[] = [
  {
    id: 'playlist-focus',
    name: 'Late Night Focus',
    description: 'Quiet tracks for deep work and long drafting sessions.',
    trackIds: ['track-kinetic-structures', 'track-vellum-echoes', 'track-axis-alignment'],
    editable: true,
  },
  {
    id: 'playlist-structure-soul',
    name: 'Structure & Soul',
    description: 'Balance between clean layouts and warm textures.',
    trackIds: ['track-synthetic-elevations', 'track-brutalist-harmony'],
    editable: true,
  },
  {
    id: 'playlist-liked',
    name: 'Liked Songs',
    description: 'Everything you have saved to your personal archive.',
    trackIds: ['track-kinetic-structures', 'track-drafting-lines', 'track-modern-patio'],
    editable: false,
  },
];

const users: User[] = [
  {
    id: 'user-demo',
    name: 'Alex Rivera',
    email: 'alex.rivera@archaudio.tech',
    password: 'demo1234',
    avatarUri:
      'https://lh3.googleusercontent.com/aida-public/AB6AXB_LYCg-sVc2pNEoesNy56mzGn9vs-R3SDmbjlkceLmaZKyYcHjtL7xJbc7-nnmLvO5KdBNxvnFgmWBCGKAo_PBcDDWAXqvCZeRQXAq3jjALed2spZKzs2sFESY4fNHbxC6zUYwN-D7jr6O2pWfjKoFw48vrWz0bsgQaamHXMRvsAz3-WQCUdi_LVLEudenDlZU4JRxcjFAHD2Ki6b9V3xWArnQtoSrsmmyVn2ZGASvOFRweQ95kXQOPPGk3Pd02MOZZl3UdJxW',
  },
];

const initialState: SonaraState = {
  users,
  currentUserId: null,
  tracks,
  artists,
  playlists,
  selectedPlaylistId: 'playlist-focus',
  queueTrackIds: tracks.map(track => track.id),
  currentTrackId: 'track-kinetic-structures',
  isPlaying: false,
  trackProgress: 0,
};

const SonaraContext = React.createContext<SonaraContextValue | null>(null);

function parseDuration(duration: string) {
  const [minutes, seconds] = duration.split(':').map(Number);
  return minutes * 60 + seconds;
}

export function SonaraProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<SonaraState>(initialState);

  const currentUser = React.useMemo(
    () => state.users.find(user => user.id === state.currentUserId) ?? null,
    [state.currentUserId, state.users],
  );

  const currentTrack = React.useMemo(
    () => state.tracks.find(track => track.id === state.currentTrackId) ?? state.tracks[0],
    [state.currentTrackId, state.tracks],
  );

  const currentArtist = React.useMemo(
    () => state.artists.find(artist => artist.id === currentTrack.artistId) ?? state.artists[0],
    [currentTrack.artistId, state.artists],
  );

  const selectedPlaylist = React.useMemo(
    () => state.playlists.find(playlist => playlist.id === state.selectedPlaylistId) ?? state.playlists[0],
    [state.playlists, state.selectedPlaylistId],
  );

  const currentTrackDurationSeconds = React.useMemo(() => parseDuration(currentTrack.duration), [currentTrack.duration]);

  const currentTrackIndexInQueue = React.useMemo(() => {
    return Math.max(0, state.queueTrackIds.indexOf(currentTrack.id));
  }, [currentTrack.id, state.queueTrackIds]);

  React.useEffect(() => {
    if (!state.isPlaying) {
      return undefined;
    }

    const interval = setInterval(() => {
      setState(previousState => {
        const activeTrack = previousState.tracks.find(track => track.id === previousState.currentTrackId) ?? previousState.tracks[0];
        const durationSeconds = parseDuration(activeTrack.duration);
        const nextProgress = previousState.trackProgress + 1;

        if (nextProgress < durationSeconds) {
          return { ...previousState, trackProgress: nextProgress };
        }

        const queueTrackIds = previousState.queueTrackIds.length > 0 ? previousState.queueTrackIds : previousState.tracks.map(track => track.id);
        const currentIndex = queueTrackIds.indexOf(previousState.currentTrackId);
        const nextIndex = (currentIndex + 1) % queueTrackIds.length;

        return {
          ...previousState,
          currentTrackId: queueTrackIds[nextIndex],
          trackProgress: 0,
          isPlaying: true,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isPlaying]);

  const signIn = React.useCallback((email: string, password: string): AuthResult => {
    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = state.users.find(user => user.email.toLowerCase() === normalizedEmail && user.password === password);

    if (!normalizedEmail || !password) {
      return { ok: false, message: 'Email and password are required.' };
    }

    if (!matchedUser) {
      return { ok: false, message: 'Invalid credentials. Use the demo account or sign up.' };
    }

    setState(previousState => ({ ...previousState, currentUserId: matchedUser.id }));
    return { ok: true };
  }, [state.users]);

  const signUp = React.useCallback((name: string, email: string, password: string): AuthResult => {
    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!trimmedName || !normalizedEmail || !password) {
      return { ok: false, message: 'Name, email, and password are required.' };
    }

    if (state.users.some(user => user.email.toLowerCase() === normalizedEmail)) {
      return { ok: false, message: 'That email is already registered.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: trimmedName,
      email: normalizedEmail,
      password,
      avatarUri: currentUser?.avatarUri ?? state.users[0].avatarUri,
    };

    setState(previousState => ({
      ...previousState,
      users: [newUser, ...previousState.users],
      currentUserId: newUser.id,
    }));

    return { ok: true };
  }, [currentUser?.avatarUri, state.users]);

  const logout = React.useCallback(() => {
    setState(previousState => ({
      ...previousState,
      currentUserId: null,
      isPlaying: false,
      trackProgress: 0,
    }));
  }, []);

  const playTrack = React.useCallback((trackId: string, queueTrackIds?: string[], playlistId?: string) => {
    setState(previousState => ({
      ...previousState,
      currentTrackId: trackId,
      selectedPlaylistId: playlistId ?? previousState.selectedPlaylistId,
      trackProgress: 0,
      isPlaying: true,
      queueTrackIds: queueTrackIds && queueTrackIds.length > 0 ? queueTrackIds : previousState.queueTrackIds,
    }));
  }, []);

  const togglePlayback = React.useCallback(() => {
    setState(previousState => ({ ...previousState, isPlaying: !previousState.isPlaying }));
  }, []);

  const playNext = React.useCallback(() => {
    setState(previousState => {
      const queueTrackIds = previousState.queueTrackIds.length > 0 ? previousState.queueTrackIds : previousState.tracks.map(track => track.id);
      const currentIndex = queueTrackIds.indexOf(previousState.currentTrackId);
      const nextIndex = (currentIndex + 1) % queueTrackIds.length;

      return { ...previousState, currentTrackId: queueTrackIds[nextIndex], trackProgress: 0, isPlaying: true };
    });
  }, []);

  const playPrevious = React.useCallback(() => {
    setState(previousState => {
      const queueTrackIds = previousState.queueTrackIds.length > 0 ? previousState.queueTrackIds : previousState.tracks.map(track => track.id);
      const currentIndex = queueTrackIds.indexOf(previousState.currentTrackId);
      const previousIndex = (currentIndex - 1 + queueTrackIds.length) % queueTrackIds.length;

      return { ...previousState, currentTrackId: queueTrackIds[previousIndex], trackProgress: 0, isPlaying: true };
    });
  }, []);

  const seekTo = React.useCallback((seconds: number) => {
    setState(previousState => ({ ...previousState, trackProgress: Math.max(0, seconds) }));
  }, []);

  const selectPlaylist = React.useCallback((playlistId: string) => {
    setState(previousState => {
      const playlist = previousState.playlists.find(entry => entry.id === playlistId);

      return {
        ...previousState,
        selectedPlaylistId: playlistId,
        queueTrackIds: playlist?.trackIds.length ? playlist.trackIds : previousState.tracks.map(track => track.id),
      };
    });
  }, []);

  const createPlaylist = React.useCallback((name: string, description = '') => {
    const playlist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      description,
      trackIds: [],
      editable: true,
    };

    setState(previousState => ({
      ...previousState,
      playlists: [playlist, ...previousState.playlists],
      selectedPlaylistId: playlist.id,
    }));

    return playlist;
  }, []);

  const renamePlaylist = React.useCallback((playlistId: string, name: string, description?: string) => {
    setState(previousState => ({
      ...previousState,
      playlists: previousState.playlists.map(playlist => (
        playlist.id === playlistId
          ? { ...playlist, name, description: description !== undefined ? description : playlist.description }
          : playlist
      )),
    }));
  }, []);

  const addTrackToPlaylist = React.useCallback((playlistId: string, trackId: string) => {
    setState(previousState => ({
      ...previousState,
      playlists: previousState.playlists.map(playlist => {
        if (playlist.id !== playlistId || playlist.trackIds.includes(trackId)) {
          return playlist;
        }

        return { ...playlist, trackIds: [...playlist.trackIds, trackId] };
      }),
    }));
  }, []);

  const removeTrackFromPlaylist = React.useCallback((playlistId: string, trackId: string) => {
    setState(previousState => ({
      ...previousState,
      playlists: previousState.playlists.map(playlist => {
        if (playlist.id !== playlistId) {
          return playlist;
        }

        return { ...playlist, trackIds: playlist.trackIds.filter(existingTrackId => existingTrackId !== trackId) };
      }),
    }));
  }, []);

  const value = React.useMemo<SonaraContextValue>(
    () => ({
      ...state,
      currentUser,
      currentTrack,
      currentArtist,
      selectedPlaylist,
      currentTrackDurationSeconds,
      currentTrackIndexInQueue,
      signIn,
      signUp,
      logout,
      playTrack,
      togglePlayback,
      playNext,
      playPrevious,
      seekTo,
      selectPlaylist,
      createPlaylist,
      renamePlaylist,
      addTrackToPlaylist,
      removeTrackFromPlaylist,
    }),
    [
      state,
      currentUser,
      currentTrack,
      currentArtist,
      selectedPlaylist,
      currentTrackDurationSeconds,
      currentTrackIndexInQueue,
      signIn,
      signUp,
      logout,
      playTrack,
      togglePlayback,
      playNext,
      playPrevious,
      seekTo,
      selectPlaylist,
      createPlaylist,
      renamePlaylist,
      addTrackToPlaylist,
      removeTrackFromPlaylist,
    ],
  );

  return <SonaraContext.Provider value={value}>{children}</SonaraContext.Provider>;
}

export function useSonara() {
  const context = React.useContext(SonaraContext);

  if (!context) {
    throw new Error('useSonara must be used within SonaraProvider');
  }

  return context;
}