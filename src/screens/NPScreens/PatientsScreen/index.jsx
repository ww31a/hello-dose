import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react-native';

import styles from './styles';
import Tag from '../../../components/Tag';
import TickIcon from '../../../assets/icons/tick.svg';
import TimeIcon from '../../../assets/icons/time.svg';

const PATIENTS_DATA = [
  {
    id: '1',
    name: 'Natalia Ussher',
    gender: 'Female',
    age: 34,
    drug: 'TIRZEPATIDE',
    lastWeight: '184.2',
    lastWeightUnit: 'lbs',
    lastLoggedTime: 'Today',
    totalLoss: '-12.5',
    lossDate: 'Since Jan 12',
    eligible: true,
    eligibleText: 'Reorder Eligible Now',
  },
  {
    id: '2',
    name: 'Liam Chen',
    gender: 'Male',
    age: 41,
    drug: 'TIRZEPATIDE',
    lastWeight: '210.5',
    lastWeightUnit: 'lbs',
    lastLoggedTime: '2 days ago',
    totalLoss: '-8.3',
    lossDate: 'Since Feb 01',
    eligible: false,
    eligibleText: 'Eligible in 5 days',
  },
  {
    id: '3',
    name: 'James Wilson',
    gender: 'Male',
    age: 28,
    drug: 'SEMAGLUTIDE',
    lastWeight: '198.4',
    lastWeightUnit: 'lbs',
    lastLoggedTime: '1 week ago',
    totalLoss: '-18.2',
    lossDate: 'Since Nov 20',
    eligible: false,
    eligibleText: 'Eligible in 5 days',
  },
];

const PatientsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color="#1E1E26" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Active Patients</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search records..."
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Patient Cards */}
        {PATIENTS_DATA.map((patient) => (
          <View key={patient.id} style={styles.patientCard}>
            {/* Name + Tag */}
            <View style={styles.cardHeaderRow}>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Tag label={patient.drug} />
            </View>

            {/* Demographics */}
            <Text style={styles.demographics}>
              {patient.gender}, {patient.age}
            </Text>

            {/* Stats Blocks */}
            <View style={styles.statsRow}>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>LAST LOGGED</Text>
                <Text style={styles.statValue}>
                  {patient.lastWeight} <Text style={{ fontSize: 14 }}>{patient.lastWeightUnit}</Text>
                </Text>
                <Text style={styles.statSub}>{patient.lastLoggedTime}</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statLabel}>TOTAL LOSS</Text>
                <Text style={styles.statValueTeal}>
                  {patient.totalLoss} <Text style={{ fontSize: 14 }}>%</Text>
                </Text>
                <Text style={styles.statSub}>{patient.lossDate}</Text>
              </View>
            </View>

            {/* Eligibility Footer */}
            <TouchableOpacity
              style={styles.eligibilityRow}
              activeOpacity={patient.id === '1' ? 0.7 : 1}
              onPress={
                patient.id === '1'
                  ? () => navigation.navigate('PatientProfile')
                  : undefined
              }
            >
              <View style={styles.eligibilityLeft}>
                {patient.eligible ? (
                  <TickIcon width={20} height={20} color="#0D9488" />
                ) : (
                  <TimeIcon width={20} height={20} color="#64748B" />
                )}
                <Text style={patient.eligible ? styles.eligibleText : styles.pendingText}>
                  {patient.eligibleText}
                </Text>
              </View>
              <ChevronRight size={18} color={patient.eligible ? '#0D9488' : '#64748B'} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientsScreen;
