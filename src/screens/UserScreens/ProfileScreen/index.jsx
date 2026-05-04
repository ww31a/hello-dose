import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react-native';
import dayjs from 'dayjs';
import FirstAidIcon from '../../../assets/icons/nurse-hat.svg';
import { authService } from '../../../api/services/auth';
import { patientService } from '../../../api/services/patient';

import styles from './styles';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const { data: dashboard } = useQuery({
    queryKey: ['patientDashboard'],
    queryFn: patientService.getDashboard,
  });

  const patient = dashboard?.patient;
  const np = dashboard?.assignedProvider;
  const program = dashboard?.programs?.[0]; // Show first program in header

  const handleLogout = async () => {
    await authService.logout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      }),
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Text style={styles.headerTitle}>Profile</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            {patient?.avatar ? (
              <Image
                source={{ uri: patient.avatar }}
                style={styles.avatar}
              />
            ) : (
              <Image
                source={require('../../../assets/images/profile-pic.png')}
                style={styles.avatar}
              />
            )}
          </View>
          <Text style={styles.name}>
            {patient?.firstName} {patient?.lastName}
          </Text>
          <Text style={styles.journeyStatus}>
            {program?.progressPercent || 0}% THROUGH YOUR JOURNEY
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Started {program?.startedAt ? dayjs(program.startedAt).format('MMM YYYY') : 'Oct 2025'}
            </Text>
          </View>
        </View>

        {/* OLD SINGLE PROGRAM CARD - COMMENTED OUT
        <View style={styles.card}>
          <Text style={styles.cardPreTitle}>ACTIVE PROGRAM</Text>
          <Text style={styles.programTitle}>{program?.name || 'Tirzepatide'}</Text>

          <Text style={styles.progressText}>
            {program?.monthsCompleted || 0} of {program?.durationMonths || 8} Months Completed
          </Text>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${program?.progressPercent || 0}%` }
              ]} 
            />
          </View>
        </View>
        */}

        {/* Active Programs Section */}
        <View style={styles.programsHeader}>
          <Text style={styles.sectionTitle}>Active Programs</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {dashboard?.programs?.map((prog, index) => (
          <TouchableOpacity
            key={prog._id || index}
            style={styles.programCard}
            onPress={() => 
              navigation.navigate('MyProgram', {
                programId: prog._id
              })
            }
          >
            <Text style={styles.cardTypeLabel}>
              {(prog.type || 'weight-loss').toUpperCase()}
            </Text>
            
            <View style={styles.cardMainRow}>
              <Text style={styles.programName}>{prog.name}</Text>
              <ChevronRight color="#CBD5E1" size={24} />
            </View>

            {prog.type === 'weight-loss' && (
              <>
                <Text style={styles.progressText}>
                  {prog.currentWeightLoss || 0} of {prog.targetWeightLoss || 0} Pounds Lost
                </Text>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { width: `${prog.progressPercent || 0}%` }
                    ]} 
                  />
                </View>
              </>
            )}

            <Text style={styles.nextInjectionOrange}>
              Next Injection in: {prog.healthInsights?.nextInjectionLabel || '4 days'}
            </Text>
          </TouchableOpacity>
        ))}

        {/* OLD NP DETAILS - COMMENTED OUT
        <Text style={styles.sectionHeader}>My NP Details</Text>
        <TouchableOpacity
          style={styles.npCard}
          onPress={() =>
            navigation.navigate('MyNP', { from: 'Profile' })
          }
        >
          <View style={styles.npIconWrapper}>
            {np?.avatar ? (
              <Image source={{ uri: np.avatar }} style={{ width: 50, height: 50, borderRadius: 25 }} />
            ) : (
              <FirstAidIcon width={50} height={50} color="#0D9488" />
            )}
          </View>
          <View style={styles.npContent}>
            <Text style={styles.npName}>{np?.name || 'Bracha Banayan'}</Text>
            <Text style={styles.npTitle}>{np?.title || 'Board Certified FNP'}</Text>
          </View>
          <ChevronRight color="#CBD5E1" size={20} />
        </TouchableOpacity>
        */}

        {/* Account Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardPreTitle}>ACCOUNT DETAILS</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{patient?.email || 'n•••••@example.com'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reorder Status</Text>
            <View style={styles.reorderBadge}>
              <Text style={styles.reorderBadgeText}>
                {program?.reorderStatus === 'eligible_now' ? 'Available Now' : 'Pending'}
              </Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Card on file</Text>
            <Text style={styles.detailValue}>
              {patient?.cardBrand || 'Visa'} ending in {patient?.cardLast4 || '1234'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Banner */}
      <View style={styles.footerBanner}>
        <TouchableOpacity>
          <Text style={styles.footerTextLeft}>Manage Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.footerTextRight}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
