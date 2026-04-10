import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface BottomTabBarProps {
  activeTab: 'home' | 'search' | 'library' | 'profile';
}

export function BottomTabBar({ activeTab }: BottomTabBarProps) {
  return (
    <View style={styles.shell}>
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.9} style={[styles.tab, activeTab === 'home' ? styles.tabActive : null]}>
          <MaterialIcons color={activeTab === 'home' ? '#6D5658' : 'rgba(109, 86, 88, 0.50)'} name="home" size={24} />
          <Text style={[styles.tabLabel, activeTab === 'home' ? styles.tabLabelActive : null]}>HOME</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.9} style={styles.tab}>
          <MaterialIcons color="rgba(109, 86, 88, 0.50)" name="search" size={24} />
          <Text style={styles.tabLabel}>SEARCH</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.9} style={styles.tab}>
          <MaterialIcons color="rgba(109, 86, 88, 0.50)" name="library-music" size={24} />
          <Text style={styles.tabLabel}>LIBRARY</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.9} style={styles.tab}>
          <MaterialIcons color="rgba(109, 86, 88, 0.50)" name="person" size={24} />
          <Text style={styles.tabLabel}>PROFILE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#F9F5F7',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.78)',
    shadowColor: '#A88589',
    shadowOpacity: 0.24,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: -8 },
    elevation: 12,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#F9F5F7',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    borderRadius: 12,
    backgroundColor: '#F8D8DB',
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.10)',
  },
  tabLabel: {
    marginTop: 4,
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1.5,
    color: 'rgba(109, 86, 88, 0.50)',
  },
  tabLabelActive: {
    color: '#6D5658',
  },
});
