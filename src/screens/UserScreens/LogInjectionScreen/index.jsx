import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react-native';
import DatePicker from 'react-native-date-picker';
import { Colors } from '../../../theme';
import Button from '../../../components/Button';
import { patientService } from '../../../api/services/patient';

import CalendarIcon from '../../../assets/icons/calender-2.svg';
import TimeIcon from '../../../assets/icons/time.svg';

import styles from './styles';

const SITE_MAPPING = {
  'L Abdomen': 'L_ABDOMEN',
  'R Abdomen': 'R_ABDOMEN',
  'L Thigh': 'L_THIGH',
  'R Thigh': 'R_THIGH',
};

const injectionSites = ['L Abdomen', 'R Abdomen', 'L Thigh', 'R Thigh'];

const LogInjectionScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { data: dashboard } = useQuery({
    queryKey: ['patientDashboard'],
    queryFn: patientService.getDashboard,
    staleTime: Infinity,
  });

  const [selectedSite, setSelectedSite] = useState('R Abdomen');
  const [notes, setNotes] = useState('');

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const logInjectionMutation = useMutation({
    mutationFn: ({ dosage, site, injectedAt, notes }) =>
      patientService.logInjection(dosage, site, injectedAt, notes),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patientDashboard'] });
      queryClient.invalidateQueries({ queryKey: ['injectionHistory'] });
      Alert.alert('Success', 'Injection logged successfully');
      navigation.goBack();
    },

    onError: error => {
      Alert.alert('Error', error.message || 'Failed to log injection');
    },
  });

  const handleLog = () => {
    const site = SITE_MAPPING[selectedSite] || 'L_ABDOMEN';
    const dosage = dashboard?.healthInsights?.currentDosage || '5.0';

    const injectedAt = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      0,
    ).toISOString();

    logInjectionMutation.mutate({ dosage, site, injectedAt, notes });
  };

  // ---------- PICKER HANDLERS ----------
  const openDatePicker = () => setDatePickerVisible(true);
  const openTimePicker = () => setTimePickerVisible(true);

  const handleDateConfirm = selectedDate => {
    setDate(selectedDate);
    setDatePickerVisible(false);
  };

  const handleTimeConfirm = selectedTime => {
    setTime(selectedTime);
    setTimePickerVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
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
        <View style={styles.mainCard}>
          {/* SITE */}
          <Text style={styles.sectionLabel}>SELECT INJECTION SITE</Text>

          <View style={styles.grid}>
            {injectionSites.map(site => (
              <TouchableOpacity
                key={site}
                onPress={() => setSelectedSite(site)}
                style={[
                  styles.siteBox,
                  selectedSite === site && styles.siteBoxSelected,
                ]}
              >
                <View
                  style={[
                    styles.radio,
                    selectedSite === site && styles.radioSelected,
                  ]}
                />
                <Text
                  style={[
                    styles.siteText,
                    selectedSite === site && styles.siteTextSelected,
                  ]}
                >
                  {site}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          {/* DATE + TIME */}
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeField}>
              <Text style={styles.fieldLabel}>DATE</Text>

              <TouchableOpacity
                style={styles.inputWrapper}
                onPress={openDatePicker}
              >
                <Text style={styles.inputText}>
                  {date.toLocaleDateString('en-US')}
                </Text>
                <CalendarIcon width={20} height={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.dateTimeField}>
              <Text style={styles.fieldLabel}>TIME</Text>

              <TouchableOpacity
                style={styles.inputWrapper}
                onPress={openTimePicker}
              >
                <Text style={styles.inputText}>
                  {time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </Text>
                <TimeIcon width={40} height={40} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          {/* NOTES */}
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

        {/* FOOTER */}
        <View style={styles.footerSection}>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>
              Injection 4 of 4 for this month
            </Text>
          </View>

          <Button
            label="Log and Update"
            variant="primary"
            onPress={handleLog}
            isLoading={logInjectionMutation.isPending}
            disabled={logInjectionMutation.isPending}
            style={styles.logButton}
          />

          <Text style={styles.disclaimer}>
            Tapping 'Log' will instantly update your cycle progress.
          </Text>
        </View>
      </ScrollView>

      {/* DATE PICKER */}
      <DatePicker
        open={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
        modal
      />

      {/* TIME PICKER */}
      <DatePicker
        open={isTimePickerVisible}
        mode="time"
        date={time}
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
        modal
      />
    </SafeAreaView>
  );
};

export default LogInjectionScreen;
