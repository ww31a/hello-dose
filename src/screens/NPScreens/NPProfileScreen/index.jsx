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
import { Users, Clock3 } from 'lucide-react-native';

import styles from './styles';

const NPProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Text style={styles.headerTitle}>Profile</Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../../assets/images/profile-pic.png')}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>Bracha Banayan</Text>
          <Text style={styles.roleLabel}>BOARD CERTIFIED FNP</Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>NPI:12345678899</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.activeLeft}>
            <View style={styles.activeIconWrapper}>
              <Users size={18} color="#60A5FA" />
            </View>
            <Text style={styles.activeLabel}>ACTIVE PATIENTS</Text>
          </View>
          <Text style={styles.activeCount}>34</Text>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.availabilityHeader}>
            <Text style={styles.cardLabel}>AVAILABILITY</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ManageSchedule')}>
              <Text style={styles.manageLink}>Manage Schedule</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.availabilityRow}>
            <View style={styles.clockIconWrapper}>
              <Clock3 size={20} color="#0D9488" />
            </View>
            <View style={styles.availabilityTextWrap}>
              <Text style={styles.availabilityTitle}>Currently On Shift</Text>
              <Text style={styles.availabilitySub}>Ends at 5:00 PM today</Text>
            </View>
            <View style={styles.onlineDot} />
          </View>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.cardLabel}>ACCOUNT DETAILS</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>b•••••@example.com</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerBanner}>
        <TouchableOpacity>
          <Text style={styles.footerText}>Manage Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.footerText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NPProfileScreen;
