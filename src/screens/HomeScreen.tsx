import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ChevronRight,
  ArrowRight
} from 'lucide-react-native';
import { Colors, Typography } from '../theme';
import Button from '../components/Button';

// SVG Icons from assets/icons
import BellIcon from '../assets/icons/bell-icon.svg';
import WalkIcon from '../assets/icons/walk-icon.svg';
import ForkKnifeIcon from '../assets/icons/forkknife-icon.svg';
import DropletIcon from '../assets/icons/droplet-icon.svg';
import FirstAidIcon from '../assets/icons/firstAID-icon.svg';
import HeartIcon from '../assets/icons/heart.svg';
import VideoPlayIcon from '../assets/icons/video-play.svg';
import CalendarIcon from '../assets/icons/calender.svg';

import { RootStackParamList } from '../navigation/RootNavigator';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome back, Natalia</Text>
        </View>

        {/* Current Program Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>YOUR CURRENT PROGRAM</Text>
          </View>
          <TouchableOpacity 
            style={styles.programRow}
            onPress={() => navigation.navigate('MyProgram')}
          >
            <Text style={styles.programTitle}>DROP Tirzepatide</Text>
            <ChevronRight color={Colors.dark} size={24} />
          </TouchableOpacity>
          <Text style={styles.cardSubtitle}>Last Injection: 3 days ago</Text>

          <View style={styles.buttonRow}>
            <Button
              label="Log Injection"
              variant="primary"
              onPress={() => navigation.navigate('LogInjection')}
              style={styles.cardButton}
            />
            <Button
              label="Reorder"
              variant="secondary"
              onPress={() => { }}
              style={styles.cardButton}
            />
          </View>
        </View>

        {/* Daily Reminders Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>DAILY REMINDERS</Text>
            <BellIcon width={18} height={18} />
          </View>
          <Text style={styles.reminderWait}>Your Next Injection is in</Text>
          <Text style={styles.reminderTitle}>4 days</Text>

          <View style={styles.reminderList}>
            <ReminderItem
              icon={WalkIcon}
              label="Walk 10k steps a day"
            />
            <ReminderItem
              icon={ForkKnifeIcon}
              label="Protein is essential"
            />
            <ReminderItem
              icon={DropletIcon}
              label="Stay Hydrated"
              action="Book a drip?"
            />
          </View>
        </View>

        {/* Something on Your Mind? */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Something on Your Mind?</Text>
        </View>
        <View style={styles.actionCard}>
          <FirstAidIcon width={50} height={50} style={styles.actionIcon} />
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Ask an NP</Text>
            <Text style={styles.actionSubtitle}>Get answers from a Nurse Practitioner</Text>
          </View>
          <ChevronRight color="#CBD5E1" size={20} />
        </View>

        {/* Coming Up Section */}
        <View style={styles.sectionHeader}>
        </View>
        <View style={styles.comingUpCard}>
          <View style={styles.comingUpHeader}>
            <View>
              <Text style={styles.sectionTitle}>Coming up</Text>
              <Text style={styles.comingUpText}>Join our webinar in 10 days.</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Webinar</Text>
            </View>
          </View>

          <ImageBackground
            source={require('../assets/images/doctorPreview.png')}
            style={styles.doctorImage}
            imageStyle={{ borderRadius: 16 }}
          >
            <VideoPlayIcon width={80} height={80} />
          </ImageBackground>
        </View>

        {/* Refer a Friend Button */}
        <TouchableOpacity style={styles.referButton}>
          <HeartIcon width={24} height={24} />
          <Text style={styles.referText}>REFER A FRIEND</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const ReminderItem = ({ icon: Icon, label, action }: any) => (
  <View style={styles.reminderItem}>
    <Icon width={40} height={40} style={styles.reminderIcon} />
    <View style={styles.reminderTextRow}>
      <Text style={styles.reminderLabel}>{label}</Text>
      {action && (
        <TouchableOpacity>
          <Text style={styles.reminderAction}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  programRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  programTitle: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardButton: {
    flex: 1,
    height: 48,
    marginVertical: 0,
  },
  reminderWait: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginBottom: 4,
  },
  reminderTitle: {
    fontSize: 32,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 20,
  },
  reminderList: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  reminderIcon: {
    marginRight: 10,
  },
  reminderTextRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.dark,
  },
  reminderAction: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    textDecorationLine: 'underline',
  },
  sectionHeader: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  actionCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIcon: {
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  actionSubtitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  comingUpCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  comingUpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  comingUpText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#6B7280',
    marginTop: 4,
    flex: 1,
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary,
  },
  doctorImage: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  referButton: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 10,
  },
  referText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    letterSpacing: 1,
  },
});

export default HomeScreen;
