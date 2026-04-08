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
    padding: 20,
  },
  mainCard: {
    backgroundColor: Colors.white,
    borderRadius: 32,
    padding: 24,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  siteBox: {
    width: '48.5%',
    height: 80,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  siteBoxSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#F0FDFA',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  siteText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.dark,
    marginTop: 8,
  },
  siteTextSelected: {
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 24,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  dateTimeField: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
    marginBottom: 8,
  },
  inputWrapper: {
    height: 52,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputText: {
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 6,
  },
  toggleBtn: {
    flex: 1,
    height: 32,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  toggleText: {
    fontSize: 10,
    fontFamily: Typography.fontFamily.bold,
    color: '#94A3B8',
  },
  toggleTextActive: {
    color: Colors.primary,
  },
  notesInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 16,
    height: 60,
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: Colors.dark,
    textAlignVertical: 'top',
  },
  footerSection: {
    paddingHorizontal: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  statusText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
  },
  logButton: {
    width: '100%',
    height: 60,
    marginVertical: 0,
    borderRadius: 30,
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default styles;
