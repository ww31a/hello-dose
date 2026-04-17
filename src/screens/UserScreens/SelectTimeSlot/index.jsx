import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react-native';
import dayjs from 'dayjs';
import { Colors } from '../../../theme';
import Button from '../../../components/Button';
import ProfileIcon from '../../../assets/icons/Profile.svg';
import { patientService } from '../../../api/services/patient';

import styles from './styles';

const SelectTimeSlotScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const queryClient = useQueryClient();
  const {
    day = 16,
    date,
    providerId,
    providerName = 'Bracha Banayan',
    providerTitle = 'Board Certified FNP',
    providerAvatar,
  } = route.params || {};

  const [selectedSlot, setSelectedSlot] = useState(null);

  const {
    data: slots,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['appointmentSlots', date, providerId],
    queryFn: () => patientService.getAppointmentSlots(date, providerId),
    enabled: !!date && !!providerId,
  });

  const bookingMutation = useMutation({
    mutationFn: startTime =>
      patientService.bookAppointment(startTime, providerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myNp'] });
      queryClient.invalidateQueries({ queryKey: ['patientDashboard'] });
      Alert.alert('Success', 'Appointment booked successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('AppTabs', {
              screen: 'Home',
            });
          },
        },
      ]);
    },
    onError: err => {
      Alert.alert('Error', err.message || 'Failed to book appointment');
    },
  });

  const formatTime = isoString => {
    const d = new Date(isoString);
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleConfirm = () => {
    if (!selectedSlot) {
      Alert.alert(
        'Selection Required',
        'Please select a time slot to continue.',
      );
      return;
    }
    bookingMutation.mutate(selectedSlot.isoTime);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
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
            {providerAvatar ? (
              <Image
                source={{ uri: providerAvatar }}
                style={{ width: '90%', height: '90%' }}
                borderRadius={100}
                resizeMode="cover"
              />
            ) : (
              <ProfileIcon width={50} height={50} />
            )}
          </View>
          <Text style={styles.name}>{providerName}</Text>
          <Text style={styles.roleLabel}>YOUR CARE LEAD</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{providerTitle}</Text>
          </View>
        </View>

        {/* Time Selection Card */}
        <View style={styles.timeCard}>
          <Text style={styles.sectionHeader}>Select Available Time Slot</Text>
          <Text style={styles.selectedDate}>
            {dayjs(date).format('dddd MMMM D, YYYY')}
          </Text>

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={Colors.primary}
              style={{ marginVertical: 20 }}
            />
          ) : error ? (
            <Text
              style={{ color: 'red', textAlign: 'center', marginVertical: 20 }}
            >
              {error.message}
            </Text>
          ) : (
            <View style={styles.timeList}>
              {slots?.slots?.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedSlot(slot)}
                  style={[
                    styles.timeSlot,
                    selectedSlot?.isoTime === slot.isoTime &&
                      styles.selectedTimeSlot,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedSlot?.isoTime === slot.isoTime &&
                        styles.selectedTimeText,
                    ]}
                  >
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              ))}
              {slots?.slots?.length === 0 && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#6B7280',
                    marginVertical: 20,
                  }}
                >
                  No available slots for this date.
                </Text>
              )}
            </View>
          )}
        </View>

        <Button
          label="Confirm Appointment"
          variant={
            !selectedSlot || bookingMutation.isPending ? 'disabled' : 'primary'
          }
          onPress={handleConfirm}
          isLoading={bookingMutation.isPending}
          style={{ width: '100%' }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectTimeSlotScreen;
