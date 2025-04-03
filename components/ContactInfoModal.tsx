import React, { useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

type ContactInfoProps = {
  visible: boolean;
  onClose: () => void;
};

type ContactField = {
  label: string;
  value: string;
};

export function ContactInfoModal({ visible, onClose }: ContactInfoProps) {
  const primaryColor = useThemeColor({}, 'tint');
  
  // Mock data for the contact info
  const [contactInfo, setContactInfo] = useState<{
    name: string;
    birthdate: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
    profileImage: any;
  }>({
    name: 'Warren Buffet',
    birthdate: '05 November 1993',
    gender: 'Male',
    email: 'warren.buff@invest.ai',
    phone: '-',
    address: '-',
    profileImage: require('@/assets/images/icon.png'), // Using a placeholder image
  });

  const handleEdit = (field: string) => {
    // In a real app, this would open an edit form or prompt
    console.log(`Editing ${field}`);
    // For now, we'll just show a message
    alert(`Edit ${field} functionality would open here`);
  };

  const renderContactField = ({ label, value }: ContactField) => (
    <View style={styles.fieldContainer}>
      <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
      <View style={styles.fieldValueContainer}>
        <ThemedText style={styles.fieldValue}>{value}</ThemedText>
        <TouchableOpacity 
          style={styles.changeButton} 
          onPress={() => handleEdit(label)}
        >
          <ThemedText style={[styles.changeButtonText, { color: primaryColor }]}>Change</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <ThemedView style={styles.modalView}>
          {/* Header with back button and title */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <IconSymbol name="chevron.left" size={24} color="#000" />
            </TouchableOpacity>
            <ThemedText type="subtitle" style={styles.headerTitle}>Contact info</ThemedText>
            <View style={styles.placeholder} />
          </View>

          <ScrollView style={styles.scrollView}>
            {/* Profile Image */}
            <View style={styles.profileImageContainer}>
              <Image 
                source={contactInfo.profileImage} 
                style={styles.profileImage}
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.editImageButton}
                onPress={() => handleEdit('Profile Picture')}
              >
                <IconSymbol name="pencil" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Contact Fields */}
            {renderContactField({ label: 'Name', value: contactInfo.name })}
            {renderContactField({ label: 'Birthdate', value: contactInfo.birthdate })}
            {renderContactField({ label: 'Gender', value: contactInfo.gender })}
            {renderContactField({ label: 'Email', value: contactInfo.email })}
            {renderContactField({ label: 'Phone Number', value: contactInfo.phone })}
            {renderContactField({ label: 'Address', value: contactInfo.address })}
          </ScrollView>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#666',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  fieldValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  changeButton: {
    padding: 5,
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});