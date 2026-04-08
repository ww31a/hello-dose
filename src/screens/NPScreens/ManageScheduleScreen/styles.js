import { StyleSheet } from 'react-native';
import {
  Typography,
  Spacing,
  Radius,
} from '../../../theme';
import { moderateScale } from '../../../utils/responsive';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    height: moderateScale(56),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  backButton: {
    width: moderateScale(36),
    height: moderateScale(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Typography.size.xxl,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E1E26',
  },
  headerRight: {
    width: moderateScale(36),
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: moderateScale(110),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  cardTitle: {
    fontSize: Typography.size.lg,
    fontFamily: Typography.fontFamily.medium,
    color: '#1E1E26',
    marginBottom: Spacing.sm + 2,
  },
  daySection: {
    paddingVertical: Spacing.sm + 2,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm + 2,
  },
  dayName: {
    marginLeft: Spacing.sm,
    fontSize: Typography.size.lg + 1,
    fontFamily: Typography.fontFamily.bold,
    color: '#1E1E26',
  },
  slotList: {
    marginLeft: moderateScale(38),
    marginBottom: Spacing.sm,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  timePill: {
    minWidth: moderateScale(86),
    height: moderateScale(34),
    borderRadius: Radius.md,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm + 2,
  },
  timePillText: {
    fontSize: moderateScale(13),
    fontFamily: Typography.fontFamily.bold,
    color: '#1E1E26',
  },
  timeDash: {
    marginHorizontal: Spacing.sm + 2,
    fontSize: Typography.size.xl,
    color: '#9CA3AF',
    fontFamily: Typography.fontFamily.medium,
  },
  deleteButton: {
    marginLeft: Spacing.sm,
    width: moderateScale(24),
    height: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonPlaceholder: {
    width: moderateScale(24),
    marginLeft: Spacing.sm,
  },
  addSlotText: {
    marginTop: 2,
    fontSize: moderateScale(13),
    fontFamily: Typography.fontFamily.bold,
    color: '#0D9488',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: Spacing.md,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.lg,
    paddingBottom: moderateScale(22),
    backgroundColor: '#F7F8FA',
  },
  updateButton: {
    marginVertical: 0,
  },
});

export default styles;
