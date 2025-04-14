import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export interface PaymentMethod {
  /**
   * Unique identifier for the payment method
   */
  id: string;
  /**
   * Display name for the payment method
   */
  name: string;
  /**
   * Description of the payment method
   */
  description: string;
  /**
   * Icon name from IconSymbol component
   */
  iconName: string;
}

interface PaymentMethodSelectorProps {
  /**
   * Available payment methods
   */
  paymentMethods: PaymentMethod[];
  /**
   * Currently selected payment method ID
   */
  selectedPaymentMethodId: string;
  /**
   * Callback when payment method changes
   */
  onSelectPaymentMethod: (id: string) => void;
  /**
   * Custom styles for the container
   */
  containerStyle?: object;
}

/**
 * A reusable component for selecting payment methods
 */
export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethods,
  selectedPaymentMethodId,
  onSelectPaymentMethod,
  containerStyle,
}) => {
  const primaryColor = useThemeColor({}, 'tint');

  return (
    <View style={[styles.container, containerStyle]}>
      {paymentMethods.map((method) => (
        <TouchableOpacity 
          key={method.id}
          style={[
            styles.paymentMethodCard, 
            selectedPaymentMethodId === method.id && styles.selectedPaymentMethod
          ]}
          onPress={() => onSelectPaymentMethod(method.id)}
          activeOpacity={0.7}
        >
          <View style={[
            styles.paymentMethodIcon, 
            selectedPaymentMethodId === method.id && styles.selectedPaymentIcon
          ]}>
            <IconSymbol 
              name={method.iconName} 
              size={24} 
              color={selectedPaymentMethodId === method.id ? primaryColor : '#4A6FA5'} 
            />
          </View>
          <View style={styles.paymentMethodDetails}>
            <ThemedText type="defaultSemiBold">{method.name}</ThemedText>
            <ThemedText style={styles.paymentMethodDescription}>{method.description}</ThemedText>
          </View>
          <View style={styles.radioButton}>
            {selectedPaymentMethodId === method.id && <View style={styles.radioButtonInner} />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedPaymentMethod: {
    borderColor: '#4A6FA5',
    backgroundColor: 'rgba(74, 111, 165, 0.05)',
    shadowColor: '#4A6FA5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  selectedPaymentIcon: {
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodDescription: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4A6FA5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A6FA5',
  },
});