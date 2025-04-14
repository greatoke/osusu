import { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Collapsible } from '@/components/Collapsible';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export default function HelpSupportScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  
  // Mock data for FAQs
  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I join a savings group?',
      answer: 'To join a savings group, go to the Joint Contribution section and tap on "Join a Group". You\'ll need an invite code from the group creator to join. Enter the code and follow the instructions to complete your registration.'
    },
    {
      id: '2',
      question: 'How do I withdraw my savings?',
      answer: 'To withdraw your savings, navigate to your Personal Contribution or Joint Contribution section, select the savings plan you want to withdraw from, and tap on the "Withdraw" button. Follow the prompts to complete the withdrawal process.'
    },
    {
      id: '3',
      question: 'What are the fees for using Osusu?',
      answer: 'Osusu charges a small processing fee of 1.5% on deposits. There are no monthly subscription fees or hidden charges. Withdrawal fees may apply depending on your withdrawal method and amount.'
    },
    {
      id: '4',
      question: 'How secure is my money with Osusu?',
      answer: 'Your money is very secure with Osusu. We use bank-level encryption to protect your financial information and transactions. Additionally, all funds are held in regulated financial institutions and are insured up to the maximum allowed by law.'
    },
    {
      id: '5',
      question: 'Can I change my contribution amount?',
      answer: 'Yes, you can change your contribution amount for personal savings at any time. For joint contributions, the ability to change your contribution amount depends on the rules set by the group creator.'
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Support Options */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Contact Support
          </ThemedText>
          
          <TouchableOpacity style={styles.supportOption}>
            <View style={[styles.supportIconContainer, { backgroundColor: '#E8F5FF' }]}>
              <IconSymbol name="envelope.fill" size={24} color="#4A6FA5" />
            </View>
            <View style={styles.supportOptionContent}>
              <ThemedText type="defaultSemiBold">Email Support</ThemedText>
              <ThemedText style={styles.supportOptionDescription}>
                Get help via email within 24 hours
              </ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportOption}>
            <View style={[styles.supportIconContainer, { backgroundColor: '#E6F9ED' }]}>
              <IconSymbol name="bubble.left.fill" size={24} color="#31A062" />
            </View>
            <View style={styles.supportOptionContent}>
              <ThemedText type="defaultSemiBold">Live Chat</ThemedText>
              <ThemedText style={styles.supportOptionDescription}>
                Chat with our support team in real-time
              </ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportOption}>
            <View style={[styles.supportIconContainer, { backgroundColor: '#FFF4E5' }]}>
              <IconSymbol name="phone.fill" size={24} color="#F2B84B" />
            </View>
            <View style={styles.supportOptionContent}>
              <ThemedText type="defaultSemiBold">Phone Support</ThemedText>
              <ThemedText style={styles.supportOptionDescription}>
                Call us directly for urgent issues
              </ThemedText>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#666" />
          </TouchableOpacity>
        </ThemedView>

        {/* FAQs */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Frequently Asked Questions
          </ThemedText>
          
          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity 
                style={styles.faqQuestion}
                onPress={() => toggleFAQ(faq.id)}
              >
                <ThemedText type="defaultSemiBold" style={styles.faqQuestionText}>
                  {faq.question}
                </ThemedText>
                <IconSymbol 
                  name={expandedFAQ === faq.id ? "chevron.up" : "chevron.down"} 
                  size={20} 
                  color="#666" 
                />
              </TouchableOpacity>
              
              <Collapsible collapsed={expandedFAQ !== faq.id}>
                <View style={styles.faqAnswer}>
                  <ThemedText style={styles.faqAnswerText}>
                    {faq.answer}
                  </ThemedText>
                </View>
              </Collapsible>
            </View>
          ))}
        </ThemedView>

        {/* Additional Resources */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Additional Resources
          </ThemedText>
          
          <TouchableOpacity 
            style={styles.resourceButton}
            onPress={() => router.push('/terms-conditions')}
          >
            <IconSymbol name="doc.text.fill" size={20} color={primaryColor} />
            <ThemedText style={[styles.resourceButtonText, { color: primaryColor }]}>
              Terms & Conditions
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resourceButton}>
            <IconSymbol name="lock.shield.fill" size={20} color={primaryColor} />
            <ThemedText style={[styles.resourceButtonText, { color: primaryColor }]}>
              Privacy Policy
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.resourceButton}>
            <IconSymbol name="book.fill" size={20} color={primaryColor} />
            <ThemedText style={[styles.resourceButtonText, { color: primaryColor }]}>
              User Guide
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Feedback Button */}
        <View style={styles.feedbackContainer}>
          <ThemedButton 
            variant="outline"
            style={styles.feedbackButton}
          >
            Send Feedback
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
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  supportIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  supportOptionContent: {
    flex: 1,
  },
  supportOptionDescription: {
    color: '#666',
    fontSize: 14,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  faqQuestionText: {
    flex: 1,
    paddingRight: 16,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#F9F9F9',
  },
  faqAnswerText: {
    color: '#666',
  },
  resourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 12,
  },
  resourceButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  feedbackContainer: {
    marginBottom: 32,
  },
  feedbackButton: {
    borderColor: '#31A062',
  },
});