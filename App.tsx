import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen } from './src/screens/HomeScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { SearchScreen } from './src/screens/SearchScreen';

function App() {
  const [activeTab, setActiveTab] = React.useState<'home' | 'search' | 'library' | 'profile'>('home');

  useEffect(() => {
    // Force-load icon font on startup so glyphs do not render as missing boxes.
    if (typeof MaterialIcons.loadFont === 'function') {
      MaterialIcons.loadFont();
    }
  }, []);

  const renderScreen = () => {
    if (activeTab === 'search') {
      return <SearchScreen onTabPress={setActiveTab} />;
    }

    if (activeTab === 'library') {
      return <LibraryScreen onTabPress={setActiveTab} />;
    }

    return <HomeScreen onTabPress={setActiveTab} />;
  };

  return (
    <SafeAreaProvider>
      {renderScreen()}
    </SafeAreaProvider>
  );
}

export default App;
