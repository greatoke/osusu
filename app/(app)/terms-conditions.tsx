import { StyleSheet, View, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';

export default function TermsConditionsScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Terms & Conditions',
        headerBackTitle: 'Back',
      }} />
      <ScrollView style={styles.container}>
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Terms of Service
          </ThemedText>
          <ThemedText style={styles.lastUpdated}>
            Last updated: July 15, 2023
          </ThemedText>
          
          <ThemedText style={styles.paragraph}>
            Welcome to Osusu. These Terms of Service ("Terms") govern your use of our mobile application, website, and services (collectively, the "Service"). By using our Service, you agree to these Terms. If you do not agree to these Terms, you may not use the Service.
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={styles.subheading}>
            1. Use of Service
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            Osusu provides a platform for individuals to save money individually or in groups. You may use our Service only if you can form a binding contract with Osusu, and only in compliance with these Terms and all applicable laws. Any use or access to our Service by anyone under 18 is strictly prohibited and in violation of these Terms.
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={styles.subheading}>
            2. Account Registration
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            To use certain features of our Service, you must register for an account. You must provide accurate, current, and complete information during the registration process and keep your account information up-to-date at all times.
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your account. We encourage you to use a strong password (a password that uses a combination of upper and lower case letters, numbers, and symbols) with your account.
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={styles.subheading}>
            3. Financial Services
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            Osusu is not a bank. The Service is designed to help you save and manage your money, but we do not provide banking services. Funds are held by our banking partners, and any interest earned on your savings may be subject to their terms and conditions.
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            By using our Service, you authorize us to access your financial information from third-party financial institutions on your behalf. You represent that you are entitled to disclose your financial information to us and that such disclosure does not violate any third-party rights.
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={styles.subheading}>
            4. Group Savings
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            Our Service allows you to create or join group savings plans. When you create a group, you become the group administrator and are responsible for setting the rules and inviting members. When you join a group, you agree to abide by the rules set by the group administrator.
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            Osusu is not responsible for any disputes that may arise between group members. We encourage all group members to clearly communicate and agree on the terms of their group savings plan before contributing funds.
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={styles.subheading}>
            5. Fees and Charges
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            Osusu charges a processing fee of 1.5% on deposits. There are no monthly subscription fees or hidden charges. Withdrawal fees may apply depending on your withdrawal method and amount. All fees are clearly displayed before you complete a transaction.
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={styles.subheading}>
            6. Privacy Policy
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={styles.subheading}>
            7. Changes to Terms
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            We may modify these Terms at any time. If we make changes to these Terms, we will provide notice of such changes, such as by sending an email notification, providing notice through our Service, or updating the "Last Updated" date at the beginning of these Terms. By continuing to use our Service after the changes become effective, you agree to be bound by the revised Terms.
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={styles.subheading}>
            8. Termination
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            If you wish to terminate your account, you may simply discontinue using the Service or contact our support team to request account deletion.
          </ThemedText>
          
          <ThemedText type="defaultSemiBold" style={styles.subheading}>
            9. Contact Us
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            If you have any questions about these Terms, please contact us at support@osusu.com.
          </ThemedText>
        </ThemedView>
        
        <View style={styles.buttonContainer}>
          <ThemedButton>
            I Accept
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
    marginBottom: 8,
  },
  lastUpdated: {
    color: '#666',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  subheading: {
    marginTop: 24,
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 32,
  },
});