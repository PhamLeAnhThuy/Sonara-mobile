import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabBar } from '../components/BottomTabBar';
import { MiniPlayer } from '../components/MiniPlayer';
import { NeumorphicView } from '../components/NeumorphicView';
import { TopAppBar } from '../components/TopAppBar';

const recommended = [
  { id: 'S-01', title: 'Kinetic Structures', subtitle: 'The Blueprint Collective', icon: 'architecture' },
  { id: 'S-02', title: 'Vellum Echoes', subtitle: 'Drafting Room', icon: 'category' },
  { id: 'S-03', title: 'Axis Alignment', subtitle: 'Isometric Theory', icon: 'square-foot' },
];

const trending = [
  { id: '1', title: 'Synthetic Elevations', subtitle: 'Architectural Pulse', time: '04:22', icon: 'grid-view' },
  { id: '2', title: 'Brutalist Harmony', subtitle: 'Stone & Light', time: '03:51', icon: 'change-history' },
];

const archived = [
  { id: '1', label: 'Acoustic', symbol: 'AE', icon: null },
  { id: '2', label: 'Trinity', symbol: '', icon: 'change-history' },
  { id: '3', label: 'Linear', symbol: 'LS', icon: null },
  { id: '4', label: 'Radial', symbol: '', icon: 'radio-button-checked' },
];

export function HomeScreen() {
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

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionPreTitle}>Curated Architecture</Text>
              <Text style={styles.sectionTitle}>Recommended for You</Text>
            </View>
            <Text style={styles.sectionRef}>REF-092</Text>
          </View>

          <ScrollView
            contentContainerStyle={styles.recommendedRow}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recommendedScroll}
          >
            {recommended.map((item, index) => (
              <View key={item.id} style={[styles.card, index === recommended.length - 1 ? styles.cardLast : null]}>
                <NeumorphicView borderRadius={32} style={styles.cardShell} variant="outset">
                  <NeumorphicView borderRadius={16} style={styles.cardArt} variant="inset">
                    {item.id === 'S-01' ? <View style={styles.cardDashInset} /> : null}
                    {item.id === 'S-02' ? <View style={styles.cardCircleInset} /> : null}
                    {item.id === 'S-02' ? <View style={styles.cardDiamondInset} /> : null}
                    {item.id === 'S-03' ? (
                      <View style={styles.cardCrossWrap}>
                        <View style={[styles.cardCrossLine, styles.cardCrossLineA]} />
                        <View style={[styles.cardCrossLine, styles.cardCrossLineB]} />
                      </View>
                    ) : null}
                    <MaterialIcons color="rgba(109, 86, 88, 0.30)" name={item.icon} size={item.id === 'S-01' ? 48 : 40} />
                    <Text style={styles.cardBadge}>{item.id}</Text>
                  </NeumorphicView>
                  <View style={styles.cardTextBlock}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                  </View>
                </NeumorphicView>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionPreTitle}>Daily Calculations</Text>
              <Text style={styles.sectionTitle}>Trending Blueprints</Text>
            </View>
            <Text style={styles.sectionRef}>REF-105</Text>
          </View>

          <View style={styles.trendingList}>
            {trending.map(item => (
              <TouchableOpacity activeOpacity={0.85} key={item.id} style={styles.trendingItem}>
                <NeumorphicView borderRadius={12} style={styles.trendingIconWrap} variant="inset">
                  <MaterialIcons color="rgba(109, 86, 88, 0.40)" name={item.icon} size={22} />
                </NeumorphicView>
                <View style={styles.trendingInfo}>
                  <Text style={styles.trendingTitle}>{item.title}</Text>
                  <Text style={styles.trendingSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.trendingAction}>
                  <Text style={styles.trendingTime}>{item.time}</Text>
                  <MaterialIcons color="#6D5658" name="play-circle" size={26} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionLast}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionPreTitle}>Historical Data</Text>
              <Text style={styles.sectionTitle}>Archived Sessions</Text>
            </View>
            <Text style={styles.sectionRef}>REF-004</Text>
          </View>

          <ScrollView contentContainerStyle={styles.archivedRow} horizontal showsHorizontalScrollIndicator={false}>
            {archived.map(item => (
              <View key={item.id} style={styles.archiveItem}>
                <NeumorphicView borderRadius={999} style={styles.archiveBubble} variant="outset">
                  {item.icon ? (
                    <MaterialIcons color="#6D5658" name={item.icon} size={24} />
                  ) : (
                    <Text style={styles.archiveSymbol}>{item.symbol}</Text>
                  )}
                </NeumorphicView>
                <Text style={styles.archiveLabel}>{item.label}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <MiniPlayer />
      <BottomTabBar activeTab="home" />
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
  section: {
    marginBottom: 48,
  },
  sectionLast: {
    marginBottom: 0,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionPreTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    textTransform: 'uppercase',
    letterSpacing: 2.4,
    color: 'rgba(109, 86, 88, 0.50)',
  },
  sectionTitle: {
    marginTop: 2,
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 30,
    color: '#6D5658',
  },
  sectionRef: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#6D5658',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(109, 86, 88, 0.20)',
    paddingBottom: 4,
  },
  recommendedScroll: {
    marginHorizontal: -24,
  },
  recommendedRow: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 32,
  },
  card: {
    width: 240,
  },
  cardLast: {
    marginRight: 0,
  },
  cardShell: {
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.15)',
    padding: 16,
    backgroundColor: '#F4F0F2',
  },
  cardArt: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  cardDashInset: {
    position: 'absolute',
    top: 16,
    right: 16,
    bottom: 16,
    left: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderStyle: 'dashed',
    borderColor: 'rgba(109, 86, 88, 0.10)',
  },
  cardCircleInset: {
    position: 'absolute',
    top: 32,
    right: 32,
    bottom: 32,
    left: 32,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(109, 86, 88, 0.05)',
  },
  cardDiamondInset: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.20)',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
  },
  cardCrossWrap: {
    position: 'absolute',
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCrossLine: {
    position: 'absolute',
    width: 80,
    borderTopWidth: 1,
    borderTopColor: 'rgba(109, 86, 88, 0.10)',
  },
  cardCrossLineA: {
    transform: [{ rotate: '-12deg' }],
  },
  cardCrossLineB: {
    transform: [{ rotate: '45deg' }],
  },
  cardBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 8,
    lineHeight: 10,
    color: 'rgba(109, 86, 88, 0.40)',
  },
  cardTextBlock: {
    gap: 4,
  },
  cardTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: '#6D5658',
    letterSpacing: -0.2,
  },
  cardSubtitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    color: 'rgba(109, 86, 88, 0.60)',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  trendingList: {
    paddingHorizontal: 24,
    gap: 16,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
    borderRadius: 16,
  },
  trendingIconWrap: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.15)',
    backgroundColor: '#FFFFFF',
  },
  trendingInfo: {
    flex: 1,
  },
  trendingTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#2F2E30',
  },
  trendingSubtitle: {
    marginTop: 2,
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    color: 'rgba(109, 86, 88, 0.60)',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  trendingAction: {
    alignItems: 'flex-end',
  },
  trendingTime: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontSize: 10,
    lineHeight: 12,
    color: 'rgba(109, 86, 88, 0.40)',
    marginBottom: 4,
  },
  archivedRow: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 24,
  },
  archiveItem: {
    alignItems: 'center',
    gap: 12,
  },
  archiveBubble: {
    width: 64,
    height: 64,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.15)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  archiveSymbol: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: '#6D5658',
  },
  archiveLabel: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '500',
    fontSize: 9,
    lineHeight: 12,
    color: 'rgba(109, 86, 88, 0.70)',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
  },
});
