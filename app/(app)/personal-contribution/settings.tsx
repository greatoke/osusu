import { useState } from 'react';
import { StyleSheet, View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SavingsSettingsScreen() {
  const primaryColor = useThemeColor({}, 'tint');
  
  // Auto-save settings
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [weeklyEnabled, setWeeklyEnabled] = useState(true);
  const [biWeeklyEnabled, setBiWeeklyEnabled] = useState(false);
  const [monthlyEnabled, setMonthlyEnabled] = useState(false);
  
  // Reminder settings
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [dayBeforeEnabled, setDayBeforeEnabled] = useState(true);
  const [sameDayEnabled, setSameDayEnabled] = useState(true);
  const [missedEnabled, setMissedEnabled] = useState(true);

  const handleSaveSettings = () => {
    // Here you would save the settings to the backend
    // For now, we'll just show a success message
    console.log('Settings saved');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ 
        headerShown: true,
        title: 'Savings Settings',
        headerBackTitle: 'Back',
      }} />
      <ScrollView style={styles.container}>
        {/* Auto-Save Settings */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Auto-Save Settings
            </ThemedText>
            <Switch
              value={autoSaveEnabled}
              onValueChange={setAutoSaveEnabled}
              trackColor={{ false: '#D1D1D6', true: '#31A062' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <ThemedText style={styles.sectionDescription}>
            Set up automatic contributions to your savings goals
          </ThemedText>
          
          <View style={[styles.optionsContainer, !autoSaveEnabled && styles.disabledSection]}>
            <TouchableOpacity 
              style={[styles.optionItem, weeklyEnabled && styles.selectedOption]}
              onPress={() => {
                if (autoSaveEnabled) {
                  setWeeklyEnabled(true);
                  setBiWeeklyEnabled(false);
                  setMonthlyEnabled(false);
                }
              }}
              disabled={!autoSaveEnabled}
            >
              <View style={styles.optionIconContainer}>
                <IconSymbol name="calendar.badge.clock" size={24} color={weeklyEnabled ? '#FFFFFF' : '#666666'} />
              </View>
              <ThemedText style={[styles.optionText, weeklyEnabled && styles.selectedOptionText]}>
                Weekly
              </ThemedText>
              <View style={[styles.radioButton, weeklyEnabled && styles.radioButtonSelected]}>
                {weeklyEnabled && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.optionItem, biWeeklyEnabled && styles.selectedOption]}
              onPress={() => {
                if (autoSaveEnabled) {
                  setWeeklyEnabled(false);
                  setBiWeeklyEnabled(true);
                  setMonthlyEnabled(false);
                }
              }}
              disabled={!autoSaveEnabled}
            >
              <View style={styles.optionIconContainer}>
                <IconSymbol name="calendar.badge.clock" size={24} color={biWeeklyEnabled ? '#FFFFFF' : '#666666'} />
              </View>
              <ThemedText style={[styles.optionText, biWeeklyEnabled && styles.selectedOptionText]}>
                Bi-Weekly
              </ThemedText>
              <View style={[styles.radioButton, biWeeklyEnabled && styles.radioButtonSelected]}>
                {biWeeklyEnabled && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.optionItem, monthlyEnabled && styles.selectedOption]}
              onPress={() => {
                if (autoSaveEnabled) {
                  setWeeklyEnabled(false);
                  setBiWeeklyEnabled(false);
                  setMonthlyEnabled(true);
                }
              }}
              disabled={!autoSaveEnabled}
            >
              <View style={styles.optionIconContainer}>
                <IconSymbol name="calendar.badge.clock" size={24} color={monthlyEnabled ? '#FFFFFF' : '#666666'} />
              </View>
              <ThemedText style={[styles.optionText, monthlyEnabled && styles.selectedOptionText]}>
                Monthly
              </ThemedText>
              <View style={[styles.radioButton, monthlyEnabled && styles.radioButtonSelected]}>
                {monthlyEnabled && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
          </View>
        </ThemedView>

        {/* Reminder Settings */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Reminder Settings
            </ThemedText>
            <Switch
              value={remindersEnabled}
              onValueChange={setRemindersEnabled}
              trackColor={{ false: '#D1D1D6', true: '#31A062' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <ThemedText style={styles.sectionDescription}>
            Set up reminders for your savings contributions
          </ThemedText>
          
          <View style={[styles.checkboxContainer, !remindersEnabled && styles.disabledSection]}>
            <View style={styles.checkboxItem}>
              <TouchableOpacity 
                style={[styles.checkbox, dayBeforeEnabled && styles.checkboxSelected]}
                onPress={() => remindersEnabled && setDayBeforeEnabled(!dayBeforeEnabled)}
                disabled={!remindersEnabled}
              >
                {dayBeforeEnabled && <IconSymbol name="checkmark" size={16} color="#FFFFFF" />}
              </TouchableOpacity>
              <ThemedText style={styles.checkboxText}>Remind me a day before</ThemedText>
            </View>
            
            <View style={styles.checkboxItem}>
              <TouchableOpacity 
                style={[styles.checkbox, sameDayEnabled && styles.checkboxSelected]}
                onPress={() => remindersEnabled && setSameDayEnabled(!sameDayEnabled)}
                disabled={!remindersEnabled}
              >
                {sameDayEnabled && <IconSymbol name="checkmark" size={16} color="#FFFFFF" />}
              </TouchableOpacity>
              <ThemedText style={styles.checkboxText}>Remind me on the same day</ThemedText>
            </View>
            
            <View style={styles.checkboxItem}>
              <TouchableOpacity 
                style={[styles.checkbox, missedEnabled && styles.checkboxSelected]}
                onPress={() => remindersEnabled && setMissedEnabled(!missedEnabled)}
                disabled={!remindersEnabled}
              >
                {missedEnabled && <IconSymbol name="checkmark" size={16} color="#FFFFFF" />}
              </TouchableOpacity>
              <ThemedText style={styles.checkboxText}>Remind me if I miss a contribution</ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <ThemedButton onPress={handleSaveSettings}>
            Save Settings
          </ThemedButton>
          <ThemedText style={styles.disclaimerText}>
            You can change these settings at any time
          </ThemedText>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    marginBottom: 0,
  },
  sectionDescription: {
    color: '#666',
    marginBottom: 16,
  },
  disabledSection: {
    opacity: 0.5,
  },
  optionsContainer: {
    marginTop: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: '#31A062',
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#FFFFFF',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  checkboxContainer: {
    marginTop: 16,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSelected: {
    backgroundColor: '#31A062',
    borderColor: '#31A062',
  },
  checkboxText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  disclaimerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
});