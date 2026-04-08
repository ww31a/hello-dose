import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import styles from './styles';

const Input = ({
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
            <Icon size={20} width={20} height={20} color="#94A3B8" />
          </View>
        )}
      </View>
    </View>
  );
};

export default Input;
