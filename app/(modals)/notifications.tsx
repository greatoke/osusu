import React, { useState } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { router } from 'expo-router';

export default function NotificationsModal() {
  const primaryColor = useThemeColor({}, 'tint');
  
  // Mock data for notifications
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Personal Contribution',
      message: 'Your daily contribution of ₦5,000 has been processed successfully.',
      timestamp: '2 hours ago',
      read: false,
      type: 'personal'
    },
    {
      id: '2',
      title: 'Joint Contribution',
      message: 'Warren Buffet has joined your "Investment Group" contribution.',
      timestamp: '1 day ago',
      read: true,
      type: 'joint'
    },
    {
      id: '3',
      title: 'System Notification',
      message: 'Your account has been verified successfully.',
      timestamp: '3 days ago',
      read: true,
      type: 'system'
    },
    {
      id: '4',
      title: 'Withdrawal',
      message: 'Your withdrawal request of ₦50,000 has been processed.',
      timestamp: '1 week ago',
      read: true,
      type: 'personal'
    },
    {
      id: '5',
      title: 'Joint Contribution',
      message: 'The "Investment Group" has reached its target of ₦1,000,000.',
      timestamp: '2 weeks ago',
      read: true,
      type: 'joint'
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'personal':
        return <IconSymbol name="person.fill" size={20} color={primaryColor} />;
      case 'joint':
        return <IconSymbol name="person.3.fill" size={20} color={primaryColor} />;
      case 'system':
        return <IconSymbol name="bell.fill" size={20} color={primaryColor} />;
      default:
        return <IconSymbol name="bell.fill" size={20} color={primaryColor} />;
    }
  };

  const renderNotificationItem = (notification: any) => (
    <TouchableOpacity 
      key={notification.id}
      style={[styles.notificationItem, !notification.read && styles.unreadNotification]}
      onPress={() => markAsRead(notification.id)}
    >
      <View style={styles.notificationIconContainer}>
        {getNotificationIcon(notification.type)}
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <ThemedText style={styles.notificationTitle}>{notification.title}</ThemedText>
          <ThemedText style={styles.notificationTime}>{notification.timestamp}</ThemedText>
        </View>
        <ThemedText style={styles.notificationMessage}>{notification.message}</ThemedText>
      </View>
      {!notification.read && <View style={[styles.unreadIndicator, { backgroundColor: primaryColor }]} />}
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText type="subtitle" style={styles.headerTitle}>Notifications</ThemedText>
        <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
          <ThemedText style={[styles.markAllText, { color: primaryColor }]}>Mark all as read</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.scrollView}>
        {notifications.length > 0 ? (
          notifications.map(notification => renderNotificationItem(notification))
        ) : (
          <View style={styles.emptyContainer}>
            <IconSymbol name="bell.slash.fill" size={50} color="#ccc" />
            <ThemedText style={styles.emptyText}>No notifications yet</ThemedText>
          </View>
        )}
      </ScrollView>
    </ThemedView>
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
  markAllButton: {
    padding: 8,
  },
  markAllText: {
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 20,
    right: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});