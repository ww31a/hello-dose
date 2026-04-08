import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { Colors, Typography } from '../theme';
import Button from '../components/Button';

// SVG Icons from assets/icons
import DrugIcon from '../assets/icons/drug.svg';
import CalendarIcon from '../assets/icons/calender-3.svg';
import NurseIcon from '../assets/icons/nurse-hat.svg';

const MyProgramScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={Colors.dark} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Program</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Goal Progress Card */}
        <View style={styles.mainCard}>
          <View style={styles.gaugeContainer}>
            <CircularProgress size={160} strokeWidth={15} progress={0.5} />
            <View style={styles.gaugeTextContainer}>
              <Text style={styles.gaugeValue}>50%</Text>
              <Text style={styles.gaugeLabel}>GOAL PROGRESS</Text>
            </View>
          </View>
          <Text style={styles.programTitle}>DROP Tirzepatide</Text>
          <Text style={styles.programSubtitle}>4 of 8 Months Completed</Text>
        </View>

        {/* Info Cards Row */}
        <View style={styles.infoRow}>
          <InfoCard
            icon={DrugIcon}
            iconBg="#EFF6FF"
            label="DOSAGE"
            value="2mg"
            subValue="Last: 1 day ago"
          />
          <InfoCard
            icon={CalendarIcon}
            iconBg="#FEFCE8"
            label="NEXT REFILL"
            value="Feb 10"
            subValue="In 3 weeks"
          />
        </View>

        {/* Weight Logging Card */}
        <TouchableOpacity
          style={styles.weightCard}
          onPress={() => navigation.navigate('WeightTrend')}
        >
          <View style={styles.weightContent}>
            <Text style={styles.weightLabel}>CURRENT WEIGHT</Text>
            <View style={styles.weightRow}>
              <Text style={styles.weightValue}>140.0</Text>
              <Text style={styles.weightUnit}>lbs</Text>
            </View>
          </View>
          <View style={styles.logWeightButton}>
            <Text style={styles.logWeightText}>Log Weight</Text>
          </View>
        </TouchableOpacity>

        {/* My NP Details */}
        <Text style={styles.sectionHeader}>My NP Details</Text>
        <TouchableOpacity style={styles.npCard}>
          <View style={styles.npIconWrapper}>
            <NurseIcon width={50} height={50} />
          </View>
          <View style={styles.npContent}>
            <Text style={styles.npName}>Bracha Banayan</Text>
            <Text style={styles.npTitle}>Board Certified FNP</Text>
          </View>
          <ChevronRight color="#CBD5E1" size={20} />
        </TouchableOpacity>

        {/* Action Button */}
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('LogInjection')}
          >
            <Text style={styles.actionButtonText}>Log Injection</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CircularProgress = ({ size, strokeWidth, progress }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <Svg width={size} height={size}>
      <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F1F5F9"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={Colors.primary}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </G>
    </Svg>
  );
};

const InfoCard = ({ icon: Icon, iconBg, label, value, subValue }) => (
  <View style={styles.infoCard}>
    <View style={styles.infoCardHeader}>
      <Icon width={30} height={30} />
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
    <Text style={styles.infoValue}>{value}</Text>
    <Text style={styles.infoSubValue}>{subValue}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  headerRight: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100, // Extra space for FAB
  },
  mainCard: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  gaugeContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  gaugeTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  gaugeValue: {
    fontSize: 36,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  gaugeLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  programTitle: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 4,
  },
  programSubtitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  infoIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 4,
  },
  infoSubValue: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
  },
  weightCard: {
    backgroundColor: '#1E1E26',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  weightContent: {
    flex: 1,
  },
  weightLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  weightRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  weightValue: {
    fontSize: 32,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.white,
  },
  weightUnit: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
  },
  logWeightButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  logWeightText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 16,
  },
  npCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  npIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  npContent: {
    flex: 1,
  },
  npName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  npTitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
  },
  actionButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 24,
  },
  actionButton: {
    backgroundColor: Colors.dark,
    paddingHorizontal: 24,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.white,
  },
});

export default MyProgramScreen;
