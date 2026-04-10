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
import Button from '../../../components/Button';
import ProfileIcon from '../../../assets/icons/Profile.svg';

import styles from './styles';

const MyNPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isScheduled, setIsScheduled] = useState(false);
  const openedFrom = route.params?.from;

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
          <Text style={styles.name}>Bracha Banayan</Text>
          <Text style={styles.roleLabel}>YOUR CARE LEAD</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Board Certified FNP</Text>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.cardsContainer}>
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

          {/* Next Check-in Card */}
          <View style={[styles.infoCard, styles.nextCheckinCard]}>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>NEXT CHECKIN</Text>
              {isScheduled ? (
                <Text style={styles.cardValue}>Feb 20, 2026 <Text style={{ fontSize: 16, fontFamily: 'PlusJakartaSans-Regular', color: '#6B7280' }}>at 3pm EST</Text></Text>
              ) : (
                <Text style={[styles.cardValue, styles.placeholderValue]}>No check-in scheduled</Text>
              )}
            </View>

            {isScheduled ? (
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>In 8 Days</Text>
              </View>
            ) : (
              <View style={styles.scheduleButton}>
                <Text style={styles.scheduleButtonText}>Schedule Now</Text>
              </View>
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

        <Button
          label="Request Check-in or Reorder"
          variant={isScheduled ? 'disabled' : 'primary'}
          onPress={() => navigation.navigate('ScheduleAppointment')}
          style={styles.ctaButton}
        />

      </ScrollView>
    </SafeAreaView>
  );
};

export default MyNPScreen;
