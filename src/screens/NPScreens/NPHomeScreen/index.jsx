import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Calendar } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Tag from '../../../components/Tag';
import VideoCallIcon from '../../../assets/icons/video-call.svg';
import { useQuery } from '@tanstack/react-query';
import { providerService } from '../../../api/services/provider';
import { Colors } from '../../../theme';

const NPHomeScreen = () => {
  const navigation = useNavigation();

  const {
    data: dashboard,
    isLoading,
  } = useQuery({
    queryKey: ['providerDashboard'],
    queryFn: providerService.getDashboard,
  });

  const formattedStartTime = dashboard?.nextAppointment?.startTime
    ? new Date(dashboard.nextAppointment.startTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const formatTimeParts = time => {
    const date = new Date(time);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`;
    return { time: formattedTime, ampm };
  };

  const formatDateLabel = time => {
    const date = new Date(time);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return 'TODAY';
    
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }).toUpperCase();
  };

  if (isLoading) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const hasUpcoming = dashboard?.upcomingAppointments && dashboard.upcomingAppointments.length > 0;
  const hasNext = !!dashboard?.nextAppointment;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.welcomeText}>
              Welcome back,
              {dashboard?.providerName ? ` ${dashboard.providerName}` : ''}
            </Text>
            <Text style={styles.subtitleText}>
              {hasNext 
                ? `Your next appointment is ${formatDateLabel(dashboard.nextAppointment.startTime)} at ${formattedStartTime}.`
                : 'No appointments scheduled for today.'}
            </Text>
          </View>

          {/* Next Appointment Card */}
          {hasNext && (
            <View style={styles.nextCard}>
              <View style={styles.nextHeaderRow}>
                <View style={styles.nextLabelBox}>
                  <View style={styles.nextDot} />
                  <Text style={styles.nextLabel}>NEXT APPOINTMENT</Text>
                </View>
                <View style={styles.timePill}>
                  <Text style={styles.timePillText}>{formattedStartTime}</Text>
                </View>
              </View>

              <Text style={styles.patientNameLarge}>
                {dashboard.nextAppointment.patientName}
              </Text>

              <View style={styles.tagsRow}>
                <Tag label="FOLLOW-UP" />
                <Tag label={dashboard.nextAppointment.programName} />
              </View>

              <TouchableOpacity
                style={styles.startButton}
                onPress={() => {
                  const url = dashboard.nextAppointment.meetingLink;
                  if (url) Linking.openURL(url);
                }}
              >
                <Text style={styles.startButtonText}>Start Consultation</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Upcoming Section */}
          <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>
            Upcoming Appointments
          </Text>

          {hasUpcoming ? (
            <View style={styles.upcomingList}>
              {dashboard.upcomingAppointments.map(appt => {
                const { time, ampm } = formatTimeParts(appt.startTime);
                const dateLabel = formatDateLabel(appt.startTime);

                return (
                  <View key={appt._id} style={styles.upcomingCard}>
                    <View style={styles.timeColumn}>
                      <Text style={styles.timeText}>{time}</Text>
                      <Text style={styles.ampmText}>{ampm}</Text>
                      {dateLabel !== 'TODAY' && (
                        <Text style={[styles.ampmText, { color: '#0D9488', fontSize: 10, marginTop: 2 }]}>{dateLabel}</Text>
                      )}
                    </View>

                    <View style={styles.verticalDivider} />

                    <View style={styles.patientInfo}>
                      <Text style={styles.upcomingName}>
                        {appt.patientName}
                      </Text>
                      <Text style={styles.upcomingReason}>
                        {appt.appointmentType} • {appt.programName}
                      </Text>
                    </View>

                    <TouchableOpacity onPress={() => {
                      if (appt.meetingLink) Linking.openURL(appt.meetingLink);
                    }}>
                      <VideoCallIcon width={50} height={50} color="#0D9488" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          ) : !hasNext ? (
            /* Fallback Design when no future appointments exist */
            <View style={styles.fallbackContainer}>
              <View style={styles.fallbackIconCircle}>
                <Calendar size={32} color="#94A3B8" />
              </View>
              <Text style={styles.fallbackTitle}>No Upcoming Appointments</Text>
              <Text style={styles.fallbackSubtitle}>
                You're all caught up! New appointments will appear here once they're booked.
              </Text>
            </View>
          ) : (
            <Text style={styles.emptyText}>No other appointments scheduled.</Text>
          )}

          {/* Active Patients Search */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Active Patients</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Patients', { screen: 'PatientsList' })
              }
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search records..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NPHomeScreen;
