import { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import ModalHeader from '@/components/ui/modal-header';
import { 
  AmountInput, 
  PaymentMethodSelector, 
  FeeSummary, 
  BalanceDisplay,
  AnimatedButton,
  DisclaimerText,
  SectionContainer
} from '@/components/ui/form';
import { PaymentMethod } from '@/components/ui/form/PaymentMethodSelector';

export default function DepositScreen() {
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  
  // Mock data
  const currentBalance = 125000;

  // Payment methods data
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Debit Card',
      description: 'Instant deposit from your card',
      iconName: 'creditcard.fill'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Manual transfer from your bank',
      iconName: 'building.columns.fill'
    }
  ];
  
  const handleDeposit = () => {
    // Here you would process the deposit
    // For now, we'll just navigate back
    setTimeout(() => router.back(), 300);
  };

  // Calculate fee and total
  const processingFee = amount ? Math.round(parseInt(amount) * 0.015) : 0;
  const total = amount ? (parseInt(amount) + processingFee) : 0;

  // Fee summary items
  const feeItems = [
    {
      label: 'Amount',
      value: amount ? parseInt(amount) : 0
    },
    {
      label: 'Processing Fee',
      value: processingFee,
      showInfoButton: true,
      onInfoPress: () => console.log('Show fee info')
    }
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ModalHeader title='Deposit'/>
        <ScrollView style={styles.container}>
          {/* Current Balance - Using reusable BalanceDisplay component */}
          <SectionContainer variant="highlight">
            <BalanceDisplay
              balance={currentBalance}
              percentageChange={2.4}
              currencySymbol="₦"
            />
          </SectionContainer>

          {/* Amount Input - Using reusable component */}
          <SectionContainer title="Deposit Amount">
            <AmountInput
              value={amount}
              onChangeAmount={setAmount}
              currencySymbol="₦"
              quickAmounts={['5000', '10000', '20000', '50000']}
              autoFocus={true}
            />
          </SectionContainer>

          {/* Payment Method - Using reusable component */}
          <SectionContainer title="Payment Method">
            <PaymentMethodSelector
              paymentMethods={paymentMethods}
              selectedPaymentMethodId={selectedPaymentMethod}
              onSelectPaymentMethod={setSelectedPaymentMethod}
            />
          </SectionContainer>

          {/* Fee Information - Using reusable component */}
          <FeeSummary
            title="Summary"
            items={feeItems}
            total={total}
            currencySymbol="₦"
            containerStyle={styles.section}
          />

          {/* Deposit button - Using reusable AnimatedButton component */}
          <View style={styles.buttonContainer}>
            <AnimatedButton 
              onPress={handleDeposit}
              disabled={!amount}
            >
              Proceed to Payment
            </AnimatedButton>
            
            {/* Disclaimer - Using reusable DisclaimerText component */}
            <DisclaimerText
              text="By proceeding, you agree to our terms and conditions"
              links={[
                {
                  text: "terms and conditions",
                  onPress: () => console.log('Navigate to terms')
                }
              ]}
              containerStyle={{ marginTop: 12 }}
            />
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
  buttonContainer: {
    marginTop: 16,
    marginBottom: 32,
  }
});