import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import {
  ChevronRight,
} from 'lucide-react-native';
import { Colors } from '../../../theme';
import Button from '../../../components/Button';

// SVG Icons from assets/icons
import BellIcon from '../../../assets/icons/bell-icon.svg';
import WalkIcon from '../../../assets/icons/walk-icon.svg';
import ForkKnifeIcon from '../../../assets/icons/forkknife-icon.svg';
import DropletIcon from '../../../assets/icons/droplet-icon.svg';
import FirstAidIcon from '../../../assets/icons/firstAID-icon.svg';
import HeartIcon from '../../../assets/icons/heart.svg';
import VideoPlayIcon from '../../../assets/icons/video-play.svg';

import styles from './styles';

const HomeScreen = () => {
  const navigation = useNavigation();

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
              textStyle={styles.cardButtonText}
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
            source={require('../../../assets/images/doctorPreview.png')}
            style={styles.doctorImage}
            imageStyle={styles.doctorImageStyle}
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

const ReminderItem = ({ icon: Icon, label, action }) => (
  <View style={styles.reminderItem}>
    <Icon width={40} height={40} style={styles.reminderIcon} />
    <View style={styles.reminderTextRow}>
      <View style={styles.reminderInline}>
        <Text style={styles.reminderLabel}>{label}</Text>
        {action && (
          <TouchableOpacity>
            <Text style={styles.reminderAction}>{action}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
);

export default HomeScreen;
