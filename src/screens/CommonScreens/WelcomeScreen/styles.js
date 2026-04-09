import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../../theme';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000033',
  },
  safeArea: {
    flex: 1,
    zIndex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 20,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoText: {
    fontSize: 48,
    fontFamily: Typography.fontFamily.logo,
    color: Colors.white,
    letterSpacing: -1,
  },
  bottomContent: {
    marginBottom: 20,
  },
  tagline: {
    fontSize: 40,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.white,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 38,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 24,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  footerText: {
    color: Colors.white,
    fontFamily: Typography.fontFamily.medium,
    fontSize: 16,
  },
  footerLink: {
    color: Colors.white,
    fontFamily: Typography.fontFamily.medium,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  legalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legalLink: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
  },
  legalSeparator: {
    color: 'rgba(255, 255, 255, 1)',
    marginHorizontal: 8,
  },
});

export default styles;
