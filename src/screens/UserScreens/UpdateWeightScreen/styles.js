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
    flexGrow: 1,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 40,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  roundButton: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayBox: {
    flex: 1,
    height: 56,
    backgroundColor: '#F3F4F69E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  decimalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  valueText: {
    fontSize: 28,
    lineHeight: 30,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    textAlign: 'center',
    includeFontPadding: false,
  },
  decimalPointDot: {
    position: 'absolute',
    left: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94A3B8',
  },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 30,
    gap: 16,
  },
  unitButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitButtonActive: {
    backgroundColor: '#FFFFFF', // Or very lightly tinted teal
    borderWidth: 1.5,
    borderColor: '#0D9488',
  },
  unitButtonActiveInner: {
    backgroundColor: '#F0FDFA', // Light teal background
    borderRadius: 28,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  unitTextActive: {
    color: Colors.primary,
  },
  footer: {
    marginTop: 'auto',
    paddingBottom: 40,
    alignItems: 'flex-start',
    width: '100%',
  },
  dateText: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 20,
    textAlign: 'left',
  },
  dateValue: {
    color: '#94A3B8',
    fontFamily: Typography.fontFamily.medium,
  },
  saveButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
  },
});

export default styles;
