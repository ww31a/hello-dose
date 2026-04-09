import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA', // Matching the light background from screenshots
  },
  header: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  welcomeText: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 8,
  },
  welcomeSubText: {
    color: '#94A3B8', // Muted text for "NP Login"
  },
  titleText: {
    fontSize: 32,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    lineHeight: 38,
    marginBottom: 40,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 24,
    height: 56,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  inputWrapperError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: Typography.fontFamily.medium,
    fontSize: 15,
    color: '#1E1E26',
  },
  iconRight: {
    marginLeft: 12,
  },
  warningIcon: {
    marginRight: 4,
  },
  helperText: {
    marginTop: 8,
    paddingHorizontal: 4,
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#6B7280',
    lineHeight: 18,
  },
  errorRow: {
    marginTop: 8,
    paddingHorizontal: 4,
  },
  errorText: {
    fontSize: 12,
    fontFamily: Typography.fontFamily.medium,
    color: '#EF4444',
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    marginTop: 'auto',
  },
  loginButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1E1E26',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: Typography.fontFamily.bold,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#6B7280',
  },
});

export default styles;
