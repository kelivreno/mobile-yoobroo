import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react-native';

const PRIMARY = '#F45B37';
const BORDER = '#E5E7EB';
const SUBTEXT = '#6B7280';

const LoginScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleAuth = async () => {
    if (isSignUp && !name) {
      setError('Please enter your name');
      return;
    }
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      login();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>{isSignUp ? 'Create an account' : 'Welcome back'}</Text>
            <Text style={styles.subtitle}>{isSignUp ? 'Enter your details to get started' : 'Swipe into your account'}</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            {isSignUp && (
              <View style={styles.inputWrapper}>
                <User color={SUBTEXT} size={22} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor={SUBTEXT}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>
            )}
            <View style={styles.inputWrapper}>
              <Mail color={SUBTEXT} size={22} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={SUBTEXT}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Lock color={SUBTEXT} size={22} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={SUBTEXT}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
              />
              <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={styles.eyeIcon}>
                {showPassword ? (
                  <Eye color={SUBTEXT} size={22} />
                ) : (
                  <EyeOff color={SUBTEXT} size={22} />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleAuth}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{isSignUp ? 'Sign up' : 'Sign in'} →</Text>
              )}
            </TouchableOpacity>
            <View style={styles.linksRow}>
              <Text style={styles.linkText}>{isSignUp ? 'Already have an account? ' : "Don't have an account? "}</Text>
              <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} disabled={loading}>
                <Text style={styles.linkAction}>{isSignUp ? 'Sign in' : 'Sign up'}</Text>
              </TouchableOpacity>
            </View>
            {isSignUp && (
              <Text style={styles.disclaimer}>
                By signing up, you agree to our <Text style={styles.linkAction}>Terms of Service</Text> and <Text style={styles.linkAction}>Privacy Policy</Text>
              </Text>
            )}
            {!isSignUp && (
              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot your password?</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    height: 64,
    width: 160,
    marginBottom: 8,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    color: '#111',
  },
  subtitle: {
    fontSize: 16,
    color: SUBTEXT,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: BORDER,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 14,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  eyeIcon: {
    marginLeft: 8,
    padding: 4,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 14,
    fontSize: 16,
    color: '#111',
  },
  button: {
    backgroundColor: PRIMARY,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#ff3b30',
    marginBottom: 10,
    textAlign: 'center',
  },
  linksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  linkText: {
    color: SUBTEXT,
    fontSize: 15,
  },
  linkAction: {
    color: PRIMARY,
    fontWeight: '600',
    fontSize: 15,
  },
  forgotButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  forgotText: {
    color: SUBTEXT,
    fontSize: 15,
  },
  disclaimer: {
    color: SUBTEXT,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 0,
  },
});

export default LoginScreen; 