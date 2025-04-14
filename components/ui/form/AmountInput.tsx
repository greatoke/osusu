import React, { useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Animated } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface AmountInputProps {
  /**
   * Current amount value
   */
  value: string;
  /**
   * Callback when amount changes
   */
  onChangeAmount: (value: string) => void;
  /**
   * Currency symbol to display
   */
  currencySymbol?: string;
  /**
   * Quick amount options to display
   */
  quickAmounts?: string[];
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * Whether to auto focus the input
   */
  autoFocus?: boolean;
  /**
   * Custom styles for the container
   */
  containerStyle?: object;
}

/**
 * A reusable component for entering monetary amounts with quick selection options
 */
export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChangeAmount,
  currencySymbol = '₦',
  quickAmounts = ['5000', '10000', '20000', '50000'],
  placeholder = '0',
  autoFocus = false,
  containerStyle,
}) => {
  // Animation value
  const amountInputAnim = useRef(new Animated.Value(1)).current;

  const handleAmountPress = (amount: string) => {
    // Animate the input when selecting an amount
    Animated.sequence([
      Animated.timing(amountInputAnim, {
        toValue: 1.05,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(amountInputAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
    
    onChangeAmount(amount);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View 
        style={[styles.amountInputContainer, {
          transform: [{ scale: amountInputAnim }]
        }]}
      >
        <ThemedText type="title" style={styles.currencySymbol}>{currencySymbol}</ThemedText>
        <TextInput
          style={styles.amountInput}
          value={value}
          onChangeText={onChangeAmount}
          keyboardType="numeric"
          placeholder={placeholder}
          placeholderTextColor="#999"
          autoFocus={autoFocus}
        />
      </Animated.View>

      {/* Quick amount options */}
      <View style={styles.quickAmountsContainer}>
        {quickAmounts.map((quickAmount) => (
          <TouchableOpacity 
            key={quickAmount}
            style={[
              styles.quickAmountButton,
              value === quickAmount && styles.selectedAmountButton
            ]}
            onPress={() => handleAmountPress(quickAmount)}
          >
            <ThemedText 
              style={[
                styles.quickAmountText,
                value === quickAmount && { color: '#fff' }
              ]}
            >
              {currencySymbol}{parseInt(quickAmount).toLocaleString()}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
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
  quickAmountsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  quickAmountButton: {
    width: '48%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  selectedAmountButton: {
    backgroundColor: '#4A6FA5',
    borderColor: '#4A6FA5',
    shadowColor: '#4A6FA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  quickAmountText: {
    fontWeight: '600',
  },
});