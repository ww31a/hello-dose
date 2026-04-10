import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import Button from '../../../components/Button';

import styles from './styles';

const PatientProfileScreen = ({ navigation, route }) => {
  const { patient } = route.params;
  const [isScheduled, setIsScheduled] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color="#1E1E26" size={26} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Patient Profile</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.profileTop}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../../assets/images/profile-pic.png')}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.name}>{patient.name}</Text>
          <View style={styles.medTag}>
            <Text style={styles.medTagText}>{patient.drug}</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Started Oct 2025</Text>
          </View>
        </View>

        <View style={styles.stateToggleRow}>
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
        </View>

        <View style={styles.infoCard}>
          <View style={styles.cardContent}>
            <View style={styles.nextCheckinHeader}>
              <Text style={styles.cardPreTitle}>NEXT CHECKIN</Text>
              {isScheduled ? (
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>In 8 Days</Text>
                </View>
              ) : (
                <View style={styles.scheduleBtn}>
                  <Text style={styles.scheduleBtnText}>Schedule Now</Text>
                </View>
              )}
            </View>
            {isScheduled ? (
              <Text style={styles.nextCheckinValue}>
                Feb 20, 2026 <Text style={styles.nextCheckinTime}>at 3pm EST</Text>
              </Text>
            ) : (
              <Text style={styles.nextCheckinText}>No check-in scheduled</Text>
            )}
          </View>
        </View>

        <Button
          label="Request Check-in or Reorder"
          variant="primary"
          onPress={() => { }}
          style={styles.ctaButton}
        />

        <View style={styles.card}>
          <Text style={styles.cardPreTitle}>ACTIVE PROGRAM</Text>
          <Text style={styles.programTitle}>{patient.drug.charAt(0) + patient.drug.slice(1).toLowerCase()}</Text>
          <Text style={styles.progressText}>20 of 40 Pounds Lost</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: '50%' }]} />
          </View>
          <Text style={styles.lastReorder}>Last reorder: Feb 10, 2026</Text>
          <View style={styles.reorderBadge}>
            <View style={styles.reorderBadgeDot} />
            <Text style={styles.reorderBadgeText}>Eligible to reorder in 3 weeks</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardPreTitle}>HEALTH INSIGHTS</Text>
          <View style={styles.insightRow}>
            <View style={styles.insightBlock}>
              <Text style={styles.insightLabel}>LAST LOGGED</Text>
              <Text style={styles.insightValue}>{patient.lastWeight} {patient.lastWeightUnit}</Text>
              <Text style={styles.insightSub}>{patient.lastLoggedTime}</Text>
            </View>
            <View style={styles.insightBlock}>
              <Text style={styles.insightLabel}>TOTAL LOSS</Text>
              <Text style={styles.insightValueTeal}>{patient.totalLoss}%</Text>
              <Text style={styles.insightSub}>{patient.lossDate}</Text>
            </View>
          </View>

          <View style={styles.insightRow}>
            <View style={styles.insightBlock}>
              <Text style={styles.insightLabel}>DOSAGE</Text>
              <Text style={styles.insightValue}>2mg</Text>
              <Text style={styles.insightSub}>Last Injection: 1 day ago</Text>
            </View>
            <View style={styles.insightBlock}>
              <Text style={styles.insightLabel}>NEXT REFILL</Text>
              <Text style={styles.insightValue}>Feb 10</Text>
              <Text style={styles.insightSub}>In 3 weeks</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.cardPreTitle}>PATIENT DETAILS</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Gender</Text>
            <Text style={styles.detailValue}>{patient.gender}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Age</Text>
            <Text style={styles.detailValue}>{patient.age}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>natalia@example.com</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientProfileScreen;
