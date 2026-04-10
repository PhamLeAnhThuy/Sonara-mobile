import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabBar } from '../components/BottomTabBar';
import { NeumorphicView } from '../components/NeumorphicView';
import { TopAppBar } from '../components/TopAppBar';
import { useSonara } from '../state/SonaraContext';

interface NowPlayingScreenProps {
  onTabPress: (tab: 'home' | 'search' | 'library' | 'profile') => void;
}

export function NowPlayingScreen({ onTabPress }: NowPlayingScreenProps) {
  const { currentArtist, currentTrack, currentTrackDurationSeconds, isPlaying, playNext, playPrevious, togglePlayback, trackProgress } = useSonara();
  const verticalLines = Array.from({ length: 12 });
  const horizontalLines = Array.from({ length: 28 });
  const activeLyricIndex = React.useMemo(() => {
    if (!currentTrack.lyrics.length || currentTrackDurationSeconds <= 0) {
      return 0;
    }

    const ratio = trackProgress / currentTrackDurationSeconds;
    return Math.min(currentTrack.lyrics.length - 1, Math.floor(ratio * currentTrack.lyrics.length));
  }, [currentTrack.lyrics, currentTrackDurationSeconds, trackProgress]);

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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.centerSection}>
          <NeumorphicView borderRadius={48} style={styles.artShell} variant="outset">
            <Text style={styles.refId}>REF-001/AUD</Text>

            <View style={styles.artLayerA} />
            <View style={styles.artLayerB} />
            <View style={styles.artLayerC} />
            <View style={styles.crossHorizontal} />
            <View style={styles.crossVertical} />
            <View style={styles.diamond} />

            <View style={styles.waveWrap}>
              <View style={styles.waveLineShort} />
              <View style={styles.waveLineLong} />
              <View style={styles.waveLineShort} />
            </View>
          </NeumorphicView>

          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{currentTrack.title}</Text>
            <Text style={styles.trackArtist}>{currentArtist.name}</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.max((trackProgress / Math.max(currentTrackDurationSeconds, 1)) * 100, 4)}%` }]} />
            <View style={styles.progressKnobOuter}>
              <View style={styles.progressKnobInner} />
            </View>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(trackProgress)}</Text>
            <Text style={styles.timeText}>{formatTime(currentTrackDurationSeconds)}</Text>
          </View>
        </View>

        <View style={styles.controlsRow}>
          <TouchableOpacity activeOpacity={0.85} onPress={playPrevious} style={styles.sideControl}>
            <MaterialIcons color="#604A4D" name="skip-previous" size={30} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} onPress={togglePlayback} style={styles.mainControl}>
            <MaterialIcons color="#6D5658" name={isPlaying ? 'pause' : 'play-arrow'} size={38} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.85} onPress={playNext} style={styles.sideControl}>
            <MaterialIcons color="#604A4D" name="skip-next" size={30} />
          </TouchableOpacity>
        </View>

        <NeumorphicView borderRadius={26} style={styles.lyricsCard} variant="outset">
          <Text style={styles.lyricBlur}>{currentTrack.lyrics[Math.max(activeLyricIndex - 1, 0)]?.text ?? currentTrack.lyrics[0]?.text}</Text>
          <View style={styles.lyricFocusWrap}>
            <Text style={styles.lyricFocus}>{currentTrack.lyrics[activeLyricIndex]?.text ?? currentTrack.lyrics[0]?.text}</Text>
          </View>
          <Text style={styles.lyricBlur}>{currentTrack.lyrics[Math.min(activeLyricIndex + 1, currentTrack.lyrics.length - 1)]?.text ?? currentTrack.lyrics[currentTrack.lyrics.length - 1]?.text}</Text>
        </NeumorphicView>

        <View style={styles.artistSection}>
          <NeumorphicView borderRadius={16} style={styles.artistAvatarShell} variant="inset">
            <View style={styles.artistAvatarInner}>
              <Image
                source={{
                  uri: currentArtist.imageUri,
                }}
                style={styles.artistAvatarImg}
              />
            </View>
          </NeumorphicView>

          <View style={styles.artistInfo}>
            <View style={styles.artistHeaderRow}>
              <Text style={styles.artistLabel}>ABOUT ARTIST</Text>
              <TouchableOpacity activeOpacity={0.8}>
                <Text style={styles.followText}>FOLLOW</Text>
              </TouchableOpacity>
            </View>
            <Text numberOfLines={2} style={styles.artistBio}>
              {currentArtist.bio}
            </Text>
          </View>
        </View>
      </ScrollView>

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
    backgroundColor: 'rgba(109, 86, 88, 0.05)',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(109, 86, 88, 0.05)',
  },
  scrollContent: {
    paddingTop: 96,
    paddingBottom: 150,
    paddingHorizontal: 24,
  },
  centerSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  artShell: {
    width: '100%',
    maxWidth: 320,
    aspectRatio: 1,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F5F7',
    marginBottom: 24,
  },
  refId: {
    position: 'absolute',
    top: 24,
    right: 26,
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 10,
    letterSpacing: 1.2,
    color: '#AFAEAC',
  },
  artLayerA: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.18)',
    borderStyle: 'dashed',
  },
  artLayerB: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.30)',
  },
  artLayerC: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(109, 86, 88, 0.45)',
  },
  crossHorizontal: {
    position: 'absolute',
    width: 240,
    borderTopWidth: 1,
    borderTopColor: 'rgba(109, 86, 88, 0.12)',
  },
  crossVertical: {
    position: 'absolute',
    height: 240,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(109, 86, 88, 0.12)',
  },
  diamond: {
    position: 'absolute',
    width: 84,
    height: 84,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.22)',
    transform: [{ rotate: '45deg' }],
  },
  waveWrap: {
    position: 'absolute',
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waveLineShort: {
    width: 24,
    borderTopWidth: 2,
    borderTopColor: 'rgba(109, 86, 88, 0.45)',
    borderRadius: 99,
  },
  waveLineLong: {
    width: 44,
    borderTopWidth: 2,
    borderTopColor: 'rgba(109, 86, 88, 0.55)',
    borderRadius: 99,
  },
  trackInfo: {
    alignItems: 'center',
  },
  trackTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#2F2E30',
  },
  trackArtist: {
    marginTop: 4,
    fontFamily: 'Inter-Variable',
    fontSize: 20,
    lineHeight: 24,
    color: 'rgba(96, 74, 77, 0.70)',
    fontStyle: 'italic',
  },
  progressSection: {
    marginBottom: 26,
  },
  progressTrack: {
    height: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(175, 172, 174, 0.22)',
    justifyContent: 'center',
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    width: '40%',
    height: 4,
    borderRadius: 999,
    backgroundColor: '#6D5658',
  },
  progressKnobOuter: {
    position: 'absolute',
    left: '40%',
    marginLeft: -12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F9F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E5BCBE',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    elevation: 4,
  },
  progressKnobInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6D5658',
  },
  timeRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 10,
    lineHeight: 12,
    color: '#787678',
    letterSpacing: 0.6,
  },
  controlsRow: {
    marginBottom: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  sideControl: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F5F7',
    shadowColor: '#E5BCBE',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    elevation: 5,
  },
  mainControl: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8D8DB',
    shadowColor: '#E5BCBE',
    shadowOpacity: 0.9,
    shadowRadius: 14,
    shadowOffset: { width: 6, height: 6 },
    elevation: 7,
  },
  lyricsCard: {
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingVertical: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(249, 245, 247, 0.70)',
  },
  lyricBlur: {
    textAlign: 'center',
    fontFamily: 'Inter-Variable',
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(120, 118, 120, 0.45)',
  },
  lyricFocusWrap: {
    marginVertical: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(248, 216, 219, 0.30)',
  },
  lyricFocus: {
    textAlign: 'center',
    fontFamily: 'Inter-Variable',
    fontSize: 14,
    lineHeight: 18,
    color: '#6D5658',
    fontWeight: '600',
  },
  artistSection: {
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(109, 86, 88, 0.05)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  artistAvatarShell: {
    width: 64,
    height: 64,
    borderRadius: 16,
    padding: 4,
    backgroundColor: '#F9F5F7',
  },
  artistAvatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#DFDCDF',
  },
  artistAvatarImg: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  artistInfo: {
    flex: 1,
  },
  artistHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  artistLabel: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: '#6D5658',
  },
  followText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 10,
    lineHeight: 12,
    textTransform: 'uppercase',
    color: '#AFAEAC',
    letterSpacing: 1,
  },
  artistBio: {
    fontFamily: 'Inter-Variable',
    fontSize: 12,
    lineHeight: 17,
    color: '#5C5B5D',
  },
});

function formatTime(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, '0');
  const remainder = (safeSeconds % 60).toString().padStart(2, '0');

  return `${minutes}:${remainder}`;
}
