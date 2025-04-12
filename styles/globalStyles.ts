import { Colors } from '@/constants/Colors';
import { Values } from '@/constants/values';
import { useThemeColor } from '@/hooks/useThemeColor';

export const globalStyles = {
  layout: {
    container: (theme: 'light' | 'dark') => ({
      flex: 1,
      backgroundColor: Colors[theme].background,
      padding: Values.spacing.md
    }),
    screenPadding: {
      paddingHorizontal: Values.spacing.md
    }
  },
  typography: {
    text: (colorName: keyof typeof Colors.light) => ({
      fontSize: Values.fontSize.md,
      color: useThemeColor({}, colorName)
    }),
    heading: (colorName: keyof typeof Colors.light) => ({
      fontSize: Values.fontSize.lg,
      fontWeight: '600' as const,
      color: useThemeColor({}, colorName),
      marginVertical: Values.spacing.sm
    })
  },
  shadows: {
    base: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2
    }
  },
  spacing: {
    vertical: (size: keyof typeof Values['spacing']) => ({
      marginVertical: Values.spacing[size]
    }),
    horizontal: (size: keyof typeof Values['spacing']) => ({
      marginHorizontal: Values.spacing[size]
    })
  }
};