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
  emailText: {
    color: '#64748B',
    fontFamily: Typography.fontFamily.bold,
  },
  content: {
    marginTop: 100,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#FFFBEB',
  },
  heading: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
  },
  supportButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  supportText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#6B7280',
    textDecorationLine: 'none',
  },
});

export default styles;
