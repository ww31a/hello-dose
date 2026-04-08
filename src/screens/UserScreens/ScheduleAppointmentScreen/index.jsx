import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, ChevronDown } from 'lucide-react-native';
import { Colors } from '../../../theme';
import ProfileIcon from '../../../assets/icons/Profile.svg';

import styles from './styles';

const ScheduleAppointmentScreen = () => {
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState(16); // Mock selection

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // Mock calendar days for April 2026
  // Starting on Wednesday (index 3)
  const days = [
    null, null, null, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={Colors.dark} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Appointment</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section (Compact) */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <ProfileIcon width={50} height={50} />
          </View>
          <Text style={styles.name}>Bracha Banayan</Text>
          <Text style={styles.roleLabel}>YOUR CARE LEAD</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Board Certified FNP</Text>
          </View>
        </View>

        {/* Date Selection Card */}
        <View style={styles.calendarCard}>
          <Text style={styles.sectionHeader}>Select Available Day</Text>
          
          <View style={styles.weekDaysRow}>
            {weekDays.map(day => (
              <Text key={day} style={styles.weekDay}>{day}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {days.map((day, index) => (
              <TouchableOpacity 
                key={index} 
                disabled={!day}
                onPress={() => {
                  setSelectedDay(day);
                  navigation.navigate('SelectTimeSlot', { day });
                }}
                style={[
                  styles.dayButton,
                  !day && { backgroundColor: 'transparent' },
                  selectedDay === day && styles.dayButtonActive
                ]}
              >
                {day && (
                  <Text style={[
                    styles.dayText,
                    selectedDay === day && styles.dayTextActive
                  ]}>{day}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Month/Year Controls */}
          <View style={styles.controlsRow}>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>April</Text>
              <ChevronDown size={20} color={Colors.dark} />
            </View>
            <View style={styles.dropdown}>
              <Text style={styles.dropdownText}>2026</Text>
              <ChevronDown size={20} color={Colors.dark} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleAppointmentScreen;
