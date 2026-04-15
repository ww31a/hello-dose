import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Colors } from '../../../theme';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { patientService } from '../../../api/services/patient';
import styles from './styles';

const InjectionLogsScreen = () => {
  const navigation = useNavigation();

  const { data: logData } = useQuery({
    queryKey: ['injectionHistory'],
    queryFn: patientService.getInjectionHistory,
  });

  const injectionHistory = logData?.history || [];
  const monthlyProgress = logData?.monthlyProgress || { count: 0, total: 4, percentage: 0 };
  const progressWidth = `${monthlyProgress.percentage}%`;
  
  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' }).toUpperCase();
  const lastInjectionAge = injectionHistory.length > 0
    ? dayjs().diff(dayjs(injectionHistory[0].injectedAt), 'day')
    : null;
    
  const lastInjectionCaption = lastInjectionAge === null 
    ? 'No injections logged' 
    : lastInjectionAge === 0 ? 'Last Injection: Today' 
    : lastInjectionAge === 1 ? 'Last Injection: Yesterday' 
    : `Last Injection: ${lastInjectionAge} days ago`;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeft color={Colors.dark} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Injection Logs</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.sectionEyebrow}>MONTHLY PROGRESS</Text>
          <Text style={styles.summaryValue}>{monthlyProgress.count} of {monthlyProgress.total} Injections</Text>
          <Text style={styles.summaryCaption}>{lastInjectionCaption}</Text>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: progressWidth }]} />
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Past Injections</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.monthPill}>
          <Text style={styles.monthPillText}>{currentMonthName}</Text>
        </View>

        <View style={styles.logList}>
          {injectionHistory.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#94A3B8' }}>No injections logged</Text>
          ) : (
            injectionHistory.map((item) => (
              <View key={item._id} style={styles.logCard}>
                <View style={styles.logDayBadge}>
                  <Text style={styles.logDayText}>{dayjs(item.injectedAt).format('D')}</Text>
                </View>

                <View style={styles.logMeta}>
                  <Text style={styles.logDate}>{dayjs(item.injectedAt).format('MMM D')}</Text>
                  <Text style={styles.logTime}>{dayjs(item.injectedAt).format('h:mm A')}</Text>
                </View>

                <View style={styles.logInfo}>
                  <View style={styles.dosagePill}>
                    <Text style={styles.dosageText}>{item.dosage}</Text>
                  </View>
                  <Text style={styles.siteText}>{item.site}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.logButton}
            onPress={() => navigation.navigate('LogInjection')}
          >
            <Text style={styles.logButtonText}>Log Injection</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InjectionLogsScreen;
