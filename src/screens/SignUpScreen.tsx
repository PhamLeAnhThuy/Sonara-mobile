import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TopAppBar } from '../components/TopAppBar';

interface SignUpScreenProps {
  onBack: () => void;
  onGoToSignIn: () => void;
  onSubmit: (name: string, email: string, password: string) => { ok: boolean; message?: string };
}

export function SignUpScreen({ onBack, onGoToSignIn, onSubmit }: SignUpScreenProps) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');

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

      <TopAppBar />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.mainShell}>
            <View style={styles.headerRow}>
              <TouchableOpacity activeOpacity={0.9} onPress={onBack} style={styles.backButton}>
                <MaterialIcons color="#6D5658" name="arrow-back" size={22} />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Sign Up</Text>
              <View style={styles.headerSpacer} />
            </View>

            <View style={styles.heroWrap}>
              <Text style={styles.heroEyebrow}>Entry Protocol</Text>
              <Text style={styles.heroTitle}>Initialize{"\n"}Architecture</Text>
            </View>

            <View style={styles.formWrap}>
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Full Name</Text>
                <View style={styles.fieldCard}>
                  <MaterialIcons color="#787678" name="person" size={22} style={styles.fieldIcon} />
                  <TextInput
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={setName}
                    placeholder="ARCHITECT NAME"
                    placeholderTextColor="rgba(175, 172, 174, 0.80)"
                    style={styles.input}
                    value={name}
                  />
                </View>
              </View>

              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Communication Channel</Text>
                <View style={styles.fieldCard}>
                  <MaterialIcons color="#787678" name="mail" size={22} style={styles.fieldIcon} />
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    placeholder="EMAIL@SYSTEM.COM"
                    placeholderTextColor="rgba(175, 172, 174, 0.80)"
                    style={styles.input}
                    value={email}
                  />
                </View>
              </View>

              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Access Key</Text>
                <View style={styles.fieldCard}>
                  <MaterialIcons color="#787678" name="lock" size={22} style={styles.fieldIcon} />
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor="rgba(175, 172, 174, 0.80)"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    value={password}
                  />
                  <Pressable hitSlop={8} onPress={() => setShowPassword(prev => !prev)}>
                    <MaterialIcons color="#787678" name={showPassword ? 'visibility-off' : 'visibility'} size={22} />
                  </Pressable>
                </View>
              </View>

              <View style={styles.ctaWrap}>
                <TouchableOpacity
                  activeOpacity={0.92}
                  onPress={() => {
                    const result = onSubmit(name, email, password);
                    setError(result.ok ? '' : result.message ?? 'Unable to create account.');
                  }}
                  style={styles.registerButton}
                >
                  <View pointerEvents="none" style={styles.sketchBracket} />
                  <View style={styles.registerContent}>
                    <Text style={styles.registerButtonText}>Register</Text>
                    <MaterialIcons color="#6D5658" name="arrow-right-alt" size={18} />
                  </View>
                </TouchableOpacity>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>
            </View>

            <View style={styles.footerWrap}>
              <Text style={styles.footerText}>Already part of the architecture?</Text>
              <TouchableOpacity activeOpacity={0.85} onPress={onGoToSignIn}>
                <Text style={styles.footerLink}>Login Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9F5F7',
  },
  flex: {
    flex: 1,
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
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 56,
    paddingBottom: 28,
  },
  mainShell: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    paddingHorizontal: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 56,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F0F2',
    shadowColor: '#E5BCBE',
    shadowOpacity: 0.55,
    shadowRadius: 8,
    shadowOffset: { width: 4, height: 4 },
    elevation: 4,
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: '#6D5658',
  },
  headerSpacer: {
    width: 48,
    height: 48,
  },
  heroWrap: {
    marginBottom: 40,
  },
  heroEyebrow: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#6D5658',
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 36,
    lineHeight: 38,
    textTransform: 'uppercase',
    color: '#2F2E30',
  },
  formWrap: {
    gap: 20,
  },
  fieldWrap: {
    gap: 8,
  },
  fieldLabel: {
    paddingHorizontal: 4,
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: '#787678',
  },
  fieldCard: {
    borderRadius: 16,
    backgroundColor: '#F4F0F2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: 'rgba(109, 86, 88, 0.18)',
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 4, height: 4 },
    elevation: 3,
  },
  fieldIcon: {
    marginRight: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#2F2E30',
  },
  ctaWrap: {
    paddingTop: 6,
  },
  registerButton: {
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8D8DB',
    position: 'relative',
    shadowColor: '#E5BCBE',
    shadowOpacity: 0.7,
    shadowRadius: 14,
    shadowOffset: { width: 8, height: 8 },
    elevation: 6,
  },
  sketchBracket: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'rgba(109, 86, 88, 0.35)',
  },
  registerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  registerButtonText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 2.3,
    textTransform: 'uppercase',
    color: '#6D5658',
  },
  footerWrap: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontFamily: 'Inter_18pt-Regular',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    color: '#5C5B5D',
  },
  footerLink: {
    fontFamily: 'Inter_18pt-Regular',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    color: '#6D5658',
    textDecorationLine: 'underline',
  },
  errorText: {
    marginTop: 10,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: '#B31B25',
    textAlign: 'center',
  },
});