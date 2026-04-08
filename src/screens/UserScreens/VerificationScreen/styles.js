import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  backButton: {
    marginTop: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 8,
  },
  patientBadge: {
    color: '#6B7280',
    fontFamily: Typography.fontFamily.regular,
  },
  heading: {
    fontSize: 32,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    lineHeight: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 32,
  },
  inputContainer: {
    color: '#9CA3AF',
    marginTop: 10,
  },
  linksRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  mutedText: {
    color: '#6B7280',
    fontFamily: Typography.fontFamily.medium,
    fontSize: 14,
  },
  linkText: {
    color: '#6B7280',
    fontFamily: Typography.fontFamily.medium,
    fontSize: 14,
    textDecorationLine: 'none',
  },
  changeEmailLink: {
    color: Colors.dark,
    fontFamily: Typography.fontFamily.bold,
    fontSize: 14,
    textDecorationLine: 'none',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default styles;
