import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function WithdrawScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  const [amount, setAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState('partial');
  
  // Mock data
  const availableBalance = 325000;

  const handleWithdraw = () => {
    // Here you would process the withdrawal
    // For now, we'll just navigate back
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Withdraw Funds',
        headerBackTitle: 'Back',
      }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Available Balance
            </ThemedText>
            
            <ThemedText type="title" style={styles.balanceText}>
              ₦{availableBalance.toLocaleString()}
            </ThemedText>
          </ThemedView>

          {/* Withdrawal Options */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Withdrawal Options</ThemedText>
            
            <TouchableOpacity 
              style={[styles.optionCard, selectedOption === 'partial' && styles.selectedOption]}
              onPress={() => setSelectedOption('partial')}
            >
              <View style={styles.optionContent}>
                <ThemedText type="defaultSemiBold">Partial Withdrawal</ThemedText>
                <ThemedText style={styles.optionDescription}>
                  Withdraw a specific amount from your savings
                </ThemedText>
              </View>
              <View style={styles.radioButton}>
                {selectedOption === 'partial' && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.optionCard, selectedOption === 'full' && styles.selectedOption]}
              onPress={() => setSelectedOption('full')}
            >
              <View style={styles.optionContent}>
                <ThemedText type="defaultSemiBold">Full Withdrawal</ThemedText>
                <ThemedText style={styles.optionDescription}>
                  Withdraw your entire savings balance
                </ThemedText>
              </View>
              <View style={styles.radioButton}>
                {selectedOption === 'full' && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
          </ThemedView>

          {/* Amount Input (only for partial withdrawal) */}
          {selectedOption === 'partial' && (
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Withdrawal Amount</ThemedText>
              
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
                Maximum withdrawal: ₦{availableBalance.toLocaleString()}
              </ThemedText>
            </ThemedView>
          )}

          {/* Bank Account Selection */}
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Destination Account</ThemedText>
            
            <TouchableOpacity style={styles.bankAccountCard}>
              <View style={styles.bankLogoPlaceholder}>
                <ThemedText type="defaultSemiBold">GTB</ThemedText>
              </View>
              <View style={styles.bankAccountDetails}>
                <ThemedText type="defaultSemiBold">GTBank - Jonas Macroni</ThemedText>
                <ThemedText style={styles.accountNumber}>**** **** 1234</ThemedText>
              </View>
              <IconSymbol name="chevron.right" size={20} color="#666" />
            </TouchableOpacity>
          </ThemedView>

          {/* Withdrawal button */}
          <View style={styles.buttonContainer}>
            <ThemedButton onPress={handleWithdraw}>
              Withdraw Funds
            </ThemedButton>
            <ThemedText style={styles.disclaimerText}>
              Withdrawals typically process within 1-2 business days
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
    marginBottom: 16,
  },
  balanceText: {
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  selectedOption: {
    borderColor: '#31A062',
    backgroundColor: 'rgba(49, 160, 98, 0.05)',
  },
  optionContent: {
    flex: 1,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#31A062',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#31A062',
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
  bankAccountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  bankLogoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankAccountDetails: {
    flex: 1,
    marginLeft: 12,
  },
  accountNumber: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingVertical: 16,
  },
  disclaimerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
});