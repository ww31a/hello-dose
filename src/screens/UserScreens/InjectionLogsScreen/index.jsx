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
import styles from './styles';

const injectionHistory = [
  {
    id: 'feb-12',
    day: '12',
    dateLabel: 'Feb 12',
    timeLabel: '8:45 AM',
    dosage: '2mg',
    site: 'L Abdomen',
  },
  {
    id: 'feb-7',
    day: '7',
    dateLabel: 'Feb 7',
    timeLabel: '2:30 PM',
    dosage: '2.5mg',
    site: 'R Abdomen',
  },
];

const InjectionLogsScreen = () => {
  const navigation = useNavigation();
  const completedInjections = 2;
  const totalInjections = 4;
  const progressWidth = `${(completedInjections / totalInjections) * 100}%`;

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
          <Text style={styles.summaryValue}>2 of 4 Injections</Text>
          <Text style={styles.summaryCaption}>Last Injection: 3 days ago</Text>

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
          <Text style={styles.monthPillText}>FEBRUARY</Text>
        </View>

        <View style={styles.logList}>
          {injectionHistory.map((item) => (
            <View key={item.id} style={styles.logCard}>
              <View style={styles.logDayBadge}>
                <Text style={styles.logDayText}>{item.day}</Text>
              </View>

              <View style={styles.logMeta}>
                <Text style={styles.logDate}>{item.dateLabel}</Text>
                <Text style={styles.logTime}>{item.timeLabel}</Text>
              </View>

              <View style={styles.logInfo}>
                <View style={styles.dosagePill}>
                  <Text style={styles.dosageText}>{item.dosage}</Text>
                </View>
                <Text style={styles.siteText}>{item.site}</Text>
              </View>
            </View>
          ))}
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
