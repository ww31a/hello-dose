import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Colors, Typography } from '../theme';
import Button from '../components/Button';

// SVG Icons from assets/icons
import CalendarIcon from '../assets/icons/calender-2.svg';
import TimeIcon from '../assets/icons/time.svg';

const LogInjectionScreen = () => {
  const navigation = useNavigation();
  const [selectedSite, setSelectedSite] = useState('R Abdomen');
  const [dateType, setDateType] = useState('Today');
  const [timeType, setTimeType] = useState('Now');
  const [notes, setNotes] = useState('');

  const injectionSites = [
    'L Abdomen', 'R Abdomen',
    'L Thigh', 'R Thigh'
  ];

  const handleLog = () => {
    // Navigate back or to success screen
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={Colors.dark} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Log Injection</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* White Card Wrapper */}
        <View style={styles.mainCard}>
          {/* Select Injection Site */}
          <Text style={styles.sectionLabel}>SELECT INJECTION SITE</Text>
          <View style={styles.grid}>
            {injectionSites.map((site) => (
              <TouchableOpacity
                key={site}
                onPress={() => setSelectedSite(site)}
                style={[
                  styles.siteBox,
                  selectedSite === site && styles.siteBoxSelected
                ]}
              >
                <View style={[
                  styles.radio,
                  selectedSite === site && styles.radioSelected
                ]} />
                <Text style={[
                  styles.siteText,
                  selectedSite === site && styles.siteTextSelected
                ]}>{site}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Date and Time Section */}
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeField}>
              <Text style={styles.fieldLabel}>DATE</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>02/12/2025</Text>
                <CalendarIcon width={20} height={20} />
              </View>
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  onPress={() => setDateType('Today')}
                  style={[styles.toggleBtn, dateType === 'Today' && styles.toggleBtnActive]}
                >
                  <Text style={[styles.toggleText, dateType === 'Today' && styles.toggleTextActive]}>TODAY</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setDateType('Yesterday')}
                  style={[styles.toggleBtn, dateType === 'Yesterday' && styles.toggleBtnActive]}
                >
                  <Text style={[styles.toggleText, dateType === 'Yesterday' && styles.toggleTextActive]}>YESTERDAY</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.dateTimeField}>
              <Text style={styles.fieldLabel}>TIME</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputText}>09:00 AM</Text>
                <TimeIcon width={40} height={40} />
              </View>
              <View style={styles.toggleRow}>
                <TouchableOpacity
                  onPress={() => setTimeType('Now')}
                  style={[styles.toggleBtn, timeType === 'Now' && styles.toggleBtnActive]}
                >
                  <Text style={[styles.toggleText, timeType === 'Now' && styles.toggleTextActive]}>NOW</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setTimeType('Morning')}
                  style={[styles.toggleBtn, timeType === 'Morning' && styles.toggleBtnActive]}
                >
                  <Text style={[styles.toggleText, timeType === 'Morning' && styles.toggleTextActive]}>MORNING</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Internal Notes */}
          <Text style={styles.sectionLabel}>INTERNAL NOTES</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Side effects, mood..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        {/* Bottom Section (Outside Card) */}
        <View style={styles.footerSection}>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Injection 4 of 4 for this month</Text>
          </View>

          <Button
            label="Log and Update"
            variant="primary"
            onPress={handleLog}
            style={styles.logButton}
          />

          <Text style={styles.disclaimer}>
            Tapping 'Log' will instantly update your cycle progress.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  headerRight: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  mainCard: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 24,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  siteBox: {
    width: '48%',
    height: 80,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  siteBoxSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#F0FDFA',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  siteText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.dark,
  },
  siteTextSelected: {
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 24,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  dateTimeField: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    marginBottom: 8,
  },
  inputWrapper: {
    height: 52,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 6,
  },
  toggleBtn: {
    flex: 1,
    height: 32,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  toggleText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
  },
  toggleTextActive: {
    color: Colors.primary,
  },
  notesInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 16,
    height: 60,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.dark,
    textAlignVertical: 'top',
  },
  footerSection: {
    paddingHorizontal: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  statusText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  logButton: {
    width: '100%',
    height: 60,
    marginVertical: 0,
    borderRadius: 30,
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default LogInjectionScreen;
