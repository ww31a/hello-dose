import { StyleSheet } from 'react-native';
import { Colors, Typography } from '../../theme';

const styles = StyleSheet.create({
  baseContainer: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  baseLabel: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.bold,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  // Primary: Dark background, white text
  primaryContainer: {
    backgroundColor: Colors.dark,
  },
  primaryLabel: {
    color: Colors.white,
  },
  // Secondary: Light teal surface background, dark text
  secondaryContainer: {
    backgroundColor: Colors.background,
  },
  secondaryLabel: {
    color: Colors.dark,
  },
  // Outline: Transparent background, light gray border
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  outlineLabel: {
    color: Colors.dark,
  },
  // Teal Outline: Transparent background, teal border
  tealOutlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  tealOutlineLabel: {
    color: Colors.dark,
  },
  // Disabled: Gray background, muted text
  disabledContainer: {
    backgroundColor: '#F5F5F5',
  },
  disabledLabel: {
    color: '#CCCCCC',
  },
});

export default styles;
