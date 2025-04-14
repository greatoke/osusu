import React, { useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { ThemedButton } from '@/components/ThemedButton';

interface AnimatedButtonProps {
  /**
   * Button press handler
   */
  onPress: () => void;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Custom styles for the button
   */
  style?: ViewStyle;
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Animation scale factor (how much the button shrinks when pressed)
   */
  pressScaleFactor?: number;
  /**
   * Animation duration in milliseconds
   */
  animationDuration?: number;
}

/**
 * A reusable animated button component that scales when pressed
 */
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPress,
  disabled = false,
  style,
  children,
  pressScaleFactor = 0.95,
  animationDuration = 100,
}) => {
  // Animation value
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePress = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: pressScaleFactor,
        duration: animationDuration,
        useNativeDriver: true
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true
      })
    ]).start();
    
    // Call the provided onPress handler
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <ThemedButton 
        onPress={handlePress}
        style={[disabled ? styles.disabledButton : undefined, style]}
        disabled={disabled}
      >
        {children}
      </ThemedButton>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.7,
  },
});