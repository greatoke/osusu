import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function CreateGroupScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  const [groupName, setGroupName] = useState('');
  const [amount, setAmount] = useState('5000');
  const [participants, setParticipants] = useState('5');
  const [duration, setDuration] = useState('Weekly');
  
  // Duration options
  const durationOptions = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'];

  const handleCreateGroup = () => {
    // Here you would create the group
    // For now, we'll just navigate back
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Create a Group',
        headerBackTitle: 'Back',
      }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container}>
          {/* Group Name */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Group Name</ThemedText>
            <TextInput
              style={styles.textInput}
              value={groupName}
              onChangeText={setGroupName}
              placeholder="Enter group name"
              placeholderTextColor="#999"
            />
          </ThemedView>

          {/* Amount per Cycle */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Amount per Cycle</ThemedText>
            
            <View style={styles.amountInputContainer}>
              <ThemedText type="title" style={styles.currencySymbol}>₦</ThemedText>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#999"
              />
            </View>

            <ThemedText style={styles.helperText}>
              This is the amount each member will contribute per cycle
            </ThemedText>
          </ThemedView>

          {/* Number of Participants */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Number of Participants</ThemedText>
            
            <View style={styles.participantsContainer}>
              <TouchableOpacity 
                style={styles.participantButton}
                onPress={() => setParticipants(prev => Math.max(2, parseInt(prev) - 1).toString())}
              >
                <IconSymbol name="minus" size={20} color="#666" />
              </TouchableOpacity>
              
              <TextInput
                style={styles.participantsInput}
                value={participants}
                onChangeText={setParticipants}
                keyboardType="numeric"
              />
              
              <TouchableOpacity 
                style={styles.participantButton}
                onPress={() => setParticipants(prev => (parseInt(prev) + 1).toString())}
              >
                <IconSymbol name="plus" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <ThemedText style={styles.helperText}>
              Including yourself, minimum 2 participants
            </ThemedText>
          </ThemedView>

          {/* Contribution Cycle */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Contribution Cycle</ThemedText>
            
            <View style={styles.durationOptionsContainer}>
              {durationOptions.map((option) => (
                <TouchableOpacity 
                  key={option}
                  style={[
                    styles.durationOption,
                    duration === option && { backgroundColor: primaryColor }
                  ]}
                  onPress={() => setDuration(option)}
                >
                  <ThemedText 
                    style={[
                      styles.durationOptionText,
                      duration === option && { color: '#fff' }
                    ]}
                  >
                    {option}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </ThemedView>

          {/* Group Summary */}
          <ThemedView style={[styles.section, styles.summaryContainer]}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Group Summary</ThemedText>
            
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryLabel}>Total Group Amount</ThemedText>
              <ThemedText type="defaultSemiBold">
                ₦{(parseInt(amount) * parseInt(participants)).toLocaleString()}
              </ThemedText>
            </View>
            
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryLabel}>Cycle Duration</ThemedText>
              <ThemedText type="defaultSemiBold">{duration}</ThemedText>
            </View>
            
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryLabel}>Total Cycles</ThemedText>
              <ThemedText type="defaultSemiBold">{participants}</ThemedText>
            </View>
            
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryLabel}>Estimated Completion</ThemedText>
              <ThemedText type="defaultSemiBold">
                {duration === 'Daily' ? `${participants} days` :
                 duration === 'Weekly' ? `${participants} weeks` :
                 duration === 'Bi-weekly' ? `${participants * 2} weeks` :
                 `${participants} months`}
              </ThemedText>
            </View>
          </ThemedView>

          {/* Create button */}
          <View style={styles.buttonContainer}>
            <ThemedButton onPress={handleCreateGroup}>
              Create Group
            </ThemedButton>
            <ThemedText style={styles.disclaimerText}>
              By creating a group, you agree to our terms and conditions
            </ThemedText>
          </View>
        </ScrollView>
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
    marginBottom: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  currencySymbol: {
    fontSize: 36,
    marginRight: 8,
  },
  amountInput: {
    fontSize: 36,
    fontWeight: 'bold',
    minWidth: 150,
    textAlign: 'center',
  },
  helperText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  participantButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  participantsInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 60,
    marginHorizontal: 16,
  },
  durationOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  durationOption: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginBottom: 12,
    alignItems: 'center',
  },
  durationOptionText: {
    fontWeight: '600',
  },
  summaryContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  summaryLabel: {
    color: '#666',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  disclaimerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
});