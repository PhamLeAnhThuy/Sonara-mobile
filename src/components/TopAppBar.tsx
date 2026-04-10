import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function TopAppBar() {
  return (
    <View style={styles.shell}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
          <MaterialIcons color="#6D5658" name="grid-view" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>SONARA</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
          <MaterialIcons color="#6D5658" name="settings" size={24} />
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#F9F5F7',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.75)',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
