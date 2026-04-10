import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme';

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
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendLabel: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
  },
  chartContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  summaryCard: {
    backgroundColor: '#1E1E26',
    borderRadius: 32,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  summaryContent: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  weightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryWeight: {
    fontSize: 32,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.white,
  },
  summaryUnit: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
  },
  badge: {
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary,
  },
  updateButton: {
    backgroundColor: '#F7F8FA',
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  updateButtonText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  viewAll: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary,
  },
  listContainer: {
    gap: 12,
    paddingBottom: 40,
  },
  monthTag: {
    backgroundColor: 'black',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  monthTagText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.white,
    letterSpacing: 1,
  },
  entryItem: {
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
  dateCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dateText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: '#6B7280',
  },
  entryContent: {
    flex: 1,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  entryWeight: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  entryUnit: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
  },
  entryTime: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    marginTop: 2,
  },
});

export default styles;
