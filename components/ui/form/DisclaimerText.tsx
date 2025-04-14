import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

interface LinkSection {
  /**
   * Text to display as a link
   */
  text: string;
  /**
   * Callback when link is pressed
   */
  onPress?: () => void;
}

interface DisclaimerTextProps {
  /**
   * Main text content
   */
  text: string;
  /**
   * Optional link sections within the text
   */
  links?: LinkSection[];
  /**
   * Custom styles for the container
   */
  containerStyle?: object;
  /**
   * Custom styles for the text
   */
  textStyle?: object;
  /**
   * Custom styles for the link text
   */
  linkStyle?: object;
}

/**
 * A reusable component for displaying disclaimer text with optional links
 */
export const DisclaimerText: React.FC<DisclaimerTextProps> = ({
  text,
  links = [],
  containerStyle,
  textStyle,
  linkStyle,
}) => {
  // If no links, just render the text
  if (links.length === 0) {
    return (
      <View style={[styles.container, containerStyle]}>
        <ThemedText style={[styles.text, textStyle]}>{text}</ThemedText>
      </View>
    );
  }

  // Split the text by the link texts to create segments
  let segments: React.ReactNode[] = [];
  let remainingText = text;

  links.forEach((link, index) => {
    const linkIndex = remainingText.indexOf(link.text);
    
    if (linkIndex !== -1) {
      // Add text before the link
      if (linkIndex > 0) {
        segments.push(
          <ThemedText key={`text-${index}`} style={[styles.text, textStyle]}>
            {remainingText.substring(0, linkIndex)}
          </ThemedText>
        );
      }
      
      // Add the link
      segments.push(
        <TouchableOpacity key={`link-${index}`} onPress={link.onPress} disabled={!link.onPress}>
          <ThemedText style={[styles.linkText, linkStyle]}>{link.text}</ThemedText>
        </TouchableOpacity>
      );
      
      // Update remaining text
      remainingText = remainingText.substring(linkIndex + link.text.length);
    }
  });
  
  // Add any remaining text
  if (remainingText) {
    segments.push(
      <ThemedText key="text-last" style={[styles.text, textStyle]}>
        {remainingText}
      </ThemedText>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.textContainer}>
        {segments}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.6,
  },
  linkText: {
    color: '#4A6FA5',
    textDecorationLine: 'underline',
    fontSize: 12,
  },
});