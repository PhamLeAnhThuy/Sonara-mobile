import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function TopAppBar() {
  return (
    <View style={styles.shell}>
      <View style={styles.container}>
        <Text style={styles.title}>SONARA</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(109, 86, 88, 0.10)',
    backgroundColor: '#F9F5F7',
    shadowColor: '#A88589',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F9F5F7',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.75)',
  },
  title: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 3.2,
    color: '#6D5658',
  },
});
