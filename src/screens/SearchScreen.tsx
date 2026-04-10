import React from 'react';
import { Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabBar } from '../components/BottomTabBar';
import { MiniPlayer } from '../components/MiniPlayer';
import { NeumorphicView } from '../components/NeumorphicView';
import { TopAppBar } from '../components/TopAppBar';
import { SOFT_REVEAL, SONARA_SPRING, triggerMajorHaptic } from '../theme/motion';
import { useSonara } from '../state/SonaraContext';

interface SearchScreenProps {
  onTabPress: (tab: 'home' | 'search' | 'library' | 'profile') => void;
}

const genres = [
  { id: '1', title: 'Pop', icon: 'auto-awesome' },
  { id: '2', title: 'Hip-Hop', icon: 'grid-view' },
  { id: '3', title: 'Rock', icon: 'signal-cellular-alt' },
  { id: '4', title: 'R&B', icon: 'waves' },
  { id: '5', title: 'Electronic', icon: 'blur-on' },
  { id: '6', title: 'Indie', icon: 'change-history' },
  { id: '7', title: 'Jazz', icon: 'reorder' },
  { id: '8', title: 'Ambient', icon: 'circle' },
];

export function SearchScreen({ onTabPress }: SearchScreenProps) {
  const { artists, playTrack, tracks } = useSonara();
  const [query, setQuery] = React.useState('');
  const [rippleMeta, setRippleMeta] = React.useState({ x: 0, y: 0, index: -1 });
  const verticalLines = Array.from({ length: 12 });
  const horizontalLines = Array.from({ length: 28 });
  const genreDepth = React.useRef(genres.map(() => new Animated.Value(0))).current;
  const rippleScale = React.useRef(new Animated.Value(0)).current;
  const rippleOpacity = React.useRef(new Animated.Value(0)).current;
  const normalizedQuery = query.trim().toLowerCase();
  const trackResults = normalizedQuery
    ? tracks.filter(track => [track.title, track.album, track.tags.join(' '), track.artistId]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery))
    : tracks.filter(track => track.trending).slice(0, 4);
  const artistResults = normalizedQuery
    ? artists.filter(artist => [artist.name, artist.genre, artist.bio].join(' ').toLowerCase().includes(normalizedQuery))
    : artists.slice(0, 4);

  const animateGenreDepth = React.useCallback((originIndex: number) => {
    Animated.parallel(
      genreDepth.map((value, index) => {
        const distance = Math.abs(index - originIndex);
        const toValue = distance === 0 ? 1 : distance === 1 ? 0.55 : distance === 2 ? 0.2 : 0;

        return Animated.spring(value, {
          toValue,
          ...SONARA_SPRING,
        });
      }),
    ).start();
  }, [genreDepth]);

  const resetGenreDepth = React.useCallback(() => {
    Animated.parallel(
      genreDepth.map(value =>
        Animated.timing(value, {
          toValue: 0,
          ...SOFT_REVEAL,
        }),
      ),
    ).start();
  }, [genreDepth]);

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

      <View pointerEvents="none" style={styles.floatCircleTop} />
      <View pointerEvents="none" style={styles.floatCircleBottom} />

      <TopAppBar />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.headerWrap}>
          <Text style={styles.pageTitle}>Search</Text>

          <View style={styles.searchShell}>
            <NeumorphicView borderRadius={16} style={styles.searchInputWrap} variant="inset">
              <MaterialIcons color="rgba(109, 86, 88, 0.60)" name="search" size={22} style={styles.leftIcon} />
              <TextInput
                onChangeText={setQuery}
                placeholder="Artists, songs, or podcasts"
                placeholderTextColor="rgba(120, 118, 120, 0.40)"
                style={styles.searchInput}
                value={query}
              />
              <View style={styles.rightIconsWrap}>
                <MaterialIcons color="rgba(109, 86, 88, 0.40)" name="close" size={22} />
                <View style={styles.iconDivider} />
                <MaterialIcons color="rgba(109, 86, 88, 0.60)" name="mic" size={22} />
              </View>
            </NeumorphicView>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Browse All</Text>

          <View style={styles.genreGrid}>
            {genres.map((item, index) => (
              <Animated.View
                key={item.id}
                style={[
                  styles.genreCell,
                  {
                    transform: [
                      {
                        scale: genreDepth[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.03],
                        }),
                      },
                    ],
                  },
                ]}
              >
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.genreCellTouch}
                onPressIn={event => {
                  const { locationX, locationY } = event.nativeEvent;

                  setRippleMeta({ x: locationX, y: locationY, index });
                  rippleScale.setValue(0);
                  rippleOpacity.setValue(0.28);
                  triggerMajorHaptic();
                  animateGenreDepth(index);

                  Animated.parallel([
                    Animated.spring(rippleScale, {
                      toValue: 1,
                      ...SONARA_SPRING,
                    }),
                    Animated.timing(rippleOpacity, {
                      toValue: 0,
                      ...SOFT_REVEAL,
                    }),
                  ]).start();
                }}
                onPressOut={resetGenreDepth}
              >
                <NeumorphicView borderRadius={16} style={styles.genreCard} variant="outset">
                  {rippleMeta.index === index ? (
                    <Animated.View
                      pointerEvents="none"
                      style={[
                        styles.genreRipple,
                        {
                          top: rippleMeta.y - 14,
                          left: rippleMeta.x - 14,
                          opacity: rippleOpacity,
                          transform: [
                            {
                              scale: rippleScale.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.2, 8],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  ) : null}
                  <Text style={styles.genreTitle}>{item.title}</Text>
                  <View style={styles.genreIconWrap}>
                    <MaterialIcons color="rgba(109, 86, 88, 0.20)" name={item.icon} size={56} />
                  </View>
                </NeumorphicView>
              </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </View>

        <View style={styles.sectionResults}>
          <Text style={styles.sectionLabel}>Results</Text>

          <View style={styles.resultGroup}>
            <Text style={styles.resultHeading}>Songs</Text>
            {trackResults.map(track => {
              const artist = artists.find(item => item.id === track.artistId);

              return (
                <TouchableOpacity
                  activeOpacity={0.88}
                  key={track.id}
                  onPress={() => playTrack(track.id, trackResults.map(item => item.id))}
                  style={styles.resultRow}
                >
                  <NeumorphicView borderRadius={14} style={styles.resultThumb} variant="inset">
                    <MaterialIcons color="rgba(109, 86, 88, 0.32)" name="music-note" size={20} />
                  </NeumorphicView>

                  <View style={styles.resultInfo}>
                    <Text numberOfLines={1} style={styles.resultTitle}>{track.title}</Text>
                    <Text numberOfLines={1} style={styles.resultMeta}>{artist?.name ?? track.artistId} • {track.album}</Text>
                  </View>

                  <Text style={styles.resultDuration}>{track.duration}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.resultGroup}>
            <Text style={styles.resultHeading}>Artists</Text>
            {artistResults.map(artist => (
              <View key={artist.id} style={styles.artistRow}>
                <NeumorphicView borderRadius={999} style={styles.artistAvatar} variant="outset">
                  <MaterialIcons color="#6D5658" name="person" size={24} />
                </NeumorphicView>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>{artist.name}</Text>
                  <Text numberOfLines={1} style={styles.resultMeta}>{artist.genre}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <MiniPlayer />
      <BottomTabBar activeTab="search" onTabPress={onTabPress} />
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
  floatCircleTop: {
    position: 'absolute',
    top: 128,
    right: -16,
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.05)',
    zIndex: 1,
  },
  floatCircleBottom: {
    position: 'absolute',
    left: -48,
    bottom: 160,
    width: 192,
    height: 192,
    borderRadius: 96,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.05)',
    zIndex: 1,
  },
  scrollView: {
    zIndex: 2,
  },
  scrollContent: {
    paddingTop: 56,
    paddingBottom: 208,
  },
  headerWrap: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  pageTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 40,
    lineHeight: 46,
    letterSpacing: -0.6,
    color: '#6D5658',
    marginBottom: 24,
  },
  searchShell: {
    width: '100%',
  },
  searchInputWrap: {
    minHeight: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 12,
    backgroundColor: '#F9F5F7',
  },
  leftIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Variable',
    fontSize: 15,
    color: '#2F2E30',
    paddingVertical: 10,
  },
  rightIconsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(175, 172, 174, 0.30)',
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionResults: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  sectionLabel: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: '#6D5658',
    marginBottom: 24,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  genreCell: {
    width: '48.3%',
  },
  genreCellTouch: {
    width: '100%',
  },
  genreCard: {
    aspectRatio: 1.5,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'space-between',
    backgroundColor: '#F9F5F7',
    overflow: 'hidden',
  },
  genreRipple: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: 'rgba(248, 216, 219, 0.75)',
  },
  genreTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 19,
    lineHeight: 24,
    color: '#6D5658',
  },
  genreIconWrap: {
    alignItems: 'flex-end',
    marginRight: -4,
    marginBottom: -4,
  },
  resultGroup: {
    marginBottom: 24,
  },
  resultHeading: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#2F2E30',
    marginBottom: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.36)',
    marginBottom: 10,
  },
  resultThumb: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultInfo: {
    flex: 1,
    minWidth: 0,
  },
  resultTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#2F2E30',
  },
  resultMeta: {
    marginTop: 2,
    fontFamily: 'Inter-Variable',
    fontSize: 12,
    lineHeight: 16,
    color: '#5C5B5D',
  },
  resultDuration: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 10,
    lineHeight: 12,
    color: 'rgba(109, 86, 88, 0.50)',
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.36)',
    marginBottom: 10,
  },
  artistAvatar: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
