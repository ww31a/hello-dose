import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 120,
  },
  // Header
  headerContainer: {
    marginBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E1E26',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.medium,
    color: '#6B7280',
  },
  // Next Appointment Card
  nextCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  nextHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  nextLabelBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0D9488',
    marginRight: 8,
  },
  nextLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#9CA3AF',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  timePill: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timePillText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semiBold,
    color: '#1E1E26',
  },
  patientNameLarge: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E1E26',
    marginBottom: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  startButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E1E26',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
  },
  // Section Titles
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E1E26',
  },
  viewAllText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0D9488',
  },
  // Upcoming List
  upcomingList: {
    marginBottom: 40,
    gap: 16,
  },
  upcomingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  timeColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
  },
  timeText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E1E26',
  },
  ampmText: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#9CA3AF',
    marginTop: 2,
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
  patientInfo: {
    flex: 1,
  },
  upcomingName: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E1E26',
    marginBottom: 4,
  },
  upcomingReason: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.medium,
    color: '#9CA3AF',
  },
  videoButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0FDFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Active Patients Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    height: 56,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontFamily: Typography.fontFamily.medium,
    fontSize: 15,
    color: '#1E1E26',
  },
});

export default styles;
