import React from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabBar } from '../components/BottomTabBar';
import { DepthShiftPressable } from '../components/DepthShiftPressable';
import { TopAppBar } from '../components/TopAppBar';
import { useSonara } from '../state/SonaraContext';
import { triggerMajorHaptic } from '../theme/motion';

interface LibraryScreenProps {
  onTabPress: (tab: 'home' | 'search' | 'library' | 'profile') => void;
  onOpenPlaylistView: (playlistId: string) => void;
}

export function LibraryScreen({ onOpenPlaylistView, onTabPress }: LibraryScreenProps) {
  const { createPlaylist, currentArtist, currentTrack, isPlaying, playlists, playNext, playPrevious, selectPlaylist, togglePlayback } = useSonara();
  const [newPlaylistName, setNewPlaylistName] = React.useState('');
  const [newPlaylistDescription, setNewPlaylistDescription] = React.useState('');
  const [createModalVisible, setCreateModalVisible] = React.useState(false);
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
        <View style={styles.titleRow}>
          <Text style={styles.sectionTitle}>Your Library</Text>
          <View style={styles.actionsRow}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setCreateModalVisible(true)} style={styles.iconBtn}>
              <MaterialIcons color="#2F2E30" name="add" size={22} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconBtn}>
              <MaterialIcons color="#2F2E30" name="search" size={22} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.listWrap}>
          {playlists.map(item => (
            <DepthShiftPressable
              borderRadius={12}
              key={item.id}
              onPress={() => {
                triggerMajorHaptic();
                selectPlaylist(item.id);
                onOpenPlaylistView(item.id);
              }}
              style={styles.rowItem}
            >
              <View style={styles.coverWrap}>
                <View style={styles.coverAccent} />
                <Text style={styles.coverText}>{item.name.slice(0, 2).toUpperCase()}</Text>
              </View>

              <View style={styles.rowInfo}>
                <Text numberOfLines={1} style={styles.rowTitle}>
                  {item.name}
                </Text>
                <Text numberOfLines={2} style={styles.rowDescription}>
                  {item.description || 'No description added.'}
                </Text>
              </View>

              <MaterialIcons color="rgba(92, 91, 93, 0.40)" name="chevron-right" size={20} />
            </DepthShiftPressable>
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                triggerMajorHaptic();
                playPrevious();
              }}
              style={styles.playerIconBtn}
            >
              <MaterialIcons color="#6D5658" name="skip-previous" size={21} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                triggerMajorHaptic();
                togglePlayback();
              }}
              style={styles.playerPlayBtn}
            >
              <MaterialIcons color="#6D5658" name={isPlaying ? 'pause' : 'play-arrow'} size={21} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                triggerMajorHaptic();
                playNext();
              }}
              style={styles.playerIconBtn}
            >
              <MaterialIcons color="#6D5658" name="skip-next" size={21} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal animationType="fade" transparent visible={createModalVisible} onRequestClose={() => setCreateModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <DepthShiftPressable borderRadius={24} style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create Playlist</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setCreateModalVisible(false)} style={styles.modalCloseBtn}>
                <MaterialIcons color="#6D5658" name="close" size={20} />
              </TouchableOpacity>
            </View>

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

            <DepthShiftPressable
              borderRadius={14}
              onPress={() => {
                if (!newPlaylistName.trim()) {
                  return;
                }

                triggerMajorHaptic();
                const playlist = createPlaylist(newPlaylistName.trim(), newPlaylistDescription.trim());
                setNewPlaylistName('');
                setNewPlaylistDescription('');
                setCreateModalVisible(false);
                selectPlaylist(playlist.id);
                onOpenPlaylistView(playlist.id);
              }}
              style={styles.createButton}
            >
              <MaterialIcons color="#6D5658" name="playlist-add" size={18} />
              <Text style={styles.createButtonText}>Create</Text>
            </DepthShiftPressable>
          </DepthShiftPressable>
        </View>
      </Modal>

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
    paddingTop: 56,
    paddingBottom: 168,
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
    color: '#6D5658',
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
    gap: 12,
  },
  createInput: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#F9F5F7',
    fontFamily: 'SpaceGrotesk-Variable',
    color: '#6D5658',
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
    gap: 14,
    padding: 14,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.40)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.60)',
  },
  coverWrap: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.10)',
    position: 'relative',
  },
  coverAccent: {
    position: 'absolute',
    inset: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(248, 216, 219, 0.36)',
  },
  coverText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 18,
    lineHeight: 22,
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
    fontSize: 16,
    lineHeight: 20,
    color: '#6D5658',
  },
  rowDescription: {
    marginTop: 4,
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(109, 86, 88, 0.60)',
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
    color: '#6D5658',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  playerSubtitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 9,
    lineHeight: 12,
    color: 'rgba(109, 86, 88, 0.60)',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(47, 46, 48, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 460,
    padding: 18,
    borderRadius: 24,
    backgroundColor: '#F9F5F7',
    gap: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 22,
    color: '#6D5658',
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F0F2',
  },
});
