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

interface SignInScreenProps {
  onBack: () => void;
  onGoToSignUp: () => void;
  onSubmit: (email: string, password: string) => { ok: boolean; message?: string };
}

export function SignInScreen({ onBack, onGoToSignUp, onSubmit }: SignInScreenProps) {
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

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.mainShell}>
            <View style={styles.headerRow}>
              <TouchableOpacity activeOpacity={0.9} onPress={onBack} style={styles.backButton}>
                <MaterialIcons color="#6D5658" name="arrow-back" size={22} />
              </TouchableOpacity>

              <Text style={styles.headerTitle}>Sign In</Text>
              <View style={styles.headerSpacer} />
            </View>

            <View style={styles.welcomeWrap}>
              <Text style={styles.welcomeTitle}>Welcome Back</Text>
              <Text style={styles.welcomeSub}>Enter your credentials to access the grid</Text>
            </View>

            <View style={styles.formWrap}>
              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Email Address</Text>
                <View style={styles.fieldCard}>
                  <MaterialIcons color="#787678" name="mail" size={22} style={styles.fieldIcon} />
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    placeholder="name@architect.com"
                    placeholderTextColor="rgba(175, 172, 174, 0.80)"
                    style={styles.input}
                    value={email}
                  />
                </View>
              </View>

              <View style={styles.fieldWrap}>
                <Text style={styles.fieldLabel}>Password</Text>
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
                    const result = onSubmit(email, password);
                    setError(result.ok ? '' : result.message ?? 'Unable to sign in.');
                  }}
                  style={styles.loginButton}
                >
                  <View pointerEvents="none" style={styles.sketchBracket} />
                  <Text style={styles.loginButtonText}>Login to SONARA</Text>
                </TouchableOpacity>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity activeOpacity={0.82} style={styles.forgotWrap}>
                  <Text style={styles.forgotText}>Forgot Blueprint?</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.footerWrap}>
              <Text style={styles.footerText}>New architect?</Text>
              <TouchableOpacity activeOpacity={0.85} onPress={onGoToSignUp}>
                <Text style={styles.footerLink}>Register your Studio</Text>
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
    backgroundColor: 'rgba(175, 172, 174, 0.05)',
  },
  horizontalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(175, 172, 174, 0.05)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 32,
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
    marginBottom: 48,
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
  welcomeWrap: {
    alignItems: 'center',
    marginBottom: 32,
  },
  welcomeTitle: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 34,
    lineHeight: 38,
    color: '#6D5658',
    marginBottom: 8,
  },
  welcomeSub: {
    textAlign: 'center',
    fontFamily: 'Inter_18pt-Regular',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 14,
    color: 'rgba(92, 91, 93, 0.70)',
    textTransform: 'uppercase',
    letterSpacing: 0.9,
  },
  formWrap: {
    marginBottom: 8,
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
    paddingTop: 8,
  },
  loginButton: {
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8D8DB',
    marginBottom: 12,
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
  loginButtonText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#6D5658',
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  forgotText: {
    fontFamily: 'SpaceGrotesk-Variable',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#787678',
  },
  errorText: {
    marginTop: 10,
    marginBottom: 2,
    fontFamily: 'Inter_18pt-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: '#B31B25',
    textAlign: 'center',
  },
  footerWrap: {
    marginTop: 50,
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
  },
});