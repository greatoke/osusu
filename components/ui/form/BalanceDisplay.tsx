import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { CurrencyDisplay } from './CurrencyDisplay';

interface BalanceDisplayProps {
  /**
   * The balance amount to display
   */
  balance: number;
  /**
   * Currency symbol to display
   */
  currencySymbol?: string;
  /**
   * Optional percentage change to display
   */
  percentageChange?: number;
  /**
   * Title for the balance section
   */
  title?: string;
  /**
   * Custom styles for the container
   */
  containerStyle?: object;
  /**
   * Custom styles for the balance text
   */
  balanceTextStyle?: object;
}

/**
 * A reusable component for displaying account balances with optional change indicators
 */
export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  balance,
  currencySymbol = '₦',
  percentageChange,
  title = 'Current Balance',
  containerStyle,
  balanceTextStyle,
}) => {
  // Determine if the percentage change is positive
  const isPositive = percentageChange ? percentageChange > 0 : true;
  
  // Format the percentage change with a + or - sign
  const formattedPercentage = percentageChange 
    ? `${isPositive ? '+' : ''}${percentageChange.toFixed(1)}%` 
    : null;
  
  // Determine the color for the percentage change
  const changeColor = isPositive ? '#3AAA75' : '#E74C3C';
  
  // Determine the icon name based on direction
  const iconName = isPositive ? 'arrow.up.right' : 'arrow.down.right';

  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <ThemedText type="subtitle" style={styles.title}>
          {title}
        </ThemedText>
      )}
      
      <View style={styles.balanceContainer}>
        <CurrencyDisplay
          amount={balance}
          currencySymbol={currencySymbol}
          type="title"
          style={[styles.balanceText, balanceTextStyle]}
        />
        
        {percentageChange !== undefined && (
          <View style={[styles.changeIndicator, { backgroundColor: `${changeColor}20` }]}>
            <IconSymbol name={iconName} size={12} color={changeColor} />
            <ThemedText style={[styles.changeText, { color: changeColor }]}>
              {formattedPercentage}
            </ThemedText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8,
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});