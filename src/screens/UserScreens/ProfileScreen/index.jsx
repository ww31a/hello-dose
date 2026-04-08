import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'lucide-react-native';
import FirstAidIcon from '../../../assets/icons/firstAID-icon.svg';

import styles from './styles';

const ProfileScreen = () => {
  const navigation = useNavigation();

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
            <Image
              source={require('../../../assets/images/profile-pic.png')}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>Natalia Ussher</Text>
          <Text style={styles.journeyStatus}>50% THROUGH YOUR JOURNEY</Text>
          
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Started Oct 2025</Text>
          </View>
        </View>

        {/* Active Program Card */}
        <View style={styles.card}>
          <Text style={styles.cardPreTitle}>ACTIVE PROGRAM</Text>
          <Text style={styles.programTitle}>Tirzepatide</Text>
          
          <Text style={styles.progressText}>4 of 8 Months Completed</Text>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBarFill, { width: '50%' }]} />
          </View>
        </View>

        {/* My NP Details */}
        <Text style={styles.sectionHeader}>My NP Details</Text>
        <TouchableOpacity 
          style={styles.npCard}
          onPress={() => navigation.navigate('Home', { screen: 'MyNP' })}
        >
          <View style={styles.npIconWrapper}>
            <FirstAidIcon width={24} height={24} color="#0D9488" />
          </View>
          <View style={styles.npContent}>
            <Text style={styles.npName}>Bracha Banayan</Text>
            <Text style={styles.npTitle}>Board Certified FNP</Text>
          </View>
          <ChevronRight color="#CBD5E1" size={20} />
        </TouchableOpacity>

        {/* Account Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.cardPreTitle}>ACCOUNT DETAILS</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>n•••••@example.com</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reorder Status</Text>
            <View style={styles.reorderBadge}>
              <Text style={styles.reorderBadgeText}>Available in 3w</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Footer Banner */}
      <View style={styles.footerBanner}>
        <TouchableOpacity>
          <Text style={styles.footerTextLeft}>Manage Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
         <Text style={styles.footerTextRight}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
