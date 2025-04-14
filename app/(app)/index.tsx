import { StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAuth } from '@/hooks/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';

export default function HomeScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  const { user } = useAuth();

  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <ThemedText type="title" style={styles.welcomeText}>Welcome, {user?.name || 'User'}</ThemedText>
          <ThemedText style={styles.subtitle}>Your financial journey starts here</ThemedText>
        </View>
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => router.push('/(modals)/notifications')}
        >
          <IconSymbol name="bell.fill" size={24} color={primaryColor} />
        </TouchableOpacity>
      </View>

      {/* Wallet / Balance Summary */}
      <ThemedView style={styles.walletCard}>
        <View style={styles.walletHeader}>
          <ThemedText type="subtitle">Wallet Balance</ThemedText>
          <TouchableOpacity onPress={() => router.push('/(modals)/deposit')}>
            <ThemedText style={{ color: primaryColor }}>Add Funds</ThemedText>
          </TouchableOpacity>
        </View>
        <ThemedText type="title" style={styles.balanceAmount}>₦125,000</ThemedText>
        <View style={styles.walletActions}>
          <TouchableOpacity style={styles.walletActionButton}>
            <IconSymbol name="arrow.down" size={16} color={primaryColor} />
            <ThemedText style={styles.walletActionText}>Withdraw</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.walletActionButton}>
            <IconSymbol name="arrow.up" size={16} color={primaryColor} />
            <ThemedText style={styles.walletActionText}>Transfer</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.walletActionButton}>
            <IconSymbol name="clock" size={16} color={primaryColor} />
            <ThemedText style={styles.walletActionText}>History</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>

      {/* CTA Buttons */}
      <View style={styles.ctaContainer}>
        <ThemedButton 
          variant="default" 
          style={styles.ctaButton}
          onPress={() => router.push('/personal-contribution')}
        >
          Start Saving
        </ThemedButton>
        
        <ThemedButton 
          variant="secondary" 
          style={styles.ctaButton}
          onPress={() => router.push('/joint-contribution/join')}
        >
          Join Group
        </ThemedButton>
      </View>

      {/* Personal Contribution Overview */}
      <ThemedView style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Personal Contribution</ThemedText>
          <TouchableOpacity onPress={() => router.push('/personal-contribution')}>
            <ThemedText style={{ color: primaryColor }}>View Details</ThemedText>
          </TouchableOpacity>
        </View>
        
        <View style={styles.overviewCard}>
          <View style={styles.overviewRow}>
            <View>
              <ThemedText style={styles.overviewLabel}>Daily Amount</ThemedText>
              <ThemedText type="defaultSemiBold">₦5,000</ThemedText>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <ThemedText style={styles.overviewLabel}>Total Saved</ThemedText>
              <ThemedText type="defaultSemiBold">₦325,000</ThemedText>
            </View>
          </View>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%', backgroundColor: primaryColor }]} />
            </View>
            <View style={styles.progressStats}>
              <ThemedText style={styles.progressText}>65% of ₦500,000 target</ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>

      {/* Joint Contributions Overview */}
      <ThemedView style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Joint Contributions</ThemedText>
          <TouchableOpacity onPress={() => router.push('/joint-contribution')}>
            <ThemedText style={{ color: primaryColor }}>View All</ThemedText>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.groupCard}
          onPress={() => router.push('/joint-contribution/group/1')}
        >
          <View style={styles.groupHeader}>
            <ThemedText type="defaultSemiBold">Family Savings</ThemedText>
            <View style={styles.membersBadge}>
              <IconSymbol name="person.2.fill" size={12} color="#666" />
              <ThemedText style={styles.membersText}>5</ThemedText>
            </View>
          </View>
          
          <View style={styles.groupDetails}>
            <View>
              <ThemedText style={styles.detailLabel}>Total Amount</ThemedText>
              <ThemedText type="defaultSemiBold">₦250,000</ThemedText>
            </View>
            
            <View style={{ alignItems: 'flex-end' }}>
              <ThemedText style={styles.detailLabel}>Next Contribution</ThemedText>
              <ThemedText type="defaultSemiBold">2 days</ThemedText>
            </View>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.createGroupButton}
          onPress={() => router.push('/joint-contribution/create')}
        >
          <IconSymbol name="plus" size={16} color={primaryColor} />
          <ThemedText style={{ color: primaryColor, marginLeft: 8 }}>Create New Group</ThemedText>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  notificationButton: {
    padding: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 0,
  },
  walletCard: {
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceAmount: {
    marginBottom: 16,
  },
  walletActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  walletActionText: {
    marginLeft: 4,
    fontSize: 14,
  },
  ctaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  ctaButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  overviewCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  groupCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  createGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    borderStyle: 'dashed',
  },
});