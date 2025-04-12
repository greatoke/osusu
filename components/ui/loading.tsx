import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function Loading() {
  const colorScheme = useColorScheme();
  const primaryColor = Colors[colorScheme ?? 'light'].tint;
  
  // Animation values
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Scale animation
  scale.value = withRepeat(
    withTiming(1.2, {
      duration: 800,
      easing: Easing.inOut(Easing.ease),
    }),
    -1,
    true
  );

  // Rotation animation
  rotate.value = withRepeat(
    withTiming(360, {
      duration: 1200,
      easing: Easing.linear,
    }),
    -1
  );

  // Fade animation
  opacity.value = withRepeat(
    withTiming(0.8, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    }),
    -1,
    true
  );

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loader, animatedStyle, { borderColor: primaryColor }]}>
        <View style={[styles.innerCircle, { backgroundColor: primaryColor }]} />
      </Animated.View>
      <ThemedText type="defaultSemiBold" style={styles.text}>
        Loading your financial data...
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loader: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
  },
});
