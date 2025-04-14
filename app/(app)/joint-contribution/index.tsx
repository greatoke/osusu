import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function JointContributionScreen() {
  const primaryColor = useThemeColor({}, 'tint');

  // Mock data for active groups
  const activeGroups = [
    {
      id: '1',
      name: 'Family Savings',
      members: 5,
      totalAmount: 250000,
      nextContribution: '2 days',
    },
    {
      id: '2',
      name: 'Friends Group',
      members: 8,
      totalAmount: 400000,
      nextContribution: 'Tomorrow',
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Joint Contributions',
        headerBackTitle: 'Home',
      }} />
      <ScrollView style={styles.container}>
        {/* Create or Join Group */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Create or Join a Group</ThemedText>
          
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/joint-contribution/create')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#3AAA75' }]}>
                <IconSymbol name="plus" size={24} color="#fff" />
              </View>
              <ThemedText style={styles.actionText}>Create Group</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => router.push('/joint-contribution/join')}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#F2B84B' }]}>
                <IconSymbol name="person.badge.plus" size={24} color="#fff" />
              </View>
              <ThemedText style={styles.actionText}>Join Group</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Active Groups */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Your Active Groups</ThemedText>
          
          {activeGroups.length > 0 ? (
            activeGroups.map((group) => (
              <TouchableOpacity 
                key={group.id}
                style={styles.groupCard}
                onPress={() => router.push(`/joint-contribution/group/${group.id}`)}
              >
                <View style={styles.groupHeader}>
                  <ThemedText type="defaultSemiBold">{group.name}</ThemedText>
                  <View style={styles.membersBadge}>
                    <IconSymbol name="person.2.fill" size={12} color="#666" />
                    <ThemedText style={styles.membersText}>{group.members}</ThemedText>
                  </View>
                </View>
                
                <View style={styles.groupDetails}>
                  <View>
                    <ThemedText style={styles.detailLabel}>Total Amount</ThemedText>
                    <ThemedText type="defaultSemiBold">₦{group.totalAmount.toLocaleString()}</ThemedText>
                  </View>
                  
                  <View style={{ alignItems: 'flex-end' }}>
                    <ThemedText style={styles.detailLabel}>Next Contribution</ThemedText>
                    <ThemedText type="defaultSemiBold">{group.nextContribution}</ThemedText>
                  </View>
                </View>
                
                <View style={styles.groupActions}>
                  <TouchableOpacity style={styles.groupActionButton}>
                    <IconSymbol name="arrow.up.circle" size={16} color={primaryColor} />
                    <ThemedText style={[styles.groupActionText, { color: primaryColor }]}>Contribute</ThemedText>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.groupActionButton}>
                    <IconSymbol name="person.3" size={16} color={primaryColor} />
                    <ThemedText style={[styles.groupActionText, { color: primaryColor }]}>Members</ThemedText>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyStateContainer}>
              <IconSymbol name="person.3.sequence" size={48} color="#CCCCCC" />
              <ThemedText style={styles.emptyStateText}>You haven't joined any groups yet</ThemedText>
              <ThemedButton 
                variant="outline"
                onPress={() => router.push('/joint-contribution/join')}
                style={styles.emptyStateButton}
              >
                Join a Group
              </ThemedButton>
            </View>
          )}
        </ThemedView>

        {/* How it Works */}
        <ThemedView style={[styles.section, styles.infoContainer]}>
          <View style={styles.infoHeader}>
            <IconSymbol name="info.circle.fill" size={24} color="#4A6FA5" />
            <ThemedText type="subtitle" style={styles.infoTitle}>How Joint Contributions Work</ThemedText>
          </View>
          
          <View style={styles.infoStep}>
            <View style={styles.infoStepNumber}>
              <ThemedText style={styles.stepNumberText}>1</ThemedText>
            </View>
            <ThemedText style={styles.infoStepText}>
              Create a group or join an existing one with an invite code
            </ThemedText>
          </View>
          
          <View style={styles.infoStep}>
            <View style={styles.infoStepNumber}>
              <ThemedText style={styles.stepNumberText}>2</ThemedText>
            </View>
            <ThemedText style={styles.infoStepText}>
              Each member contributes an agreed amount on a regular schedule
            </ThemedText>
          </View>
          
          <View style={styles.infoStep}>
            <View style={styles.infoStepNumber}>
              <ThemedText style={styles.stepNumberText}>3</ThemedText>
            </View>
            <ThemedText style={styles.infoStepText}>
              Members take turns receiving the full contribution amount
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
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
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
  groupCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  membersBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  membersText: {
    fontSize: 12,
    marginLeft: 4,
  },
  groupDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  groupActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
  },
  groupActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  groupActionText: {
    fontSize: 14,
    marginLeft: 4,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyStateText: {
    color: '#666',
    marginVertical: 16,
  },
  emptyStateButton: {
    width: 'auto',
    paddingHorizontal: 24,
  },
  infoContainer: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    marginLeft: 8,
    color: '#4A6FA5',
    marginBottom: 0,
  },
  infoStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoStepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4A6FA5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoStepText: {
    flex: 1,
    color: '#4A6FA5',
  },
});