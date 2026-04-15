import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
import { Colors } from '../../../theme';
import Button from '../../../components/Button';
import ProfileIcon from '../../../assets/icons/Profile.svg';
import { patientService } from '../../../api/services/patient';

import styles from './styles';

const MyNPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const openedFrom = route.params?.from;

  const { data, isLoading, error } = useQuery({
    queryKey: ['myNp'],
    queryFn: patientService.getMyNp,
  });

  if (isLoading) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading NP Details...</Text>
      </View>
    );
  }

  const provider = data?.provider;
  const appointment = data?.appointment;
  const isScheduled = !!appointment;

  const formatAppointmentDate = (dateString) => {
    if (!dateString) return '';
    return dayjs(dateString).tz('America/New_York').format('MMM D, YYYY');
  };

  const formatAppointmentTime = (dateString) => {
    if (!dateString) return '';
    return `at ${dayjs(dateString).tz('America/New_York').format('h:mm A')} EST`;
  };

  const handleBack = () => {
    if (openedFrom === 'Profile') {
      navigation.getParent()?.navigate('Profile');
      return;
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft color={Colors.dark} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My NP</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <ProfileIcon width={50} height={50} />
          </View>
          <Text style={styles.name}>{provider?.firstName} {provider?.lastName}</Text>
          <Text style={styles.roleLabel}>YOUR CARE LEAD</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{provider?.title || 'Board Certified FNP'}</Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.cardsContainer}>
          {/* <View style={styles.stateToggleRow}>
            <TouchableOpacity
              style={[styles.stateToggleBtn, !isScheduled && styles.stateToggleBtnActive]}
              onPress={() => setIsScheduled(false)}
            >
              <Text style={[styles.stateToggleText, !isScheduled && styles.stateToggleTextActive]}>
                No check-in
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.stateToggleBtn, isScheduled && styles.stateToggleBtnActive]}
              onPress={() => setIsScheduled(true)}
            >
              <Text style={[styles.stateToggleText, isScheduled && styles.stateToggleTextActive]}>
                Scheduled
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* Next Check-in Card */}
          <View style={[styles.infoCard, styles.nextCheckinCard]}>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>NEXT CHECKIN</Text>
              {isScheduled ? (
                <Text style={styles.cardValue}>
                  {appointment.formattedDate || formatAppointmentDate(appointment.startTime)}{' '}
                  <Text style={{ fontSize: 16, fontFamily: 'PlusJakartaSans-Regular', color: '#6B7280' }}>
                    {appointment.formattedTime ? `at ${appointment.formattedTime} EST` : formatAppointmentTime(appointment.startTime)}
                  </Text>
                </Text>
              ) : (
                <Text style={[styles.cardValue, styles.placeholderValue]}>No check-in scheduled</Text>
              )}
            </View>

            {isScheduled ? (
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>In {appointment.daysUntil} Days</Text>
              </View>
            ) : (
              <TouchableOpacity 
                style={styles.scheduleButton}
                onPress={() => navigation.navigate('ScheduleAppointment', { 
                  providerId: provider?._id,
                  providerName: `${provider?.firstName} ${provider?.lastName}`,
                  providerTitle: provider?.title || 'Board Certified FNP'
                })}
              >
                <Text style={styles.scheduleButtonText}>Schedule Now</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* NP Since Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>NP SINCE</Text>
              <Text style={styles.cardValue}>
                {provider?.npSince ? new Date(provider.npSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Join Date'}
              </Text>
            </View>
          </View>
        </View>

        <Button
          label="Request Check-in or Reorder"
          variant={isScheduled ? 'disabled' : 'primary'}
          onPress={() => navigation.navigate('ScheduleAppointment', { 
            providerId: provider?._id,
            providerName: `${provider?.firstName} ${provider?.lastName}`,
            providerTitle: provider?.title || 'Board Certified FNP'
          })}
          style={styles.ctaButton}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

export default MyNPScreen;
