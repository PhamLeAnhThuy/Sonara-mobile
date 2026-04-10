import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen } from './src/screens/HomeScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { PlaylistViewScreen } from './src/screens/PlaylistViewScreen';
import { SearchScreen } from './src/screens/SearchScreen';

function App() {
  const [activeTab, setActiveTab] = React.useState<'home' | 'search' | 'library' | 'profile'>('home');
  const [inPlaylistView, setInPlaylistView] = React.useState(false);

  useEffect(() => {
    // Force-load icon font on startup so glyphs do not render as missing boxes.
    if (typeof MaterialIcons.loadFont === 'function') {
      MaterialIcons.loadFont();
    }
  }, []);

  const handleTabPress = (tab: 'home' | 'search' | 'library' | 'profile') => {
    setActiveTab(tab);
    if (tab !== 'library') {
      setInPlaylistView(false);
    }
  };

  const renderScreen = () => {
    if (activeTab === 'search') {
      return <SearchScreen onTabPress={handleTabPress} />;
    }

    if (activeTab === 'library') {
      if (inPlaylistView) {
        return <PlaylistViewScreen onTabPress={handleTabPress} />;
      }

      return <LibraryScreen onOpenPlaylistView={() => setInPlaylistView(true)} onTabPress={handleTabPress} />;
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
