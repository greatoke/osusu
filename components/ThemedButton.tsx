import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/button';

type ThemedButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "link";
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  href?: string;
};

export function ThemedButton({ 
  children, 
  variant = 'default', 
  style, 
  onPress, 
  href 
}: ThemedButtonProps) {
  // If href is provided, use Link component
  if (href) {
    return (
      <Link href={href} asChild>
        <Button variant={variant} style={style}>
          {children}
        </Button>
      </Link>
    );
  }

  // Otherwise use regular button
  return (
    <Button 
      variant={variant} 
      style={style} 
      onPress={onPress}
    >
      {children}
    </Button>
  );
}