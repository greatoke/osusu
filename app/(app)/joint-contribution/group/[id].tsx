import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function GroupOverviewScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // Mock data for the group
  const group = {
    id: id,
    name: 'Family Savings',
    totalAmount: 250000,
    cycleAmount: 5000,
    members: [
      { id: '1', name: 'You', position: 1, status: 'paid' },
      { id: '2', name: 'John Doe', position: 2, status: 'paid' },
      { id: '3', name: 'Jane Smith', position: 3, status: 'pending' },
      { id: '4', name: 'Mike Johnson', position: 4, status: 'pending' },
      { id: '5', name: 'Sarah Williams', position: 5, status: 'unpaid' },
    ],
    currentPosition: 1,
    nextPaymentDate: 'July 28, 2023',
    inviteCode: 'ABC123',
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: group.name,
        headerBackTitle: 'Groups',
      }} />
      <ScrollView style={styles.container}>
        {/* Group Summary */}
        <ThemedView style={styles.section}>
          <View style={styles.groupHeader}>
            <ThemedText type="subtitle">{group.name}</ThemedText>
            <View style={styles.inviteCodeContainer}>
              <ThemedText style={styles.inviteCodeLabel}>Invite Code</ThemedText>
              <ThemedText type="defaultSemiBold">{group.inviteCode}</ThemedText>
            </View>
          </View>
          
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryLabel}>Total Amount</ThemedText>
              <ThemedText type="defaultSemiBold">₦{group.totalAmount.toLocaleString()}</ThemedText>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryLabel}>Per Cycle</ThemedText>
              <ThemedText type="defaultSemiBold">₦{group.cycleAmount.toLocaleString()}</ThemedText>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryItem}>
              <ThemedText style={styles.summaryLabel}>Members</ThemedText>
              <ThemedText type="defaultSemiBold">{group.members.length}</ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Current Position */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Current Position</ThemedText>
          
          <View style={styles.positionContainer}>
            <View style={styles.positionIndicator}>
              <ThemedText type="title" style={styles.positionNumber}>{group.currentPosition}</ThemedText>
              <ThemedText style={styles.positionLabel}>Current</ThemedText>
            </View>
            
            <View style={styles.nextPaymentContainer}>
              <ThemedText style={styles.nextPaymentLabel}>Next Payment Date</ThemedText>
              <ThemedText type="defaultSemiBold">{group.nextPaymentDate}</ThemedText>
              <TouchableOpacity style={styles.contributeButton}>
                <ThemedText style={{ color: primaryColor }}>Make Contribution</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ThemedView>

        {/* Members */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Members</ThemedText>
            <TouchableOpacity>
              <ThemedText style={{ color: primaryColor }}>Invite</ThemedText>
            </TouchableOpacity>
          </View>
          
          {group.members.map((member) => (
            <View key={member.id} style={styles.memberItem}>
              <View style={styles.memberInfo}>
                <View style={styles.memberPosition}>
                  <ThemedText style={styles.memberPositionText}>{member.position}</ThemedText>
                </View>
                <ThemedText type="defaultSemiBold">{member.name}</ThemedText>
                {member.id === '1' && <ThemedText style={styles.youLabel}>(You)</ThemedText>}
              </View>
              
              <View style={[
                styles.statusBadge, 
                member.status === 'paid' ? styles.paidStatus : 
                member.status === 'pending' ? styles.pendingStatus : 
                styles.unpaidStatus
              ]}>
                <ThemedText style={styles.statusText}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </ThemedText>
              </View>
            </View>
          ))}
        </ThemedView>

        {/* Group Rules */}
        <ThemedView style={[styles.section, styles.rulesContainer]}>
          <View style={styles.rulesHeader}>
            <IconSymbol name="doc.text.fill" size={24} color="#4A6FA5" />
            <ThemedText type="subtitle" style={styles.rulesTitle}>Group Rules</ThemedText>
          </View>
          
          <View style={styles.ruleItem}>
            <IconSymbol name="checkmark.circle.fill" size={16} color="#3AAA75" />
            <ThemedText style={styles.ruleText}>
              All members must contribute ₦{group.cycleAmount.toLocaleString()} per cycle
            </ThemedText>
          </View>
          
          <View style={styles.ruleItem}>
            <IconSymbol name="checkmark.circle.fill" size={16} color="#3AAA75" />
            <ThemedText style={styles.ruleText}>
              Payments are due 3 days before the cycle end date
            </ThemedText>
          </View>
          
          <View style={styles.ruleItem}>
            <IconSymbol name="checkmark.circle.fill" size={16} color="#3AAA75" />
            <ThemedText style={styles.ruleText}>
              Position order was determined when the group was created
            </ThemedText>
          </View>
          
          <View style={styles.ruleItem}>
            <IconSymbol name="checkmark.circle.fill" size={16} color="#3AAA75" />
            <ThemedText style={styles.ruleText}>
              Members who fail to contribute may be removed from the group
            </ThemedText>
          </View>
        </ThemedView>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <ThemedButton variant="outline" style={styles.actionButton}>
            View Payment History
          </ThemedButton>
          
          <ThemedButton variant="outline" style={[styles.actionButton, styles.leaveButton]}>
            Leave Group
          </ThemedButton>
        </View>
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
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  inviteCodeContainer: {
    alignItems: 'flex-end',
  },
  inviteCodeLabel: {
    fontSize: 12,
    color: '#666',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  positionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
  },
  positionIndicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#31A062',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  positionNumber: {
    color: '#FFFFFF',
    fontSize: 32,
  },
  positionLabel: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  nextPaymentContainer: {
    flex: 1,
  },
  nextPaymentLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  contributeButton: {
    marginTop: 8,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  memberInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberPosition: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  memberPositionText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  youLabel: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paidStatus: {
    backgroundColor: '#E6F7EF',
  },
  pendingStatus: {
    backgroundColor: '#FFF4E6',
  },
  unpaidStatus: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  rulesContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
  },
  rulesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rulesTitle: {
    marginLeft: 8,
    color: '#4A6FA5',
    marginBottom: 0,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ruleText: {
    marginLeft: 8,
    color: '#4A6FA5',
    flex: 1,
  },
  actionButtonsContainer: {
    marginBottom: 32,
  },
  actionButton: {
    marginBottom: 8,
  },
  leaveButton: {
    borderColor: '#E74C3C',
  },
});