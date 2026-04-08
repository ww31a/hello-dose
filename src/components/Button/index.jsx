import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../../theme';
import styles from './styles';

const Button = ({
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

export default Button;
