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
import { useQuery } from '@tanstack/react-query';

import styles from './styles';
import Tag from '../../../components/Tag';
// import TickIcon from '../../../assets/icons/tick.svg';
// import TimeIcon from '../../../assets/icons/time.svg';
import { providerService } from '../../../api/services/provider';

const PatientsScreen = ({ navigation }) => {
  const { data: patients, isLoading } = useQuery({
    queryKey: ['activePatients'],
    queryFn: providerService.getPatients,
  });

  const renderPatientCard = (item) => {
    const { patient, activePrograms } = item;
    const fullName = `${patient.firstName} ${patient.lastName}`;
    
    // Use all active programs from the backend
    const tags = activePrograms?.map(p => p.name.toUpperCase()) || [];

    return (
      <TouchableOpacity
        key={patient._id}
        style={styles.patientCard}
        onPress={() => navigation.navigate('PatientProfile', { patient: item })}
        activeOpacity={0.8}
      >
        <View style={styles.cardMainContent}>
          <View style={styles.cardLeftColumn}>
            <Text style={styles.patientName}>{fullName}</Text>
            <Text style={styles.demographics}>
              {patient.gender || 'Female'}, {patient.age || 34}
            </Text>
          </View>
          <ChevronRight size={24} color="#1E1E26" />
        </View>

        {/* Tags Row - Now displaying all active programs */}
        <View style={styles.tagsRow}>
          {tags.map((tag, idx) => (
            <Tag key={idx} label={tag} />
          ))}
        </View>

        {/* Stats Blocks (Commented out as requested) */}
        {/* 
        <View style={styles.statsRow}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>LAST LOGGED</Text>
            <Text style={styles.statValue}>
              {item.healthInsights?.lastLoggedWeight} <Text style={{ fontSize: 14 }}>{item.healthInsights?.lastLoggedUnit}</Text>
            </Text>
            <Text style={styles.statSub}>{item.healthInsights?.lastLoggedLabel}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>TOTAL LOSS</Text>
            <Text style={styles.statValueTeal}>
              {item.healthInsights?.totalLossPercent} <Text style={{ fontSize: 14 }}>%</Text>
            </Text>
            <Text style={styles.statSub}>Since start</Text>
          </View>
        </View>
        */}

        {/* Eligibility Footer (Commented out as requested) */}
        {/* 
        <View style={styles.eligibilityRow}>
          <View style={styles.eligibilityLeft}>
            {item.program?.reorderStatus === 'eligible_now' ? (
              <TickIcon width={20} height={20} color="#0D9488" />
            ) : (
              <TimeIcon width={30} height={30} color="#64748B" />
            )}
            <Text style={item.program?.reorderStatus === 'eligible_now' ? styles.eligibleText : styles.pendingText}>
              {item.program?.nextRefillLabel}
            </Text>
          </View>
          <ChevronRight size={18} color={item.program?.reorderStatus === 'eligible_now' ? '#0D9488' : '#64748B'} />
        </View>
        */}
      </TouchableOpacity>
    );
  };

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
        {isLoading ? (
          <View style={{ padding: 20 }}>
            <Text style={{ textAlign: 'center', color: '#64748B' }}>Loading patients...</Text>
          </View>
        ) : (
          patients?.map((item) => renderPatientCard(item))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientsScreen;
