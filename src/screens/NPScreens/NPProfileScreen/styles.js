import { StyleSheet } from 'react-native';
import {
  Colors,
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
  headerTitle: {
    fontSize: Typography.size.xxl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    textAlign: 'center',
    marginVertical: Spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: moderateScale(28),
  },
  avatarContainer: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 3,
    marginBottom: Spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(60),
  },
  name: {
    fontSize: Typography.size.title,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: Spacing.xs + 2,
  },
  roleLabel: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary,
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  badge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(7),
    borderRadius: moderateScale(18),
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  badgeText: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.fontFamily.medium,
    color: '#9CA3AF',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.xl,
    padding: moderateScale(18),
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  activeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeIconWrapper: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm + 2,
  },
  activeLabel: {
    fontSize: moderateScale(13),
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.4,
  },
  activeCount: {
    position: 'absolute',
    right: moderateScale(22),
    top: moderateScale(22),
    fontSize: Typography.size.xxl,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  availabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(14),
  },
  cardLabel: {
    fontSize: Typography.size.xs,
    fontFamily: Typography.fontFamily.bold,
    color: '#9CA3AF',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  manageLink: {
    fontSize: Typography.size.md,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIconWrapper: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(28),
    backgroundColor: '#E6FAF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  availabilityTextWrap: {
    flex: 1,
  },
  availabilityTitle: {
    fontSize: Typography.size.lg,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 2,
  },
  availabilitySub: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.fontFamily.medium,
    color: '#5B7FA6',
  },
  onlineDot: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
    backgroundColor: '#22C55E',
    marginLeft: 8,
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xxl,
    paddingBottom: moderateScale(18),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(18),
  },
  detailLabel: {
    fontSize: Typography.size.md,
    fontFamily: Typography.fontFamily.bold,
    color: '#4B5563',
  },
  detailValue: {
    fontSize: Typography.size.md,
    fontFamily: Typography.fontFamily.medium,
    color: '#9CA3AF',
  },
  footerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0FDFA',
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
  },
  footerText: {
    fontSize: moderateScale(13),
    fontFamily: Typography.fontFamily.medium,
    color: '#4B5563',
  },
});

export default styles;
