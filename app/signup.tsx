import { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SignupScreen() {
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;
  const router = useRouter();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Here you would implement actual signup logic
    // For now, just navigate to the main app
    router.replace('/(app)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.container}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.backButtonText}>←</ThemedText>
          </TouchableOpacity>
          
          <View style={styles.headerContainer}>
            <ThemedText type="title" style={styles.title}>
              Create an account
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Invest and double your income now
            </ThemedText>
          </View>
          
          <View style={styles.formContainer}>
            <TextInput
              style={[styles.input, { borderColor: colorScheme === 'dark' ? '#444' : '#ddd' }]}
              placeholder="Full name"
              placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
              value={fullName}
              onChangeText={setFullName}
            />
            
            <TextInput
              style={[styles.input, { borderColor: colorScheme === 'dark' ? '#444' : '#ddd' }]}
              placeholder="Email address"
              placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={[styles.input, { borderColor: colorScheme === 'dark' ? '#444' : '#ddd' }]}
              placeholder="Password"
              placeholderTextColor={colorScheme === 'dark' ? '#888' : '#999'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: tintColor }]}
              activeOpacity={0.8}
              onPress={handleSignup}
            >
              <ThemedText style={styles.buttonText} lightColor="#fff" darkColor="#fff">
                Create account
              </ThemedText>
            </TouchableOpacity>
            
            <View style={styles.loginLinkContainer}>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <ThemedText style={[styles.loginText, { color: tintColor }]}>
                    Already have an account?
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLinkContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
  },
});