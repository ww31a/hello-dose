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
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 4,
  },
  roleLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#9CA3AF',
    letterSpacing: 1,
    marginBottom: 16,
  },
  badge: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  badgeText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#6B7280',
  },
  cardsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 40,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  cardValue: {
    fontSize: 18,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  placeholderValue: {
    color: '#9CA3AF',
    fontFamily: Typography.fontFamily.medium,
  },
  scheduleButton: {
    backgroundColor: Colors.dark,
    paddingHorizontal: 16,
    paddingVertical: 3,
    borderRadius: 20,
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
  },
  statusBadge: {
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  ctaButton: {
    height: 56,
    borderRadius: 28,
  },
});

export default styles;
