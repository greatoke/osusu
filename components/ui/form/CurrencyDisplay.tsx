import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface CurrencyDisplayProps {
  /**
   * Amount to display
   */
  amount: number | string;
  /**
   * Currency symbol to display
   */
  currencySymbol?: string;
  /**
   * Text type from ThemedText
   */
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  /**
   * Additional styles for the text
   */
  style?: object;
  /**
   * Whether to show a positive/negative indicator
   */
  showIndicator?: boolean;
  /**
   * Whether the amount is positive (for indicator)
   */
  isPositive?: boolean;
}

/**
 * A reusable component for displaying currency values
 */
export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  amount,
  currencySymbol = '₦',
  type = 'default',
  style,
  showIndicator = false,
  isPositive = true,
}) => {
  // Convert amount to number if it's a string
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Format the amount
  const formattedAmount = typeof numericAmount === 'number' 
    ? numericAmount.toLocaleString() 
    : '0';
  
  // Determine indicator
  const indicator = showIndicator ? (isPositive ? '+' : '-') : '';
  
  return (
    <ThemedText type={type} style={[styles.text, style]}>
      {indicator}{currencySymbol}{formattedAmount}
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingVertical:10
  },
});