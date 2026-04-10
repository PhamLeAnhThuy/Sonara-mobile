import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function MiniPlayer() {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.albumWrap}>
          <MaterialIcons color="#6D5658" name="architecture" size={22} />
        </View>

        <View style={styles.infoWrap}>
          <Text numberOfLines={1} style={styles.title}>
            Kinetic Structures
          </Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity activeOpacity={0.8} style={styles.iconControl}>
            <MaterialIcons color="#6D5658" name="skip-previous" size={20} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.playButton}>
            <MaterialIcons color="#6D5658" name="play-arrow" size={24} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.iconControl}>
            <MaterialIcons color="#6D5658" name="skip-next" size={20} />
          </TouchableOpacity>
        </View>
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
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.15)',
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
  },
});
