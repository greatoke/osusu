import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

interface SectionContainerProps {
  /**
   * Optional title for the section
   */
  title?: string;
  /**
   * Content to display in the section
   */
  children: React.ReactNode;
  /**
   * Custom styles for the container
   */
  containerStyle?: ViewStyle;
  /**
   * Custom styles for the title
   */
  titleStyle?: object;
  /**
   * Whether to use a different background color for the section
   */
  variant?: 'default' | 'highlight';
}

/**
 * A reusable component for creating consistent section containers throughout the app
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  children,
  containerStyle,
  titleStyle,
  variant = 'default',
}) => {
  return (
    <ThemedView 
      style={[
        styles.container, 
        variant === 'highlight' && styles.highlightContainer,
        containerStyle
      ]}
    >
      {title && (
        <ThemedText type="subtitle" style={[styles.title, titleStyle]}>
          {title}
        </ThemedText>
      )}
      {children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  highlightContainer: {
    backgroundColor: '#f8fbff',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.8,
  },
});