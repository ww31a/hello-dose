import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';

import styles from './styles';
import Tag from '../../../components/Tag';
import VideoCallIcon from '../../../assets/icons/video-call.svg';

const NPHomeScreen = () => {
  // Mock Data
  const upcomingAppointments = [
    {
      id: '1',
      timeStr: '6:00',
      ampm: 'PM',
      name: 'Liam Chen',
      reason: 'Intake Assessment',
    },
    {
      id: '2',
      timeStr: '7:00',
      ampm: 'PM',
      name: 'Jessica Wright',
      reason: 'Meds Reorder',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome back, Bracha</Text>
          <Text style={styles.subtitleText}>You have 3 appointments today.</Text>
        </View>

        {/* Next Appointment Card */}
        <View style={styles.nextCard}>
          <View style={styles.nextHeaderRow}>
            <View style={styles.nextLabelBox}>
              <View style={styles.nextDot} />
              <Text style={styles.nextLabel}>NEXT APPOINTMENT</Text>
            </View>
            <View style={styles.timePill}>
              <Text style={styles.timePillText}>5:00 PM</Text>
            </View>
          </View>

          <Text style={styles.patientNameLarge}>Natalia Ussher</Text>

          <View style={styles.tagsRow}>
            <Tag label="FOLLOW-UP" />
            <Tag label="TIRZEPATIDE" />
          </View>

          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Consultation</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Today */}
        <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Upcoming Today</Text>
        <View style={styles.upcomingList}>
          {upcomingAppointments.map((appt) => (
            <View key={appt.id} style={styles.upcomingCard}>
              <View style={styles.timeColumn}>
                <Text style={styles.timeText}>{appt.timeStr}</Text>
                <Text style={styles.ampmText}>{appt.ampm}</Text>
              </View>

              <View style={styles.verticalDivider} />

              <View style={styles.patientInfo}>
                <Text style={styles.upcomingName}>{appt.name}</Text>
                <Text style={styles.upcomingReason}>{appt.reason}</Text>
              </View>

              <TouchableOpacity>
                <VideoCallIcon width={50} height={50} color="#0D9488" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Active Patients Search */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Active Patients</Text>
          <TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default NPHomeScreen;
