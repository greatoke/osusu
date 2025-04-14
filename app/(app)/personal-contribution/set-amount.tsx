import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SetDailyAmountScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  const [amount, setAmount] = useState('5000');
  
  // Predefined amount options
  const amountOptions = ['1000', '2000', '5000', '10000', '20000'];

  const handleSave = () => {
    // Here you would save the amount to your state management or backend
    // For now, we'll just navigate back
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Set Daily Amount',
        headerBackTitle: 'Back',
      }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              How much would you like to save daily?
            </ThemedText>
            
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
              Choose an amount you can consistently save each day
            </ThemedText>
          </ThemedView>

          {/* Quick amount options */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Select</ThemedText>
            
            <View style={styles.amountOptionsContainer}>
              {amountOptions.map((option) => (
                <TouchableOpacity 
                  key={option}
                  style={[
                    styles.amountOption,
                    amount === option && { backgroundColor: primaryColor }
                  ]}
                  onPress={() => setAmount(option)}
                >
                  <ThemedText 
                    style={[
                      styles.amountOptionText,
                      amount === option && { color: '#fff' }
                    ]}
                  >
                    ₦{parseInt(option).toLocaleString()}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          </ThemedView>

          {/* Custom settings */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Custom Settings</ThemedText>
            
            <TouchableOpacity style={styles.customOption}>
              <View style={styles.customOptionContent}>
                <IconSymbol name="calendar" size={20} color={primaryColor} />
                <ThemedText style={styles.customOptionText}>Set Contribution Schedule</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.customOption}>
              <View style={styles.customOptionContent}>
                <IconSymbol name="bell" size={20} color={primaryColor} />
                <ThemedText style={styles.customOptionText}>Set Reminders</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#666" />
            </TouchableOpacity>
          </ThemedView>

          {/* Save button */}
          <View style={styles.buttonContainer}>
            <ThemedButton onPress={handleSave}>
              Save Changes
            </ThemedButton>
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
    marginBottom: 16,
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
  },
  amountOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amountOption: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    marginBottom: 12,
    alignItems: 'center',
  },
  amountOptionText: {
    fontWeight: '600',
  },
  customOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  customOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customOptionText: {
    marginLeft: 12,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingVertical: 16,
  },
});