import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  programRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  programTitle: {
    fontSize: 22,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardButton: {
    flex: 1,
    height: 48,
    marginVertical: 0,
  },
  reminderWait: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginBottom: 4,
  },
  reminderTitle: {
    fontSize: 32,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 20,
  },
  reminderList: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  reminderIcon: {
    marginRight: 10,
  },
  reminderTextRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderLabel: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.dark,
  },
  reminderAction: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#94A3B8',
    textDecorationLine: 'underline',
  },
  sectionHeader: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  actionCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionIcon: {
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  actionSubtitle: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    marginTop: 2,
  },
  comingUpCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  comingUpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  comingUpText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#6B7280',
    marginTop: 4,
    flex: 1,
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#F0FDFA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.primary,
  },
  doctorImage: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorImageStyle: {
    borderRadius: 16,
  },
  referButton: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    gap: 10,
  },
  referText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    letterSpacing: 1,
  },
});

export default styles;
