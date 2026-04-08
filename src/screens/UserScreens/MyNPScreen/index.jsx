import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Colors } from '../../../theme';
import Button from '../../../components/Button';
import ProfileIcon from '../../../assets/icons/Profile.svg';

import styles from './styles';

const MyNPScreen = () => {
  const navigation = useNavigation();

  // For demonstration, let's assume we can toggle between states
  // State 1: No check-in scheduled
  // State 2: Check-in scheduled (e.g., Feb 20, 2026)
  const isScheduled = false;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
          <Text style={styles.name}>Bracha Banayan</Text>
          <Text style={styles.roleLabel}>YOUR CARE LEAD</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Board Certified FNP</Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.cardsContainer}>
          {/* Next Check-in Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>NEXT CHECKIN</Text>
              {isScheduled ? (
                <Text style={styles.cardValue}>Feb 20, 2026 <Text style={{ fontSize: 14, fontFamily: 'PlusJakartaSans-Medium' }}>at 3pm EST</Text></Text>
              ) : (
                <Text style={[styles.cardValue, styles.placeholderValue]}>No check-in scheduled</Text>
              )}
            </View>

            {isScheduled ? (
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>In 8 Days</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.scheduleButton}
                onPress={() => navigation.navigate('ScheduleAppointment')}
              >
                <Text style={styles.scheduleButtonText}>Schedule Now</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* NP Since Card */}
          <View style={styles.infoCard}>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>NP SINCE</Text>
              <Text style={styles.cardValue}>December 2025</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <Button
          label="Request Check-in or Reorder"
          variant={isScheduled ? 'disabled' : 'primary'}
          onPress={() => { }}
          style={styles.ctaButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyNPScreen;
