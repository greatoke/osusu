import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface FeeItem {
  /**
   * Label for the fee item
   */
  label: string;
  /**
   * Value of the fee item
   */
  value: string | number;
  /**
   * Whether to show an info button
   */
  showInfoButton?: boolean;
  /**
   * Callback when info button is pressed
   */
  onInfoPress?: () => void;
}

interface FeeSummaryProps {
  /**
   * Title for the summary section
   */
  title?: string;
  /**
   * Array of fee items to display
   */
  items: FeeItem[];
  /**
   * Total amount to display
   */
  total: string | number;
  /**
   * Currency symbol to display
   */
  currencySymbol?: string;
  /**
   * Custom styles for the container
   */
  containerStyle?: object;
}

/**
 * A reusable component for displaying transaction fee summaries
 */
export const FeeSummary: React.FC<FeeSummaryProps> = ({
  title = 'Summary',
  items,
  total,
  currencySymbol = '₦',
  containerStyle,
}) => {
  const formatValue = (value: string | number): string => {
    if (typeof value === 'number') {
      return `${currencySymbol}${value.toLocaleString()}`;
    }
    return value.startsWith(currencySymbol) ? value : `${currencySymbol}${value}`;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <ThemedText type="subtitle" style={styles.title}>{title}</ThemedText>
      </View>
      
      {items.map((item, index) => (
        <View key={index} style={styles.feeItem}>
          {item.showInfoButton ? (
            <View style={styles.feeItemWithInfo}>
              <ThemedText>{item.label}</ThemedText>
              <TouchableOpacity 
                style={styles.infoButton}
                onPress={item.onInfoPress}
              >
                <IconSymbol name="info.circle" size={14} color="#999" />
              </TouchableOpacity>
            </View>
          ) : (
            <ThemedText>{item.label}</ThemedText>
          )}
          <ThemedText type="defaultSemiBold">
            {formatValue(item.value)}
          </ThemedText>
        </View>
      ))}
      
      <View style={styles.divider} />
      
      <View style={styles.feeItem}>
        <ThemedText type="defaultSemiBold">Total</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.totalAmount}>
          {formatValue(total)}
        </ThemedText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
  },
  header: {
    marginBottom: 8,
  },
  title: {
    textAlign: 'left',
    marginBottom: 8,
  },
  feeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  feeItemWithInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoButton: {
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  totalAmount: {
    color: '#4A6FA5',
    fontSize: 16,
  },
});