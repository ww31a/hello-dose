import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import Button from '../../../components/Button';

import styles from './styles';

const PatientProfileScreen = ({ navigation }) => {
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
          <Text style={styles.name}>Natalia Ussher</Text>
          <View style={styles.medTag}>
            <Text style={styles.medTagText}>TIRZEPATIDE</Text>
          </View>
          <View style={styles.badge}><Text style={styles.badgeText}>Started Oct 2025</Text></View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardPreTitle}>ACTIVE PROGRAM</Text>
          <Text style={styles.programTitle}>Tirzepatide</Text>
          <Text style={styles.progressText}>4 of 8 Months Completed</Text>
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
        </View>

        <View style={styles.infoCard}>
          <View style={styles.nextCheckinRow}>
            <View>
              <Text style={styles.cardPreTitle}>NEXT CHECKIN</Text>
              <Text style={styles.nextCheckinText}>No check-in scheduled</Text>
            </View>
            <TouchableOpacity style={styles.scheduleBtn}>
              <Text style={styles.scheduleBtnText}>Schedule Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          label="Request Check-in or Reorder"
          variant="primary"
          onPress={() => {}}
          style={styles.ctaButton}
        />

        <View style={styles.detailsCard}>
          <Text style={styles.cardPreTitle}>PATIENT DETAILS</Text>
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
