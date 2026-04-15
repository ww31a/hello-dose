import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { ChevronLeft, ChevronDown } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { Colors, Typography } from '../../../theme';
import ProfileIcon from '../../../assets/icons/Profile.svg';
import { patientService } from '../../../api/services/patient';
import styles from './styles';

const ScheduleAppointmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { providerId, providerName, providerTitle } = route.params || {};

  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM-DD'));
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch 30 days of availability starting from today/current month start
  const { data: availability, isLoading, isError } = useQuery({
    queryKey: ['availability', providerId, dayjs(currentMonth).startOf('month').format('YYYY-MM-DD')],
    queryFn: () => patientService.getAppointmentSlots(dayjs(currentMonth).startOf('month').format('YYYY-MM-DD'), providerId, 42), // Fetch 6 weeks to cover full calendar
    enabled: !!providerId,
  });

  const markedDates = useMemo(() => {
    const marks = {};
    const startOfCalendar = dayjs(currentMonth).startOf('month').startOf('week');
    
    // We cover 42 days (6 weeks) to ensure all visible days are marked correctly
    for (let i = 0; i < 42; i++) {
      const date = startOfCalendar.add(i, 'day').format('YYYY-MM-DD');
      const isPast = dayjs(date).isBefore(dayjs(), 'day');
      const isWeekend = dayjs(date).day() === 0 || dayjs(date).day() === 6;
      const hasSlots = availability?.[date]?.length > 0;

      if (isPast || isWeekend || (availability && !hasSlots)) {
        marks[date] = { 
          disabled: true, 
          disableTouchEvent: true,
          customStyles: {
            text: { color: '#D1D5DB', fontWeight: 'bold' } // Force grey color
          }
        };
      } else {
        marks[date] = {
          customStyles: {
            container: {
              backgroundColor: '#F9FAFB',
              borderRadius: 12,
            },
            text: {
              color: Colors.dark,
              fontWeight: 'bold',
            }
          }
        };
      }
    }

    if (selectedDate) {
      marks[selectedDate] = {
        ...marks[selectedDate],
        customStyles: {
          container: {
            backgroundColor: Colors.primary,
            borderRadius: 12,
          },
          text: {
            color: '#FFFFFF',
            fontWeight: 'bold',
          }
        }
      };
    }

    return marks;
  }, [availability, selectedDate, currentMonth]);

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    navigation.navigate('SelectTimeSlot', { 
      day: day.day, 
      date: day.dateString, 
      providerId,
      providerName,
      providerTitle
    });
  };

  const [pickerConfig, setPickerConfig] = useState({ visible: false, type: 'month', options: [] });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const showMonthPicker = () => {
    const currentYear = dayjs().year();
    const selectedYear = dayjs(currentMonth).year();
    const currentMonthIdx = dayjs().month();

    const options = months.map((m, i) => ({
      label: m,
      value: i,
      disabled: selectedYear === currentYear && i < currentMonthIdx,
    })).filter(opt => !opt.disabled);

    setPickerConfig({ visible: true, type: 'month', options });
  };

  const showYearPicker = () => {
    const currentYear = dayjs().year();
    const options = [
      { label: `${currentYear}`, value: currentYear },
      { label: `${currentYear + 1}`, value: currentYear + 1 },
    ];
    setPickerConfig({ visible: true, type: 'year', options });
  };

  const handleSelect = (value) => {
    let newDate;
    if (pickerConfig.type === 'month') {
      newDate = dayjs(currentMonth).month(value).format('YYYY-MM-DD');
    } else {
      newDate = dayjs(currentMonth).year(value).format('YYYY-MM-DD');
    }
    setCurrentMonth(newDate);
    setPickerConfig({ ...pickerConfig, visible: false });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={Colors.dark} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Appointment</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <ProfileIcon width={50} height={50} />
          </View>
          <Text style={styles.name}>{providerName}</Text>
          <Text style={styles.roleLabel}>YOUR CARE LEAD</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{providerTitle}</Text>
          </View>
        </View>

        <View style={styles.calendarCard}>
          <Text style={styles.sectionHeader}>Select Available Day</Text>
          
          {isLoading ? (
            <View style={{ height: 300, justifyContent: 'center' }}>
              <ActivityIndicator color={Colors.primary} size="large" />
            </View>
          ) : isError ? (
            <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'red' }}>Failed to load availability.</Text>
            </View>
          ) : (
            <Calendar
              key={currentMonth}
              current={currentMonth}
              onDayPress={onDayPress}
              markedDates={markedDates}
              markingType={'custom'}
              hideArrows={true}
              hideExtraDays={true}
              enableSwipeMonths={true}
              onMonthChange={(month) => setCurrentMonth(month.dateString)}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#9CA3AF',
                selectedDayBackgroundColor: Colors.primary,
                selectedDayTextColor: '#ffffff',
                todayTextColor: Colors.primary,
                dayTextColor: Colors.dark,
                textDisabledColor: '#D1D5DB',
                dotColor: Colors.primary,
                selectedDotColor: '#ffffff',
                arrowColor: Colors.primary,
                monthTextColor: Colors.dark,
                indicatorColor: Colors.primary,
                textDayFontFamily: Typography.fontFamily.bold,
                textMonthFontFamily: Typography.fontFamily.bold,
                textDayHeaderFontFamily: Typography.fontFamily.bold,
                textDayFontSize: 14,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 10,
              }}
              style={{
                width: '100%',
                marginBottom: 20,
              }}
            />
          )}

          <View style={styles.controlsRow}>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={showMonthPicker}
            >
              <Text style={styles.dropdownText}>{dayjs(currentMonth).format('MMMM')}</Text>
              <ChevronDown size={20} color={Colors.dark} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.dropdown}
              onPress={showYearPicker}
            >
              <Text style={styles.dropdownText}>{dayjs(currentMonth).format('YYYY')}</Text>
              <ChevronDown size={20} color={Colors.dark} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={pickerConfig.visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setPickerConfig({ ...pickerConfig, visible: false })}
      >
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1} 
          onPress={() => setPickerConfig({ ...pickerConfig, visible: false })}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Select {pickerConfig.type === 'month' ? 'Month' : 'Year'}
                </Text>
              </View>
              <ScrollView style={styles.optionsList}>
                {pickerConfig.options.map((opt) => (
                  <TouchableOpacity 
                    key={opt.value}
                    style={styles.optionItem}
                    onPress={() => handleSelect(opt.value)}
                  >
                    <Text style={styles.optionLabel}>{opt.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default ScheduleAppointmentScreen;
