import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen } from './src/screens/HomeScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { NowPlayingScreen } from './src/screens/NowPlayingScreen';
import { PlaylistViewScreen } from './src/screens/PlaylistViewScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SearchScreen } from './src/screens/SearchScreen';

function App() {
  const [activeTab, setActiveTab] = React.useState<'home' | 'search' | 'library' | 'profile'>('home');
  const [libraryView, setLibraryView] = React.useState<'library' | 'playlist' | 'now-playing'>('library');

  useEffect(() => {
    // Force-load icon font on startup so glyphs do not render as missing boxes.
    if (typeof MaterialIcons.loadFont === 'function') {
      MaterialIcons.loadFont();
    }
  }, []);

  const handleTabPress = (tab: 'home' | 'search' | 'library' | 'profile') => {
    setActiveTab(tab);
    if (tab !== 'library') {
      setLibraryView('library');
    }
  };

  const renderScreen = () => {
    if (activeTab === 'search') {
      return <SearchScreen onTabPress={handleTabPress} />;
    }

    if (activeTab === 'library') {
      if (libraryView === 'playlist') {
        return <PlaylistViewScreen onOpenNowPlaying={() => setLibraryView('now-playing')} onTabPress={handleTabPress} />;
      }

      if (libraryView === 'now-playing') {
        return <NowPlayingScreen onTabPress={handleTabPress} />;
      }

      return <LibraryScreen onOpenPlaylistView={() => setLibraryView('playlist')} onTabPress={handleTabPress} />;
    }

    if (activeTab === 'profile') {
      return <ProfileScreen onTabPress={handleTabPress} />;
    }

    return <HomeScreen onTabPress={handleTabPress} />;
  };

  return (
    <SafeAreaProvider>
      {renderScreen()}
    </SafeAreaProvider>
  );
}

export default App;
