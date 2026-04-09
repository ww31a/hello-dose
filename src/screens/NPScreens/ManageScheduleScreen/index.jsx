import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

import Button from '../../../components/Button';
import ToggleOnIcon from '../../../assets/icons/toggle-on.svg';
import ToggleOffIcon from '../../../assets/icons/toggle-off.svg';
import DeleteIcon from '../../../assets/icons/delete.svg';
import styles from './styles';

const DAYS = [
  {
    name: 'Sunday',
    enabled: true,
    slots: [
      { start: '10:00 AM', end: '10:00 AM' },
      { start: '12:00 PM', end: '2:00 PM', deletable: true },
    ],
  },
  {
    name: 'Monday',
    enabled: true,
    slots: [{ start: '10:00 AM', end: '10:00 AM' }],
  },
  { name: 'Tuesday', enabled: false, slots: [] },
  {
    name: 'Wednesday',
    enabled: true,
    slots: [{ start: '10:00 AM', end: '10:00 AM' }],
  },
  {
    name: 'Thursday',
    enabled: true,
    slots: [{ start: '10:00 AM', end: '10:00 AM' }],
  },
  { name: 'Friday', enabled: false, slots: [] },
  { name: 'Saturday', enabled: false, slots: [] },
];

const ManageScheduleScreen = ({ navigation }) => {
  const [days, setDays] = useState(DAYS);

  const toggleDay = (dayName) => {
    setDays((prevDays) =>
      prevDays.map((day) =>
        day.name === dayName
          ? { ...day, enabled: !day.enabled }
          : day
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#1E1E26" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Schedule</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Set Your Availability</Text>

          {days.map((day, index) => (
            <View key={day.name} style={styles.daySection}>
              <View style={styles.dayHeader}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => toggleDay(day.name)}
                >
                  {day.enabled ? (
                    <ToggleOnIcon width={26} height={16} />
                  ) : (
                    <ToggleOffIcon width={26} height={16} />
                  )}
                </TouchableOpacity>
                <Text style={styles.dayName}>{day.name}</Text>
              </View>

              {day.enabled && day.slots.length > 0 && (
                <View style={styles.slotList}>
                  {day.slots.map((slot, slotIdx) => (
                    <View key={`${day.name}-${slotIdx}`} style={styles.slotRow}>
                      <View style={styles.timePill}>
                        <Text style={styles.timePillText}>{slot.start}</Text>
                      </View>
                      <Text style={styles.timeDash}>-</Text>
                      <View style={styles.timePill}>
                        <Text style={styles.timePillText}>{slot.end}</Text>
                      </View>
                      {slot.deletable ? (
                        <TouchableOpacity style={styles.deleteButton}>
                          <DeleteIcon width={16} height={16} />
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.deleteButtonPlaceholder} />
                      )}
                    </View>
                  ))}
                  <TouchableOpacity>
                    <Text style={styles.addSlotText}>+ Add Slot</Text>
                  </TouchableOpacity>
                </View>
              )}

              {index < DAYS.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label="Update Availability"
          variant="primary"
          onPress={() => {}}
          style={styles.updateButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default ManageScheduleScreen;
