import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Svg, { Circle, G } from 'react-native-svg';
import dayjs from 'dayjs';
import { Colors } from '../../../theme';
import { patientService } from '../../../api/services/patient';
// SVG Icons from assets/icons
import DrugIcon from '../../../assets/icons/drug.svg';
import CalendarIcon from '../../../assets/icons/calender-3.svg';
import NurseIcon from '../../../assets/icons/nurse-hat.svg';

import styles from './styles';

const MyProgramScreen = () => {
  const navigation = useNavigation();

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['patientDashboard'],
    queryFn: patientService.getDashboard,
  });

  if (isLoading) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Loading Program...</Text>
      </View>
    );
  }

  const program = dashboard?.program;
  const health = dashboard?.healthInsights;
  const progress = program?.progressPercent ? program.progressPercent / 100 : 0.5;

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
            <CircularProgress size={160} strokeWidth={15} progress={progress} />
            <View style={styles.gaugeTextContainer}>
              <Text style={styles.gaugeValue}>{Math.round(progress * 100)}%</Text>
              <Text style={styles.gaugeLabel}>GOAL PROGRESS</Text>
            </View>
          </View>
          <Text style={styles.programTitle}>{program?.name || 'DROP Tirzepatide'}</Text>
          <Text style={styles.programSubtitle}>
            {program?.currentWeightLoss || 0} of {program?.targetWeightLoss || 0} Pounds Lost
          </Text>
        </View>

        {/* Info Cards Row */}
        <View style={styles.infoRow}>
          <InfoCard
            icon={DrugIcon}
            label="DOSAGE"
            value={health?.currentDosage || '0mg'}
            subValue={
              health?.lastInjectionAt 
                ? (health.daysSinceLastInjection === 0 ? 'Last Injection: Today' 
                  : health.daysSinceLastInjection === 1 ? 'Last Injection: Yesterday' 
                  : `Last Injection: ${health.daysSinceLastInjection} days ago`) 
                : 'No injections logged'
            }
            onPress={() => navigation.navigate('InjectionLogs')}
          />
          <InfoCard
            icon={CalendarIcon}
            label="NEXT REFILL"
            value={health?.nextRefillDate ? dayjs(health.nextRefillDate).format('MMM D') : 'Pending'}
            subValue={health?.nextRefillLabel || 'Refill eligibility'}
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
              <Text style={styles.weightValue}>{health?.lastLoggedWeight || '000.0'}</Text>
              <Text style={styles.weightUnit}>{health?.lastLoggedUnit || 'lbs'}</Text>
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
          onPress={() => navigation.navigate('MyNP', { from: 'MyProgram' })}
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

const InfoCard = ({ icon: Icon, label, value, subValue, onPress }) => (
  <Pressable
    style={({ pressed }) => [
      styles.infoCard,
      onPress && styles.infoCardInteractive,
      pressed && onPress && styles.infoCardPressed,
    ]}
    onPress={onPress}
    disabled={!onPress}
  >
    <View style={styles.infoCardTopRow}>
      <View style={styles.infoCardHeader}>
        <Icon width={30} height={30} />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      {onPress ? <ChevronRight color="#94A3B8" size={18} /> : null}
    </View>
    <Text style={styles.infoValue}>{value}</Text>
    <Text style={styles.infoSubValue}>{subValue}</Text>
  </Pressable>
);

export default MyProgramScreen;
