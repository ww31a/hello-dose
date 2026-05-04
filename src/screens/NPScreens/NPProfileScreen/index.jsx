import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import ActivePatientIcon from '../../../assets/icons/active-patient.svg';
import GreenTimeIcon from '../../../assets/icons/gree-time.svg';
import { authService } from '../../../api/services/auth';
import { providerService } from '../../../api/services/provider';
import { Colors } from '../../../theme';

import styles from './styles';

const NPProfileScreen = () => {
  const navigation = useNavigation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['providerProfile'],
    queryFn: providerService.getProfile,
  });

  const { data: availability, isLoading: isAvailabilityLoading } = useQuery({
    queryKey: ['providerAvailability'],
    queryFn: providerService.getAvailability,
  });

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        })
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isCurrentlyOnShift = availability?.isCurrentlyOnShift ?? true;
  const shiftEndTime = availability?.shiftEndTime || '5:00 PM';
  const availabilityTitle = isCurrentlyOnShift ? 'Currently On Shift' : 'Off Shift';
  const availabilitySub = isCurrentlyOnShift ? `Ends at ${shiftEndTime} today` : 'Not scheduled for today';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Text style={styles.headerTitle}>Profile</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {profile?.avatar ? (
              <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            ) : (
              <Image
                source={require('../../../assets/images/Np-Profile-Pic.png')}
                style={styles.avatar}
              />
            )}
          </View>
          <Text style={styles.name}>{`${profile?.firstName || 'Bracha'} ${profile?.lastName || 'Banayan'}`}</Text>
          <Text style={styles.roleLabel}>{profile?.title?.toUpperCase() || 'BOARD CERTIFIED FNP'}</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>NPI:{profile?.npi || '12345678899'}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.activeLeft}>
            <View style={styles.activeIconWrapper}>
              <ActivePatientIcon width={18} height={18} />
            </View>
            <Text style={styles.activeLabel}>ACTIVE PATIENTS</Text>
          </View>
          <Text style={styles.activeCount}>{profile?.activePatientsCount ?? 34}</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.availabilityHeader}>
            <Text style={styles.cardLabel}>AVAILABILITY</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ManageSchedule')}>
              <Text style={styles.manageLink}>Manage Schedule</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.availabilityRow}>
            <View style={[styles.clockIconWrapper, !isCurrentlyOnShift && { backgroundColor: '#F1F5F9' }]}>
              <GreenTimeIcon width={22} height={22} color={isCurrentlyOnShift ? Colors.primary : '#94A3B8'} />
            </View>
            <View style={styles.availabilityTextWrap}>
              <Text style={styles.availabilityTitle}>{availabilityTitle}</Text>
              <Text style={styles.availabilitySub}>{availabilitySub}</Text>
            </View>
            {isCurrentlyOnShift && <View style={styles.onlineDot} />}
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.cardLabel}>ACCOUNT DETAILS</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{profile?.email || 'b•••••@example.com'}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerBanner}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Manage Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? (
            <ActivityIndicator size="small" color="#0D9488" />
          ) : (
            <Text style={styles.footerText}>Log Out</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NPProfileScreen;
