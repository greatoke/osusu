import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function PersonalContributionScreen() {
  const primaryColor = useThemeColor({}, 'tint');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Personal Contribution',
        headerBackTitle: 'Home',
      }} />
      <ScrollView style={styles.container}>
        {/* Daily Savings Amount */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Daily Savings Amount</ThemedText>
          <View style={styles.amountContainer}>
            <ThemedText type="title" style={styles.amount}>₦5,000</ThemedText>
            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => router.push('/personal-contribution/set-amount')}
            >
              <IconSymbol name="pencil" size={16} color={primaryColor} />
              <ThemedText style={styles.editText}>Edit</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Progress */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Progress</ThemedText>
            <TouchableOpacity onPress={() => router.push('/personal-contribution/progress')}>
              <ThemedText style={{ color: primaryColor }}>View Details</ThemedText>
            </TouchableOpacity>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%', backgroundColor: primaryColor }]} />
            </View>
            <View style={styles.progressStats}>
              <View>
                <ThemedText style={styles.progressLabel}>Current</ThemedText>
                <ThemedText type="defaultSemiBold">₦325,000</ThemedText>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <ThemedText style={styles.progressLabel}>Target</ThemedText>
                <ThemedText type="defaultSemiBold">₦500,000</ThemedText>
              </View>
            </View>
          </View>
        </ThemedView>

        {/* Quick Actions */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/personal-contribution/withdraw')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#F2B84B' }]}>
                <IconSymbol name="arrow.down" size={24} color="#fff" />
              </View>
              <ThemedText style={styles.actionText}>Withdraw</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/personal-contribution/history')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#3AAA75' }]}>
                <IconSymbol name="clock" size={24} color="#fff" />
              </View>
              <ThemedText style={styles.actionText}>History</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Tips */}
        <ThemedView style={[styles.section, styles.tipContainer]}>
          <IconSymbol name="lightbulb.fill" size={24} color="#F2B84B" />
          <View style={styles.tipContent}>
            <ThemedText type="defaultSemiBold">Savings Tip</ThemedText>
            <ThemedText style={styles.tipText}>
              Consistency is key! Small daily contributions add up to significant savings over time.
            </ThemedText>
          </View>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 36,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  editText: {
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 16,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFAED',
    padding: 16,
    borderRadius: 12,
  },
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});