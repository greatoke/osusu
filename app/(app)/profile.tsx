import { StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { ContactInfoModal } from '@/components/ContactInfoModal';
import { useState } from 'react';

export default function ProfileScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  const [contactModalVisible, setContactModalVisible] = useState(false);
  
  return (
    <ScrollView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <IconSymbol name="chevron.left.forwardslash.chevron.right" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.headerTitle}>Profile</ThemedText>
        <View style={styles.placeholder} />
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={require('@/assets/images/icon.png')} 
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
        <ThemedText type="subtitle" style={styles.profileName}>Jonas Macroni</ThemedText>
        <ThemedText style={styles.profileLevel}>Expert</ThemedText>
      </View>

      {/* Menu Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => setContactModalVisible(true)}>
          <ThemedView style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <IconSymbol name="chevron.right" size={20} color="#000" />
            </View>
            <ThemedText style={styles.menuText}>Contact Info</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#666" />
          </ThemedView>
        </TouchableOpacity>
        
        <ContactInfoModal 
          visible={contactModalVisible} 
          onClose={() => setContactModalVisible(false)} 
        />

        <TouchableOpacity>
          <ThemedView style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <IconSymbol name="chevron.right" size={20} color="#000" />
            </View>
            <ThemedText style={styles.menuText}>Source of Funding Info</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#666" />
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity>
          <ThemedView style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <IconSymbol name="chevron.right" size={20} color="#000" />
            </View>
            <ThemedText style={styles.menuText}>Bank Account Info</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#666" />
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity>
          <ThemedView style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <IconSymbol name="chevron.right" size={20} color="#000" />
            </View>
            <ThemedText style={styles.menuText}>Document Info</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#666" />
          </ThemedView>
        </TouchableOpacity>

        <TouchableOpacity>
          <ThemedView style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <IconSymbol name="chevron.right" size={20} color="#000" />
            </View>
            <ThemedText style={styles.menuText}>Settings</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#666" />
          </ThemedView>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileLevel: {
    fontSize: 16,
    color: '#666666',
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
});