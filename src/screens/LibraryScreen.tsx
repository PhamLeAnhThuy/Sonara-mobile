import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabBar } from '../components/BottomTabBar';
import { TopAppBar } from '../components/TopAppBar';
import { useSonara } from '../state/SonaraContext';

interface LibraryScreenProps {
  onTabPress: (tab: 'home' | 'search' | 'library' | 'profile') => void;
  onOpenPlaylistView: (playlistId: string) => void;
}

const chips = ['Playlists', 'Artists', 'Albums', 'Downloads'];

export function LibraryScreen({ onOpenPlaylistView, onTabPress }: LibraryScreenProps) {
  const { createPlaylist, currentArtist, currentTrack, isPlaying, playlists, playNext, playPrevious, selectPlaylist, togglePlayback, tracks } = useSonara();
  const [newPlaylistName, setNewPlaylistName] = React.useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = React.useState('');
  const verticalLines = Array.from({ length: 12 });
  const horizontalLines = Array.from({ length: 28 });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View pointerEvents="none" style={styles.gridLayer}>
        {verticalLines.map((_, index) => (
          <View key={`v-${index}`} style={[styles.verticalLine, { left: index * 40 }]} />
        ))}
        {horizontalLines.map((_, index) => (
          <View key={`h-${index}`} style={[styles.horizontalLine, { top: index * 40 }]} />
        ))}
      </View>

      <TopAppBar />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsContent}
        >
          {chips.map((chip, index) => {
            const active = index === 0;
            return (
              <TouchableOpacity key={chip} activeOpacity={0.9} style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}>
                <Text style={[styles.chipText, active ? styles.chipTextActive : styles.chipTextInactive]}>{chip}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Your Library</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconBtn}>
              <MaterialIcons color="#2F2E30" name="add" size={22} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconBtn}>
              <MaterialIcons color="#2F2E30" name="search" size={22} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.createCard}>
          <Text style={styles.createTitle}>Create Playlist</Text>
          <TextInput
            onChangeText={setNewPlaylistName}
            placeholder="Playlist name"
            placeholderTextColor="rgba(120, 118, 120, 0.45)"
            style={styles.createInput}
            value={newPlaylistName}
          />
          <TextInput
            onChangeText={setNewPlaylistDescription}
            placeholder="Short description"
            placeholderTextColor="rgba(120, 118, 120, 0.45)"
            style={[styles.createInput, styles.createTextarea]}
            value={newPlaylistDescription}
            multiline
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              if (!newPlaylistName.trim()) {
                return;
              }

              const playlist = createPlaylist(newPlaylistName.trim(), newPlaylistDescription.trim());
              setNewPlaylistName('');
              setNewPlaylistDescription('');
              selectPlaylist(playlist.id);
              onOpenPlaylistView(playlist.id);
            }}
            style={styles.createButton}
          >
            <MaterialIcons color="#6D5658" name="playlist-add" size={18} />
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listWrap}>
          {playlists.map(item => (
            <TouchableOpacity
              activeOpacity={0.85}
              key={item.id}
              onPress={() => {
                selectPlaylist(item.id);
                onOpenPlaylistView(item.id);
              }}
              style={styles.rowItem}
            >
              <View style={styles.thumbWrap}>
                <View style={styles.cornerTopLeft} />
                <View style={styles.cornerBottomRight} />

                <Text style={styles.thumbText}>{item.name.slice(0, 2).toUpperCase()}</Text>
              </View>

              <View style={styles.rowInfo}>
                <Text numberOfLines={1} style={styles.rowTitle}>
                  {item.name}
                </Text>

                <View style={styles.metaRow}>
                  <Text numberOfLines={1} style={styles.rowMeta}>
                    {item.description} • {item.trackIds.length} tracks
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.playerContainer}>
        <View style={styles.playerShell}>
          <Image
            source={{
              uri: currentTrack.artworkUri,
            }}
            style={styles.playerImage}
          />

          <View style={styles.playerInfo}>
            <Text numberOfLines={1} style={styles.playerTitle}>
              {currentTrack.title}
            </Text>
            <Text numberOfLines={1} style={styles.playerSubtitle}>
              {currentArtist.name}
            </Text>
          </View>

          <View style={styles.playerControls}>
            <TouchableOpacity activeOpacity={0.8} onPress={playPrevious} style={styles.playerIconBtn}>
              <MaterialIcons color="#6D5658" name="skip-previous" size={21} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={togglePlayback} style={styles.playerPlayBtn}>
              <MaterialIcons color="#6D5658" name={isPlaying ? 'pause' : 'play-arrow'} size={21} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={playNext} style={styles.playerIconBtn}>
              <MaterialIcons color="#6D5658" name="skip-next" size={21} />
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
  gridLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  verticalLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(109, 86, 88, 0.03)',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(109, 86, 88, 0.03)',
  },
  scrollView: {
    zIndex: 2,
  },
  scrollContent: {
    paddingTop: 88,
    paddingBottom: 210,
  },
  chipsScroll: {
    marginBottom: 24,
  },
  chipsContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: '#F8D8DB',
    borderColor: 'rgba(109, 86, 88, 0.10)',
    shadowColor: '#E5BCBE',
    shadowOpacity: 0.85,
    shadowRadius: 12,
    shadowOffset: { width: 6, height: 6 },
    elevation: 5,
  },
  chipInactive: {
    backgroundColor: '#F9F5F7',
    borderColor: 'transparent',
    shadowColor: '#E5BCBE',
    shadowOpacity: 0.7,
    shadowRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    elevation: 3,
  },
  chipText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 10,
    lineHeight: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#6D5658',
  },
  chipTextInactive: {
    color: '#787678',
  },
  titleRow: {
    paddingHorizontal: 24,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
    color: '#2F2E30',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 4,
  },
  listWrap: {
    paddingHorizontal: 24,
    gap: 8,
  },
  createCard: {
    marginHorizontal: 24,
    marginBottom: 20,
    padding: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.42)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    gap: 12,
  },
  createTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: '#2F2E30',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  createInput: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#F9F5F7',
    fontFamily: 'Inter-Variable',
    color: '#2F2E30',
    shadowColor: '#E5BCBE',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 3, height: 3 },
    elevation: 2,
  },
  createTextarea: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: '#F8D8DB',
  },
  createButtonText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#6D5658',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
    borderRadius: 12,
  },
  thumbWrap: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.10)',
    position: 'relative',
  },
  thumbCircle: {
    borderRadius: 999,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 12,
    height: 12,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderTopColor: '#6D5658',
    borderLeftColor: '#6D5658',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderBottomWidth: 1.5,
    borderRightWidth: 1.5,
    borderBottomColor: '#6D5658',
    borderRightColor: '#6D5658',
  },
  thumbText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    color: '#6D5658',
  },
  rowInfo: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 20,
    color: '#2F2E30',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  rowMeta: {
    fontFamily: 'Inter-Variable',
    fontSize: 12,
    lineHeight: 16,
    color: '#5C5B5D',
    flex: 1,
  },
  playerContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 112,
    zIndex: 40,
  },
  playerShell: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.40)',
    backgroundColor: 'rgba(249, 245, 247, 0.88)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    shadowColor: '#E5BCBE',
    shadowOpacity: 0.9,
    shadowRadius: 16,
    shadowOffset: { width: 8, height: 8 },
    elevation: 8,
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  playerInfo: {
    flex: 1,
    minWidth: 0,
  },
  playerTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    color: '#2F2E30',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  playerSubtitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 9,
    lineHeight: 12,
    color: '#787678',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: 1,
  },
  playerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  playerIconBtn: {
    padding: 4,
  },
  playerPlayBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F8D8DB',
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
