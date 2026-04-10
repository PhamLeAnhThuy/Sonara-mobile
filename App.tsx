import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen } from './src/screens/HomeScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { NowPlayingScreen } from './src/screens/NowPlayingScreen';
import { PlaylistViewScreen } from './src/screens/PlaylistViewScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { SonaraProvider, useSonara } from './src/state/SonaraContext';

function AppShell() {
  const { currentUser, logout, signIn, signUp } = useSonara();
  const [activeTab, setActiveTab] = React.useState<'home' | 'search' | 'library' | 'profile'>('home');
  const [libraryView, setLibraryView] = React.useState<'library' | 'playlist' | 'now-playing'>('library');
  const [authView, setAuthView] = React.useState<'signin' | 'signup'>('signin');

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

  const handleSignIn = (email: string, password: string) => {
    const result = signIn(email, password);

    if (result.ok) {
      setActiveTab('home');
      setLibraryView('library');
    }

    return result;
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    const result = signUp(name, email, password);

    if (result.ok) {
      setActiveTab('home');
      setLibraryView('library');
    }

    return result;
  };

  const renderScreen = () => {
    if (!currentUser) {
      if (authView === 'signup') {
        return (
          <SignUpScreen
            onBack={() => setAuthView('signin')}
            onGoToSignIn={() => setAuthView('signin')}
            onSubmit={handleSignUp}
          />
        );
      }

      return (
        <SignInScreen
          onBack={() => setAuthView('signin')}
          onGoToSignUp={() => setAuthView('signup')}
          onSubmit={handleSignIn}
        />
      );
    }

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
      return <ProfileScreen onSignOut={() => { logout(); setActiveTab('home'); setLibraryView('library'); setAuthView('signin'); }} onTabPress={handleTabPress} />;
    }

    return <HomeScreen onTabPress={handleTabPress} />;
  };

  return (
    <SafeAreaProvider>
      {renderScreen()}
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <SonaraProvider>
      <AppShell />
    </SonaraProvider>
  );
}

export default App;
