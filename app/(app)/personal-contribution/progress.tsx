import { StyleSheet, View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SavingsProgressScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  
  // Mock data for the progress chart
  const totalSaved = 325000;
  const targetAmount = 500000;
  const progressPercentage = (totalSaved / targetAmount) * 100;
  
  // Mock data for monthly breakdown
  const monthlyData = [
    { month: 'January', amount: 75000 },
    { month: 'February', amount: 150000 },
    { month: 'March', amount: 100000 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Savings Progress',
        headerBackTitle: 'Back',
      }} />
      <ScrollView style={styles.container}>
        {/* Progress Overview */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Progress Overview</ThemedText>
          
          <View style={styles.progressCircleContainer}>
            <View style={styles.progressCircle}>
              <ThemedText type="title" style={styles.progressPercentage}>
                {Math.round(progressPercentage)}%
              </ThemedText>
              <ThemedText style={styles.progressLabel}>Completed</ThemedText>
            </View>
          </View>
          
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Total Saved</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.statValue}>
                ₦{totalSaved.toLocaleString()}
              </ThemedText>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <ThemedText style={styles.statLabel}>Target</ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.statValue}>
                ₦{targetAmount.toLocaleString()}
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Savings Breakdown */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Monthly Breakdown</ThemedText>
          
          {monthlyData.map((item, index) => (
            <View key={index} style={styles.monthlyItem}>
              <ThemedText>{item.month}</ThemedText>
              <ThemedText type="defaultSemiBold">₦{item.amount.toLocaleString()}</ThemedText>
            </View>
          ))}
        </ThemedView>

        {/* Projected Completion */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Projected Completion</ThemedText>
          
          <View style={styles.projectionContainer}>
            <View style={styles.projectionItem}>
              <IconSymbol name="calendar" size={24} color={primaryColor} />
              <View style={styles.projectionContent}>
                <ThemedText style={styles.projectionLabel}>Estimated Date</ThemedText>
                <ThemedText type="defaultSemiBold">August 15, 2023</ThemedText>
              </View>
            </View>
            
            <View style={styles.projectionItem}>
              <IconSymbol name="clock" size={24} color={primaryColor} />
              <View style={styles.projectionContent}>
                <ThemedText style={styles.projectionLabel}>Time Remaining</ThemedText>
                <ThemedText type="defaultSemiBold">35 days</ThemedText>
              </View>
            </View>
          </View>
        </ThemedView>

        {/* Savings Tips */}
        <ThemedView style={[styles.section, styles.tipContainer]}>
          <IconSymbol name="lightbulb.fill" size={24} color="#F2B84B" />
          <View style={styles.tipContent}>
            <ThemedText type="defaultSemiBold">Savings Tip</ThemedText>
            <ThemedText style={styles.tipText}>
              Increasing your daily contribution by just ₦500 could help you reach your goal 7 days earlier!
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
  progressCircleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 12,
    borderColor: '#31A062',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  progressLabel: {
    fontSize: 16,
    color: '#666',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  monthlyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  projectionContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
  },
  projectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  projectionContent: {
    marginLeft: 12,
  },
  projectionLabel: {
    fontSize: 14,
    color: '#666',
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