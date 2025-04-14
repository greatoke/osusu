import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

type Transaction = {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
};

export default function HistoryScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  
  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'deposit',
      amount: 5000,
      date: 'Today, 10:30 AM',
      description: 'Daily Contribution',
      status: 'completed',
    },
    {
      id: '2',
      type: 'deposit',
      amount: 5000,
      date: 'Yesterday, 10:30 AM',
      description: 'Daily Contribution',
      status: 'completed',
    },
    {
      id: '3',
      type: 'withdrawal',
      amount: 20000,
      date: 'Jul 15, 2023',
      description: 'Withdrawal to GTBank',
      status: 'completed',
    },
    {
      id: '4',
      type: 'deposit',
      amount: 5000,
      date: 'Jul 14, 2023',
      description: 'Daily Contribution',
      status: 'completed',
    },
    {
      id: '5',
      type: 'deposit',
      amount: 5000,
      date: 'Jul 13, 2023',
      description: 'Daily Contribution',
      status: 'completed',
    },
    {
      id: '6',
      type: 'deposit',
      amount: 5000,
      date: 'Jul 12, 2023',
      description: 'Daily Contribution',
      status: 'failed',
    },
  ];

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const isDeposit = item.type === 'deposit';
    const statusColor = 
      item.status === 'completed' ? '#3AAA75' :
      item.status === 'pending' ? '#F2B84B' : '#E74C3C';

    return (
      <TouchableOpacity style={styles.transactionItem}>
        <View style={[styles.iconContainer, { backgroundColor: isDeposit ? '#E6F7EF' : '#FFF4E6' }]}>
          <IconSymbol 
            name={isDeposit ? 'arrow.down.circle.fill' : 'arrow.up.circle.fill'} 
            size={24} 
            color={isDeposit ? '#3AAA75' : '#F2B84B'} 
          />
        </View>
        
        <View style={styles.transactionDetails}>
          <ThemedText type="defaultSemiBold">{item.description}</ThemedText>
          <ThemedText style={styles.transactionDate}>{item.date}</ThemedText>
        </View>
        
        <View style={styles.transactionAmount}>
          <ThemedText type="defaultSemiBold" style={{ color: isDeposit ? '#3AAA75' : '#F2B84B' }}>
            {isDeposit ? '+' : '-'}₦{item.amount.toLocaleString()}
          </ThemedText>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <ThemedText style={styles.statusText}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Transaction History',
        headerBackTitle: 'Back',
      }} />
      <View style={styles.container}>
        {/* Summary */}
        <ThemedView style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Total Deposits</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.depositAmount}>₦25,000</ThemedText>
          </View>
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.summaryItem}>
            <ThemedText style={styles.summaryLabel}>Total Withdrawals</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.withdrawalAmount}>₦20,000</ThemedText>
          </View>
        </ThemedView>

        {/* Filter options would go here */}
        <View style={styles.filterContainer}>
          <ThemedText type="subtitle">Recent Transactions</ThemedText>
          <TouchableOpacity style={styles.filterButton}>
            <IconSymbol name="line.3.horizontal.decrease.circle" size={20} color={primaryColor} />
            <ThemedText style={[styles.filterText, { color: primaryColor }]}>Filter</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Transactions list */}
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.transactionsList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  depositAmount: {
    color: '#3AAA75',
  },
  withdrawalAmount: {
    color: '#F2B84B',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterText: {
    marginLeft: 4,
  },
  transactionsList: {
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 12,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});