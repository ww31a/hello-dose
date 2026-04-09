import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
import { Colors } from '../../../theme';

// Svg Icons
import EmailIcon from '../../../assets/icons/email.svg';
import WarningIcon from '../../../assets/icons/warning.svg';

import styles from './styles';

const NPLoginScreen = () => {
  const navigation = useNavigation();
  const passwordInputRef = useRef(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email) return;

    // Demo password error preview state
    if (password.trim().toLowerCase() === 'error') {
      setIsPasswordError(true);
      return;
    }

    // Demo auth: only test@example.com is treated as valid NP email
    if (email.trim().toLowerCase() !== 'test@example.com') {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
      setIsPasswordError(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'NPTabs' }],
        })
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <ChevronLeft color={Colors.dark} size={28} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.welcomeText}>
              Welcome back! <Text style={styles.welcomeSubText}>NP Login</Text>
            </Text>
            
            <Text style={styles.titleText}>
              Let's get you{'\n'}logged in
            </Text>

            {/* Email Input */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={[styles.inputWrapper, isEmailError && styles.inputWrapperError]}>
                <TextInput
                  style={styles.input}
                  placeholder="hello@example.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (isEmailError) setIsEmailError(false);
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />
                {isEmailError ? (
                  <View style={styles.iconRight}>
                    <WarningIcon width={20} height={20} color="#EF4444" />
                  </View>
                ) : (
                  <View style={styles.iconRight}>
                    <EmailIcon width={20} height={20} color="#9CA3AF" />
                  </View>
                )}
              </View>
              <Text style={styles.helperText}>
                Use `test@example.com` for successful login. Other emails show an error.
              </Text>
              {isEmailError && (
                <View style={styles.errorRow}>
                  <Text style={styles.errorText}>
                    Email not recognized. Try `test@example.com`.
                  </Text>
                </View>
              )}
            </View>

            {/* Password Input */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[styles.inputWrapper, isPasswordError && styles.inputWrapperError]}>
                <TextInput
                  ref={passwordInputRef}
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (isPasswordError) setIsPasswordError(false);
                  }}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                />
                {isPasswordError && (
                  <View style={[styles.iconRight, styles.warningIcon]}>
                    <WarningIcon width={20} height={20} color="#EF4444" />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.iconRight}
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#9CA3AF" />
                  ) : (
                    <Eye size={20} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.helperText}>
                Enter `error` to preview password error state.
              </Text>
              {isPasswordError && (
                <View style={styles.errorRow}>
                  <Text style={styles.errorText}>
                    Incorrect password. This is a demo error state preview.
                  </Text>
                </View>
              )}
            </View>

          </View>

          {/* Footer controls */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NPLoginScreen;
