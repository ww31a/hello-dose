import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Colors, Typography } from '../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'teal-outline' | 'disabled';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const isButtonDisabled = disabled || loading || variant === 'disabled';

  const getContainerStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryContainer;
      case 'secondary':
        return styles.secondaryContainer;
      case 'outline':
        return styles.outlineContainer;
      case 'teal-outline':
        return styles.tealOutlineContainer;
      case 'disabled':
        return styles.disabledContainer;
      default:
        return styles.primaryContainer;
    }
  };

  const getLabelStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryLabel;
      case 'secondary':
        return styles.secondaryLabel;
      case 'outline':
        return styles.outlineLabel;
      case 'teal-outline':
        return styles.tealOutlineLabel;
      case 'disabled':
        return styles.disabledLabel;
      default:
        return styles.primaryLabel;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isButtonDisabled}
      activeOpacity={0.7}
      style={[styles.baseContainer, getContainerStyle(), style]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.white : Colors.primary}
          size="small"
        />
      ) : (
        <Text style={[styles.baseLabel, getLabelStyle(), textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

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

export default Button;
