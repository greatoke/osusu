import { useState } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function JoinGroupScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  const [inviteCode, setInviteCode] = useState('');
  
  const handleJoinGroup = () => {
    // Here you would validate and join the group
    // For now, we'll just navigate back
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Join a Group',
        headerBackTitle: 'Back',
      }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Enter Invite Code
            </ThemedText>
            
            <ThemedText style={styles.description}>
              Ask the group creator for the invite code to join their savings group
            </ThemedText>
            
            <View style={styles.codeInputContainer}>
              <TextInput
                style={styles.codeInput}
                value={inviteCode}
                onChangeText={setInviteCode}
                placeholder="Enter 6-digit code"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
              />
            </View>
          </ThemedView>

          {/* Instructions */}
          <ThemedView style={[styles.section, styles.instructionsContainer]}>
            <View style={styles.instructionHeader}>
              <IconSymbol name="info.circle.fill" size={24} color="#4A6FA5" />
              <ThemedText type="subtitle" style={styles.instructionTitle}>How to Join</ThemedText>
            </View>
            
            <View style={styles.instructionStep}>
              <View style={styles.instructionStepNumber}>
                <ThemedText style={styles.stepNumberText}>1</ThemedText>
              </View>
              <ThemedText style={styles.instructionStepText}>
                Get the 6-digit invite code from the group creator
              </ThemedText>
            </View>
            
            <View style={styles.instructionStep}>
              <View style={styles.instructionStepNumber}>
                <ThemedText style={styles.stepNumberText}>2</ThemedText>
              </View>
              <ThemedText style={styles.instructionStepText}>
                Enter the code in the field above
              </ThemedText>
            </View>
            
            <View style={styles.instructionStep}>
              <View style={styles.instructionStepNumber}>
                <ThemedText style={styles.stepNumberText}>3</ThemedText>
              </View>
              <ThemedText style={styles.instructionStepText}>
                Review the group details and confirm your participation
              </ThemedText>
            </View>
          </ThemedView>

          {/* Join button */}
          <View style={styles.buttonContainer}>
            <ThemedButton 
              onPress={handleJoinGroup}
              style={inviteCode.length < 6 ? styles.disabledButton : undefined}
            >
              Join Group
            </ThemedButton>
            <ThemedText style={styles.disclaimerText}>
              By joining a group, you agree to the contribution schedule and terms
            </ThemedText>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  description: {
    color: '#666',
    marginBottom: 24,
  },
  codeInputContainer: {
    alignItems: 'center',
  },
  codeInput: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 8,
    width: '80%',
    borderBottomWidth: 2,
    borderBottomColor: '#31A062',
    paddingVertical: 8,
  },
  instructionsContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionTitle: {
    marginLeft: 8,
    color: '#4A6FA5',
    marginBottom: 0,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructionStepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4A6FA5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionStepText: {
    flex: 1,
    color: '#4A6FA5',
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 32,
  },
  disabledButton: {
    opacity: 0.6,
  },
  disclaimerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
});