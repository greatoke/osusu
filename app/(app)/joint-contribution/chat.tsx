import { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isCurrentUser: boolean;
};

export default function GroupChatScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  const [message, setMessage] = useState('');
  
  // Mock data for messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'John Doe',
      text: 'Hello everyone! How is everyone doing with their contributions this month?',
      timestamp: new Date(2023, 6, 15, 10, 30),
      isCurrentUser: false,
    },
    {
      id: '2',
      sender: 'Sarah Smith',
      text: 'I just made my contribution for the month. The app made it so easy!',
      timestamp: new Date(2023, 6, 15, 10, 32),
      isCurrentUser: false,
    },
    {
      id: '3',
      sender: 'You',
      text: 'Great job Sarah! I will be making mine tomorrow.',
      timestamp: new Date(2023, 6, 15, 10, 35),
      isCurrentUser: true,
    },
    {
      id: '4',
      sender: 'Michael Johnson',
      text: 'Can someone remind me of the deadline for this month?',
      timestamp: new Date(2023, 6, 15, 11, 0),
      isCurrentUser: false,
    },
    {
      id: '5',
      sender: 'You',
      text: 'It\'s on the 25th of this month, Michael.',
      timestamp: new Date(2023, 6, 15, 11, 2),
      isCurrentUser: true,
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'You',
      text: message,
      timestamp: new Date(),
      isCurrentUser: true,
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isCurrentUser ? styles.userMessageContainer : styles.otherMessageContainer]}>
      {!item.isCurrentUser && (
        <ThemedText style={styles.messageSender}>{item.sender}</ThemedText>
      )}
      <View style={[styles.messageBubble, item.isCurrentUser ? styles.userMessageBubble : styles.otherMessageBubble]}>
        <ThemedText style={[styles.messageText, item.isCurrentUser ? styles.userMessageText : styles.otherMessageText]}>
          {item.text}
        </ThemedText>
      </View>
      <ThemedText style={styles.messageTime}>{formatTime(item.timestamp)}</ThemedText>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Group Chat',
        headerBackTitle: 'Back',
      }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Notification Banner */}
          <ThemedView style={styles.notificationBanner}>
            <IconSymbol name="bell.fill" size={20} color="#FFFFFF" />
            <ThemedText style={styles.notificationText}>
              3 members have made their contributions this week
            </ThemedText>
          </ThemedView>
          
          {/* Messages List */}
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesContainer}
            inverted={false}
          />
          
          {/* Message Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendButton, { backgroundColor: primaryColor }]}
              onPress={handleSendMessage}
            >
              <IconSymbol name="paperplane.fill" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#31A062',
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
  },
  notificationText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 14,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageSender: {
    fontSize: 12,
    marginBottom: 4,
    color: '#666',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 4,
  },
  userMessageBubble: {
    backgroundColor: '#31A062',
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#333333',
  },
  messageTime: {
    fontSize: 10,
    color: '#999',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});