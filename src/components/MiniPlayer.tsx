import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSonara } from '../state/SonaraContext';

export function MiniPlayer() {
  const { currentArtist, currentTrack, currentTrackDurationSeconds, isPlaying, playNext, playPrevious, togglePlayback, trackProgress } = useSonara();

  const progressPercent = currentTrackDurationSeconds > 0 ? Math.min(trackProgress / currentTrackDurationSeconds, 1) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.shell}>
        <View style={styles.inner}>
          <View style={styles.albumWrap}>
            <MaterialIcons color="#6D5658" name="music-note" size={22} />
          </View>

          <View style={styles.infoWrap}>
            <Text numberOfLines={1} style={styles.title}>
              {currentTrack.title}
            </Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.max(progressPercent, 6)}%` }]} />
            </View>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity activeOpacity={0.8} onPress={playPrevious} style={styles.iconControl}>
              <MaterialIcons color="#6D5658" name="skip-previous" size={20} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={togglePlayback} style={styles.playButton}>
              <MaterialIcons color="#6D5658" name={isPlaying ? 'pause' : 'play-arrow'} size={24} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={playNext} style={styles.iconControl}>
              <MaterialIcons color="#6D5658" name="skip-next" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <Text numberOfLines={1} style={styles.subtitle}>
          {currentArtist.name}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 112,
    zIndex: 40,
  },
  shell: {
    borderRadius: 16,
    backgroundColor: 'rgba(249, 245, 247, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.15)',
    shadowColor: '#A88589',
    shadowOpacity: 0.24,
    shadowRadius: 16,
    shadowOffset: { width: 7, height: 9 },
    elevation: 9,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.72)',
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    padding: 12,
  },
  albumWrap: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.15)',
    backgroundColor: '#F8D8DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoWrap: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  title: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#6D5658',
  },
  subtitle: {
    marginTop: 6,
    marginLeft: 64,
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 9,
    lineHeight: 12,
    color: 'rgba(92, 91, 93, 0.70)',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  progressTrack: {
    marginTop: 8,
    width: '100%',
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(109, 86, 88, 0.10)',
  },
  progressFill: {
    width: '33%',
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#6D5658',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconControl: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8D8DB',
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.10)',
  },
});
