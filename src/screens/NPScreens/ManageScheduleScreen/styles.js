import { StyleSheet } from 'react-native';
import { Typography } from '../../../theme';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E1E26',
  },
  headerRight: {
    width: 36,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 110,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.medium,
    color: '#1E1E26',
    marginBottom: 10,
  },
  daySection: {
    paddingVertical: 10,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dayName: {
    marginLeft: 8,
    fontSize: 17,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E1E26',
  },
  slotList: {
    marginLeft: 38,
    marginBottom: 8,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timePill: {
    minWidth: 86,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  timePillText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E1E26',
  },
  timeDash: {
    marginHorizontal: 10,
    fontSize: 18,
    color: '#9CA3AF',
    fontFamily: Typography.fontFamily.medium,
  },
  deleteButton: {
    marginLeft: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonPlaceholder: {
    width: 24,
    marginLeft: 8,
  },
  addSlotText: {
    marginTop: 2,
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: '#0D9488',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 12,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 22,
    backgroundColor: '#F7F8FA',
  },
  updateButton: {
    marginVertical: 0,
  },
});

export default styles;
