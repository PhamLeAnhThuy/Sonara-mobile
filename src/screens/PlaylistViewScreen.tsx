import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabBar } from '../components/BottomTabBar';
import { useSonara } from '../state/SonaraContext';

interface PlaylistViewScreenProps {
  onTabPress: (tab: 'home' | 'search' | 'library' | 'profile') => void;
  onOpenNowPlaying: () => void;
}

type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  highlighted?: boolean;
};

const tracks: Track[] = [
  { id: '1', title: 'Vellum Structures', artist: 'Drafting Suite', duration: '4:22' },
  { id: '2', title: 'Brutalist Echoes', artist: 'Concrete Dreams', duration: '3:58', highlighted: true },
  { id: '3', title: 'Golden Ratio', artist: 'The Modulars', duration: '5:10' },
  { id: '4', title: 'Isometric Flow', artist: 'Axonometric', duration: '2:45' },
  { id: '5', title: 'Elevation B', artist: 'Linear Path', duration: '4:01' },
];

export function PlaylistViewScreen({ onOpenNowPlaying, onTabPress }: PlaylistViewScreenProps) {
  const { addTrackToPlaylist, currentArtist, currentTrack, currentUser, isPlaying, playNext, playPrevious, playTrack, removeTrackFromPlaylist, renamePlaylist, selectedPlaylist, togglePlayback, tracks } = useSonara();
  const [playlistName, setPlaylistName] = React.useState(selectedPlaylist.name);
  const [playlistDescription, setPlaylistDescription] = React.useState(selectedPlaylist.description);

  React.useEffect(() => {
    setPlaylistName(selectedPlaylist.name);
    setPlaylistDescription(selectedPlaylist.description);
  }, [selectedPlaylist.description, selectedPlaylist.name]);

  const playlistTracks = selectedPlaylist.trackIds
    .map(trackId => tracks.find(track => track.id === trackId))
    .filter((track): track is (typeof tracks)[number] => Boolean(track));
  const availableTracks = tracks.filter(track => !selectedPlaylist.trackIds.includes(track.id));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <View style={styles.brandWrap}>
          <MaterialIcons color="#6D5658" name="architecture" size={22} />
          <Text style={styles.brandText}>TECHNICAL ROMANTICS</Text>
        </View>

        <View style={styles.avatarWrap}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk1O8NuzWKx6dQK9umPUHGjE4DO9WpTrjQvfwChtLpQHq2kijhbNQV4gMdcPGM8GzV7hSAg-v8ViYMVq76vcIvcIBa-FcvzEGTDqOZWXJ9yzTLH6RQBUqMG_zw6iVjIR-nE5mM3qkQY7tFbWWIYi1jruzQnw01VArhHgX8k-6g5Dy24XVfw3xQWBYva-TjC125bXwHbdkw11q95tXaOeUcdCOMKBgsRRH94hMKx_8kZ71pynLzkfaJALmQtx_S_xLq7W0NRwWp',
            }}
            style={styles.avatarImg}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <View style={styles.coverWrap}>
            <Text style={styles.coverRef}>REF-PLY-082</Text>
            <View style={styles.coverInner}>
              <Image
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjSFGlPYofrI5QyKNQVVRDiOT3tTwi7mkQqPvRV6hOiOit-yfXN-JeuPlCckjC69UpbCOn5yTVsSWtBL6ao_qhX4g6VwLSydfFkcI3BN0nUNkeylZ3Ux3unBo9n3Orgl3XSS34xywi8yBHs4bfH96lrAPLXd-NsE1v8OkcMySJyXFuUbmmRpDg7f3irYvckQ8DNKUWNEx0fGNTkPzZxdjNVY3iF4zLgDcD7-uj12Z_1fRd0--SdsvXdr_gz5kDzoe7Dm-kr3I-',
                }}
                style={styles.coverImage}
              />
              <View style={styles.coverOverlay} />
            </View>
          </View>

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerType}>Playlist</Text>
            <TextInput
              onChangeText={setPlaylistName}
              onBlur={() => renamePlaylist(selectedPlaylist.id, playlistName, playlistDescription)}
              style={styles.headerTitleInput}
              value={playlistName}
            />
            <TextInput
              onChangeText={setPlaylistDescription}
              onBlur={() => renamePlaylist(selectedPlaylist.id, playlistName, playlistDescription)}
              multiline
              style={styles.headerDescInput}
              value={playlistDescription}
            />

            <View style={styles.metaRow}>
              <View style={styles.curatorWrap}>
                <View style={styles.curatorAvatar}>
                  <Image source={{ uri: currentUser?.avatarUri }} style={styles.curatorAvatarImg} />
                </View>
                <Text style={styles.curatorName}>{currentUser?.name ?? 'CURATOR_01'}</Text>
              </View>

              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaInfo}>{selectedPlaylist.trackIds.length} Tracks</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaInfo}>{playlistTracks.length} Tracks loaded</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsSection}>
          <TouchableOpacity activeOpacity={0.85} onPress={onOpenNowPlaying} style={styles.playFab}>
            <MaterialIcons color="#6D5658" name="play-arrow" size={36} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.actionBtn}>
            <MaterialIcons color="#6D5658" name="favorite" size={20} />
            <Text style={styles.actionText}>LIKE</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.actionBtn}>
            <MaterialIcons color="#6D5658" name="download-for-offline" size={20} />
            <Text style={styles.actionText}>DOWNLOAD</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} style={styles.iconOnlyBtn}>
            <MaterialIcons color="#6D5658" name="more-horiz" size={20} />
          </TouchableOpacity>

          <View style={styles.searchPillWrap}>
            <MaterialIcons color="rgba(109, 86, 88, 0.5)" name="search" size={16} />
            <TextInput placeholder="Search in playlist" placeholderTextColor="rgba(109,86,88,0.35)" style={styles.searchInput} />
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>#</Text>
          <Text style={styles.tableHeaderText}>TITLE</Text>
          <Text style={[styles.tableHeaderText, styles.artistHeader]}>ARTIST</Text>
          <Text style={[styles.tableHeaderText, styles.durationHeader]}>DURATION</Text>
          <View style={styles.moreCol} />
        </View>

        <View style={styles.trackList}>
          {playlistTracks.map((track, index) => (
            <TouchableOpacity
              activeOpacity={0.85}
              key={track.id}
              onPress={() => {
                playTrack(track.id, selectedPlaylist.trackIds, selectedPlaylist.id);
                onOpenNowPlaying();
              }}
              style={[styles.trackRow, track.highlighted ? styles.trackRowActive : null]}
            >
              <Text style={styles.trackIndex}>{index + 1}</Text>

              <View style={styles.trackTitleWrap}>
                <Text numberOfLines={1} style={styles.trackTitle}>
                  {track.title}
                </Text>
                <Text numberOfLines={1} style={styles.trackArtistMobile}>
                  {track.artist}
                </Text>
              </View>

              <Text numberOfLines={1} style={styles.trackArtistDesktop}>
                {track.artist}
              </Text>

              <Text style={styles.trackDuration}>{track.duration}</Text>

              <TouchableOpacity activeOpacity={0.85} style={styles.trackMoreBtn}>
                <MaterialIcons color="rgba(109, 86, 88, 0.35)" name="more-horiz" size={18} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.editSection}>
          <Text style={styles.editSectionTitle}>Add More Tracks</Text>
          {availableTracks.map(track => (
            <TouchableOpacity
              activeOpacity={0.85}
              key={track.id}
              onPress={() => addTrackToPlaylist(selectedPlaylist.id, track.id)}
              style={styles.availableTrackRow}
            >
              <View style={styles.availableInfo}>
                <Text style={styles.availableTitle}>{track.title}</Text>
                <Text style={styles.availableMeta}>{track.album}</Text>
              </View>
              <MaterialIcons color="#6D5658" name="add-circle-outline" size={20} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.miniPlayerWrap}>
        <View style={styles.miniPlayerCard}>
          <Image
            source={{
              uri: currentTrack.artworkUri,
            }}
            style={styles.miniPlayerImage}
          />

          <View style={styles.miniPlayerInfo}>
            <Text numberOfLines={1} style={styles.miniPlayerTitle}>
              {currentTrack.title}
            </Text>
            <Text numberOfLines={1} style={styles.miniPlayerSubtitle}>
              {currentArtist.name}
            </Text>
          </View>

          <View style={styles.miniPlayerControls}>
            <TouchableOpacity activeOpacity={0.8} onPress={playPrevious}>
              <MaterialIcons color="#6D5658" name="skip-previous" size={22} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => { togglePlayback(); onOpenNowPlaying(); }} style={styles.miniPlayerPlayBtn}>
              <MaterialIcons color="#6D5658" name={isPlaying ? 'pause' : 'play-arrow'} size={20} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={playNext}>
              <MaterialIcons color="#6D5658" name="skip-next" size={22} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <BottomTabBar activeTab="library" onTabPress={onTabPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F5F7',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#F9F5F7',
    shadowColor: 'rgba(109, 86, 88, 0.10)',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    elevation: 6,
  },
  brandWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#6D5658',
  },
  avatarWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#F8D8DB',
    backgroundColor: '#F9F5F7',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingTop: 92,
    paddingBottom: 210,
    paddingHorizontal: 24,
  },
  headerSection: {
    marginBottom: 40,
  },
  coverWrap: {
    width: 260,
    aspectRatio: 1,
    padding: 18,
    backgroundColor: '#F9F5F7',
    shadowColor: 'rgba(109, 86, 88, 0.10)',
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 6, height: 6 },
    elevation: 5,
    marginBottom: 22,
    position: 'relative',
  },
  coverRef: {
    position: 'absolute',
    top: 6,
    right: 6,
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 10,
    color: 'rgba(109, 86, 88, 0.40)',
  },
  coverInner: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'rgba(175, 172, 174, 0.2)',
    overflow: 'hidden',
    backgroundColor: 'rgba(248, 216, 219, 0.30)',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(109, 86, 88, 0.02)',
  },
  headerTextWrap: {
    gap: 8,
  },
  headerType: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 12,
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 2.4,
    color: 'rgba(109, 86, 88, 0.60)',
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 52,
    lineHeight: 58,
    fontWeight: '700',
    letterSpacing: -1,
    color: '#2F2E30',
  },
  headerTitleInput: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '700',
    letterSpacing: -1,
    color: '#2F2E30',
    padding: 0,
    marginVertical: 2,
  },
  headerDesc: {
    fontFamily: 'Inter-Variable',
    fontSize: 14,
    lineHeight: 20,
    color: '#5C5B5D',
    maxWidth: 560,
  },
  headerDescInput: {
    fontFamily: 'Inter-Variable',
    fontSize: 14,
    lineHeight: 20,
    color: '#5C5B5D',
    minHeight: 54,
    padding: 0,
    maxWidth: 560,
  },
  metaRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  curatorWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  curatorAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(175, 172, 174, 0.20)',
    overflow: 'hidden',
    backgroundColor: '#F8D8DB',
  },
  curatorAvatarImg: {
    width: '100%',
    height: '100%',
  },
  curatorName: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#2F2E30',
  },
  metaDot: {
    color: '#AFAEAC',
    fontSize: 10,
  },
  metaInfo: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 12,
    lineHeight: 14,
    color: 'rgba(109, 86, 88, 0.70)',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  actionsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 18,
    marginBottom: 26,
  },
  playFab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8D8DB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(109, 86, 88, 0.15)',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    elevation: 6,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 12,
    lineHeight: 14,
    color: 'rgba(109, 86, 88, 0.80)',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
  },
  iconOnlyBtn: {
    padding: 2,
  },
  searchPillWrap: {
    marginLeft: 'auto',
    minWidth: 180,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F9F5F7',
    shadowColor: 'rgba(109, 86, 88, 0.08)',
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 4, height: 4 },
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 11,
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#6D5658',
    paddingVertical: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(175, 172, 174, 0.16)',
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  tableHeaderText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 10,
    lineHeight: 12,
    color: 'rgba(109, 86, 88, 0.40)',
    letterSpacing: 2,
  },
  artistHeader: {
    flex: 1,
    marginLeft: 20,
  },
  durationHeader: {
    width: 70,
    textAlign: 'right',
  },
  moreCol: {
    width: 24,
  },
  trackList: {
    marginTop: 4,
    gap: 2,
  },
  trackRow: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  trackRowActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    borderWidth: 1,
    borderColor: 'rgba(248, 216, 219, 0.55)',
  },
  trackIndex: {
    width: 30,
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 12,
    lineHeight: 14,
    color: 'rgba(109, 86, 88, 0.40)',
  },
  trackTitleWrap: {
    flex: 1,
    minWidth: 0,
  },
  trackTitle: {
    fontFamily: 'Inter-Variable',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '500',
    color: '#2F2E30',
  },
  trackArtistMobile: {
    marginTop: 1,
    fontFamily: 'Inter-Variable',
    fontSize: 12,
    lineHeight: 15,
    color: '#5C5B5D',
  },
  trackArtistDesktop: {
    flex: 1,
    fontFamily: 'Inter-Variable',
    fontSize: 14,
    lineHeight: 18,
    color: '#5C5B5D',
    marginLeft: 16,
  },
  trackDuration: {
    width: 70,
    textAlign: 'right',
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 12,
    lineHeight: 14,
    color: 'rgba(109, 86, 88, 0.50)',
  },
  trackMoreBtn: {
    width: 24,
    alignItems: 'flex-end',
  },
  editSection: {
    marginTop: 28,
    gap: 10,
  },
  editSectionTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#2F2E30',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  availableTrackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.42)',
  },
  availableInfo: {
    flex: 1,
    minWidth: 0,
  },
  availableTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#2F2E30',
  },
  availableMeta: {
    marginTop: 2,
    fontFamily: 'Inter-Variable',
    fontSize: 12,
    lineHeight: 16,
    color: '#5C5B5D',
  },
  miniPlayerWrap: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 106,
    zIndex: 60,
  },
  miniPlayerCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(248, 216, 219, 0.20)',
    backgroundColor: 'rgba(249, 245, 247, 0.90)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 10,
    shadowColor: 'rgba(109, 86, 88, 0.10)',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 6, height: 6 },
    elevation: 6,
  },
  miniPlayerImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(175, 172, 174, 0.20)',
  },
  miniPlayerInfo: {
    flex: 1,
    minWidth: 0,
  },
  miniPlayerTitle: {
    fontFamily: 'Inter-Variable',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '700',
    color: '#2F2E30',
  },
  miniPlayerSubtitle: {
    marginTop: 1,
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 10,
    lineHeight: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'rgba(109, 86, 88, 0.60)',
  },
  miniPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  miniPlayerPlayBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8D8DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
