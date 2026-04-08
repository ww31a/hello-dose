import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { Colors } from '../../../theme';
import Button from '../../../components/Button';

// SVG Icons from assets/icons
import DrugIcon from '../../../assets/icons/drug.svg';
import CalendarIcon from '../../../assets/icons/calender-3.svg';
import NurseIcon from '../../../assets/icons/nurse-hat.svg';

import styles from './styles';

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
        <View style={styles.weightCard}>
          <TouchableOpacity 
            style={styles.weightContent}
            onPress={() => navigation.navigate('WeightTrend')}
          >
            <Text style={styles.weightLabel}>CURRENT WEIGHT</Text>
            <View style={styles.weightRow}>
              <Text style={styles.weightValue}>140.0</Text>
              <Text style={styles.weightUnit}>lbs</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.logWeightButton}
            onPress={() => navigation.navigate('WeightTrend')}
          >
            <Text style={styles.logWeightText}>Log Weight</Text>
          </TouchableOpacity>
        </View>

        {/* My NP Details */}
        <Text style={styles.sectionHeader}>My NP Details</Text>
        <TouchableOpacity 
          style={styles.npCard}
          onPress={() => navigation.navigate('MyNP')}
        >
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

export default MyProgramScreen;
