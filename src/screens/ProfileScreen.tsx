import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomTabBar } from '../components/BottomTabBar';
import { TopAppBar } from '../components/TopAppBar';
import { useSonara } from '../state/SonaraContext';

interface ProfileScreenProps {
  onTabPress: (tab: 'home' | 'search' | 'library' | 'profile') => void;
  onSignOut: () => void;
}

const settingsRows = [
  { icon: 'person', title: 'Personal Information' },
  { icon: 'notifications', title: 'Notifications' },
  { icon: 'security', title: 'Privacy & Security' },
  { icon: 'help-center', title: 'Help Center' },
];

export function ProfileScreen({ onSignOut, onTabPress }: ProfileScreenProps) {
  const { currentUser } = useSonara();
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

      <View pointerEvents="none" style={styles.circleOutline} />
      <View pointerEvents="none" style={styles.squareOutline} />

      <TopAppBar />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.contentWrap}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarShellWrap}>
              <View style={styles.avatarShell}>
                <View style={styles.avatarInner}>
                  <Image
                    source={{
                      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXB_LYCg-sVc2pNEoesNy56mzGn9vs-R3SDmbjlkceLmaZKyYcHjtL7xJbc7-nnmLvO5KdBNxvnFgmWBCGKAo_PBcDDWAXqvCZeRQXAq3jjALed2spZKzs2sFESY4fNHbxC6zUYwN-D7jr6O2pWfjKoFw48vrWz0bsgQaamHXMRvsAz3-WQCUdi_LVLEudenDlZU4JRxcjFAHD2Ki6b9V3xWArnQtoSrsmmyVn2ZGASvOFRweQ95kXQOPPGk3Pd02MOZZl3UdJxW',
                    }}
                    style={styles.avatarImage}
                  />
                </View>
              </View>

              <TouchableOpacity activeOpacity={0.88} style={styles.editBadge}>
                <MaterialIcons color="#FFEFF0" name="edit" size={16} />
              </TouchableOpacity>
            </View>

            <View style={styles.identityWrap}>
              <Text style={styles.name}>{currentUser?.name ?? 'Alex Rivera'}</Text>
              <Text style={styles.email}>{currentUser?.email ?? 'alex.rivera@archaudio.tech'}</Text>
              <View style={styles.refBadge}>
                <Text style={styles.refBadgeText}>REF-001-USER</Text>
              </View>
            </View>

            <TouchableOpacity activeOpacity={0.9} style={styles.editProfileBtn}>
              <Text style={styles.editProfileBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.settingsTitle}>Account Architecture</Text>

            <View style={styles.settingsList}>
              {settingsRows.map(item => (
                <TouchableOpacity activeOpacity={0.9} key={item.title} style={styles.settingsItem}>
                  <View style={styles.settingsLeftRow}>
                    <View style={styles.settingsIconWrap}>
                      <MaterialIcons color="#6D5658" name={item.icon} size={20} />
                    </View>

                    <Text style={styles.settingsText}>{item.title}</Text>
                  </View>

                  <MaterialIcons color="rgba(92, 91, 93, 0.40)" name="chevron-right" size={21} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.logoutWrap}>
            <TouchableOpacity activeOpacity={0.86} onPress={onSignOut} style={styles.signOutBtn}>
              <Text style={styles.signOutText}>Sign Out Protocol</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>BUILD V.1.0.4 // LOCALHOST</Text>
          </View>
        </View>
      </ScrollView>

      <BottomTabBar activeTab="profile" onTabPress={onTabPress} />
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
  circleOutline: {
    position: 'absolute',
    top: 96,
    left: -40,
    width: 256,
    height: 256,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.05)',
    zIndex: 1,
  },
  squareOutline: {
    position: 'absolute',
    bottom: 200,
    right: -96,
    width: 384,
    height: 384,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.05)',
    transform: [{ rotate: '45deg' }],
    zIndex: 1,
  },
  scrollView: {
    zIndex: 2,
  },
  scrollContent: {
    paddingTop: 56,
    paddingBottom: 168,
  },
  contentWrap: {
    paddingHorizontal: 24,
    width: '100%',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarShellWrap: {
    marginBottom: 24,
    position: 'relative',
  },
  avatarShell: {
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#F4F0F2',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(109, 86, 88, 0.08)',
    shadowOpacity: 1,
    shadowRadius: 14,
    shadowOffset: { width: 8, height: 8 },
    elevation: 10,
  },
  avatarInner: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(248, 216, 219, 0.20)',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  editBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: '#6D5658',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(109, 86, 88, 0.2)',
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 4, height: 4 },
    elevation: 8,
  },
  identityWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 32,
    color: '#2F2E30',
    marginBottom: 4,
  },
  email: {
    fontFamily: 'Inter_18pt-Regular',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
    color: '#5C5B5D',
    marginBottom: 8,
  },
  refBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(248, 216, 219, 0.30)',
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.10)',
  },
  refBadgeText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1.6,
    color: '#6D5658',
    textTransform: 'uppercase',
  },
  editProfileBtn: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6D5658',
    shadowColor: '#D9AEB2',
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 6, height: 6 },
    elevation: 7,
  },
  editProfileBtnText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: '#FFEFF0',
  },
  settingsSection: {
    marginBottom: 40,
  },
  settingsTitle: {
    paddingHorizontal: 8,
    marginBottom: 16,
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(109, 86, 88, 0.60)',
  },
  settingsList: {
    gap: 12,
  },
  settingsItem: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    backgroundColor: '#F4F0F2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#DAB9BC',
    shadowOpacity: 0.68,
    shadowRadius: 12,
    shadowOffset: { width: 6, height: 6 },
    elevation: 5,
  },
  settingsLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingsIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DAB9BC',
    shadowOpacity: 0.45,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
  },
  settingsText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 18,
    color: '#2F2E30',
  },
  logoutWrap: {
    alignItems: 'center',
  },
  signOutBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  signOutText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: 'rgba(179, 27, 37, 0.60)',
  },
  versionText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.8,
    color: 'rgba(92, 91, 93, 0.40)',
    marginBottom: 12,
  },
});