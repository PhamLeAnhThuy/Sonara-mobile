import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabBar } from '../components/BottomTabBar';
import { MiniPlayer } from '../components/MiniPlayer';
import { NeumorphicView } from '../components/NeumorphicView';
import { TopAppBar } from '../components/TopAppBar';

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
                placeholder="Artists, songs, or podcasts"
                placeholderTextColor="rgba(120, 118, 120, 0.40)"
                style={styles.searchInput}
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
            {genres.map(item => (
              <TouchableOpacity activeOpacity={0.9} key={item.id} style={styles.genreCell}>
                <NeumorphicView borderRadius={16} style={styles.genreCard} variant="outset">
                  <Text style={styles.genreTitle}>{item.title}</Text>
                  <View style={styles.genreIconWrap}>
                    <MaterialIcons color="rgba(109, 86, 88, 0.20)" name={item.icon} size={56} />
                  </View>
                </NeumorphicView>
              </TouchableOpacity>
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
    paddingTop: 96,
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
  genreCard: {
    aspectRatio: 1.5,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'space-between',
    backgroundColor: '#F9F5F7',
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
});
