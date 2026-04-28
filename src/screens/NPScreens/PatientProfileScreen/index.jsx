import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import Button from '../../../components/Button';
import Tag from '../../../components/Tag';

import styles from './styles';

const PatientProfileScreen = ({ navigation, route }) => {
  const { patient: item } = route.params;
  const [isScheduled, setIsScheduled] = useState(false);

  const patient = item.patient;
  const fullName = `${patient.firstName} ${patient.lastName}`;
  const isNatalia = fullName === 'Natalia Ussher';

  // Use real data from the API (which we fetched in getPatients)
  const programs = item.activePrograms || [];
  const hasMultiplePrograms = programs.length > 1;

  // Single program fallback for display logic (initial design)
  const singleProgram = programs.length > 0 ? programs[0] : { name: 'Tirzepatide', type: 'weight-loss' };
  const drugName = singleProgram.name;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ChevronLeft color="#1E1E26" size={26} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Patient Profile</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Profile Top */}
        <View style={styles.profileTop}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../../assets/images/profile-pic.png')}
              style={styles.avatarImage}
            />
          </View>
          <Text style={styles.name}>{fullName}</Text>
          
          <View style={styles.tagsContainer}>
            {programs.map((prog, idx) => (
              <Tag key={idx} label={prog.name.toUpperCase()} />
            ))}
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Started Oct 2025</Text>
          </View>
        </View>

        {/* For single plan, we show the toggle as in initial design */}
        {/* {!hasMultiplePrograms && (
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
        )} */}

        {/* Next Checkin Card */}
        <View style={styles.infoCard}>
          <View style={styles.cardContent}>
            <View style={styles.nextCheckinHeader}>
              <Text style={styles.cardPreTitle}>NEXT CHECKIN</Text>
              {isScheduled ? (
                <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>In 8 Days</Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.scheduleBtn}>
                  <Text style={styles.scheduleBtnText}>Schedule Now</Text>
                </TouchableOpacity>
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
          label={isScheduled ? "Reschedule" : "Request Check-in or Reorder"}
          variant="primary"
          onPress={() => { }}
          style={styles.ctaButton}
        />

        {/* ACTIVE PROGRAMS SECTION (Conditional Layout) */}
        {hasMultiplePrograms ? (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Programs</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllLink}>View All</Text>
              </TouchableOpacity>
            </View>

            {programs.map((prog, idx) => {
              const nameUp = prog.name?.toUpperCase() || '';
              const isWeightLoss = nameUp.includes('TIRZEPATIDE') || nameUp.includes('SEMAGLUTIDE');
              
              if (isWeightLoss) {
                return (
                  <View key={idx} style={styles.programCard}>
                    <Text style={styles.cardPreTitle}>WEIGHT-LOSS</Text>
                    <Text style={styles.programTitle}>DROP {prog.name}</Text>
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
                );
              }

              return (
                <View key={idx} style={styles.programCardSmall}>
                  <Text style={styles.cardPreTitle}>PEPTIDE</Text>
                  <Text style={styles.programTitleSmall}>{prog.name}</Text>
                </View>
              );
            })}

            <View style={styles.insightsSection}>
              <Text style={styles.sectionTitle}>HEALTH INSIGHTS</Text>
              {programs.map((prog, idx) => (
                <View key={idx} style={styles.insightGroup}>
                  <Tag label={prog.name.toUpperCase()} />
                  {prog.name.toUpperCase().includes('TIRZEPATIDE') && (
                    <View style={styles.insightRow}>
                      <View style={styles.insightBlock}>
                        <Text style={styles.insightLabel}>LAST LOGGED</Text>
                        <Text style={styles.insightValue}>184.2 <Text style={{fontSize: 12}}>lbs</Text></Text>
                        <Text style={styles.insightSub}>Today</Text>
                      </View>
                      <View style={styles.insightBlock}>
                        <Text style={styles.insightLabel}>TOTAL LOSS</Text>
                        <Text style={styles.insightValueTeal}>-12.5 %</Text>
                        <Text style={styles.insightSub}>Since Jan 12</Text>
                      </View>
                    </View>
                  )}
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
              ))}
            </View>
          </>
        ) : (
          /* INITIAL DESIGN FOR SINGLE PLAN */
          <>
            <View style={styles.card}>
              <Text style={styles.cardPreTitle}>ACTIVE PROGRAM</Text>
              <Text style={styles.programTitle}>{drugName ? (drugName.charAt(0).toUpperCase() + drugName.slice(1).toLowerCase()) : ''}</Text>
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
                  <Text style={styles.insightValue}>184.2 lbs</Text>
                  <Text style={styles.insightSub}>Today</Text>
                </View>
                <View style={styles.insightBlock}>
                  <Text style={styles.insightLabel}>TOTAL LOSS</Text>
                  <Text style={styles.insightValueTeal}>-12.5%</Text>
                  <Text style={styles.insightSub}>Since Jan 12</Text>
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
          </>
        )}

        {/* Patient Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardPreTitle}>PATIENT DETAILS</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Gender</Text>
            <Text style={styles.detailValue}>{patient.gender || 'Female'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Age</Text>
            <Text style={styles.detailValue}>{patient.age || 34}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{patient.email}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientProfileScreen;
