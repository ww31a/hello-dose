import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Colors } from '../../../theme';
import ProfileIcon from '../../../assets/icons/Profile.svg';

import styles from './styles';

const SelectTimeSlotScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { day = 16 } = route.params || {};
  const [selectedTime, setSelectedTime] = useState('9:00 AM');

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'
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

        {/* Time Selection Card */}
        <View style={styles.timeCard}>
          <Text style={styles.sectionHeader}>Select Available Time Slot</Text>
          <Text style={styles.selectedDate}>Thursday April {day}, 2026</Text>
          
          <View style={styles.timeList}>
            {timeSlots.map(time => (
              <TouchableOpacity 
                key={time} 
                onPress={() => setSelectedTime(time)}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot
                ]}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText
                ]}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectTimeSlotScreen;
