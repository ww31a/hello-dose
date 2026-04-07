import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Colors, Typography } from '../theme';
import { LucideIcon } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
  containerStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  icon: Icon,
  containerStyle,
  ...props
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#A0A0A0"
          {...props}
        />
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon size={20} color="#94A3B8" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.semiBold,
    color: Colors.dark,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 24,
    height: 56,
    paddingHorizontal: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 2,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: Colors.dark,
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default Input;
