import { StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  
  return (
    <ScrollView style={styles.container}>
      {/* Header with notification icon */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton}>
          <IconSymbol name="chevron.right" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Welcome message */}
      <ThemedText type="title" style={styles.welcomeText}>Welcome, Jessie.</ThemedText>

      {/* Asset Portfolio Card */}
      <ThemedView style={[styles.assetCard, { backgroundColor: '#3AAA75' }]}>
        <ThemedText style={styles.assetLabel}>Your total asset portfolio</ThemedText>
        <ThemedText style={styles.assetValue}>N203,935</ThemedText>
        <TouchableOpacity style={styles.investButton}>
          <ThemedText style={styles.investButtonText}>Invest now</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Best Plans Section */}
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle">Best Plans</ThemedText>
        <TouchableOpacity>
          <ThemedText style={styles.seeAllText}>See All →</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Investment Plans */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.plansScrollView}>
        <ThemedView style={[styles.planCard, { backgroundColor: '#F2B84B' }]}>
          <ThemedText style={styles.planTitle}>Gold</ThemedText>
          <ThemedText style={styles.planReturn}>30% return</ThemedText>
          <View style={styles.planIconContainer}>
            <ThemedText style={styles.planIconText}>$</ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={[styles.planCard, { backgroundColor: '#C0C0C0' }]}>
          <ThemedText style={styles.planTitle}>Silver</ThemedText>
          <ThemedText style={styles.planReturn}>60% return</ThemedText>
          <View style={styles.planIconContainer}>
            <ThemedText style={styles.planIconText}>€</ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={[styles.planCard, { backgroundColor: '#A67FE8' }]}>
          <ThemedText style={styles.planTitle}>Platinum</ThemedText>
          <ThemedText style={styles.planReturn}>90% return</ThemedText>
          <View style={styles.planIconContainer}>
            <ThemedText style={styles.planIconText}>£</ThemedText>
          </View>
        </ThemedView>
      </ScrollView>

      {/* Investment Guide Section */}
      <ThemedText type="subtitle" style={styles.guideTitle}>Investment Guide</ThemedText>

      {/* Guide Items */}
      <ThemedView style={styles.guideItem}>
        <View style={styles.guideContent}>
          <ThemedText type="defaultSemiBold">Basic type of investments</ThemedText>
          <ThemedText style={styles.guideDescription}>This is how you set your foot for 2020 Stock market recession. What's next...</ThemedText>
        </View>
        <View style={styles.guideImageContainer}>
          <View style={styles.guideImage} />
        </View>
      </ThemedView>

      <ThemedView style={styles.guideItem}>
        <View style={styles.guideContent}>
          <ThemedText type="defaultSemiBold">How much can you start with</ThemedText>
          <ThemedText style={styles.guideDescription}>What do you like to see? It's a very different market from 2018. The way...</ThemedText>
        </View>
        <View style={styles.guideImageContainer}>
          <View style={styles.guideImage} />
        </View>
      </ThemedView>
    </ScrollView>
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
    marginTop: 20,
    marginBottom: 10,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 2,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  notificationButton: {
    padding: 8,
  },
  welcomeText: {
    marginTop: 10,
    marginBottom: 20,
  },
  assetCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  assetLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  assetValue: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  investButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  investButtonText: {
    color: '#3AAA75',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#FF6B6B',
  },
  plansScrollView: {
    marginBottom: 24,
  },
  planCard: {
    width: 120,
    height: 170,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    justifyContent: 'space-between',
  },
  planTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  planReturn: {
    color: 'white',
    fontSize: 14,
  },
  planIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planIconText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  guideTitle: {
    marginBottom: 16,
  },
  guideItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingVertical: 16,
  },
  guideContent: {
    flex: 1,
    paddingRight: 16,
  },
  guideDescription: {
    marginTop: 8,
    color: '#666666',
  },
  guideImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  guideImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DDDDDD',
  },
});