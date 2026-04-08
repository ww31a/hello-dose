import React, { useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Colors } from '../../../theme';

// Svg Icons
import EmailIcon from '../../../assets/icons/email.svg';
import NoViewIcon from '../../../assets/icons/no-view.svg';
import WarningIcon from '../../../assets/icons/warning.svg';

import styles from './styles';

const NPLoginScreen = () => {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Toggle this true/false to switch between default and error states
  const [isError, setIsError] = useState(false);

  const handleLogin = () => {
    // For demonstration, if password is exactly "error", trigger the error state
    // Otherwise, simulate a successful login and navigate to the NP flow (AppTabs or a dedicated NP tab)
    if (password === 'error') {
      setIsError(true);
    } else {
      setIsError(false);
      navigation.navigate('NPTabs');
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
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="hello@example.com"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (isError) setIsError(false);
                  }}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                <View style={styles.iconRight}>
                  <EmailIcon width={20} height={20} color="#9CA3AF" />
                </View>
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[styles.inputWrapper, isError && styles.inputWrapperError]}>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (isError) setIsError(false);
                  }}
                  secureTextEntry
                />
                {isError && (
                  <View style={[styles.iconRight, { marginRight: 8 }]}>
                    <WarningIcon width={20} height={20} color="#EF4444" />
                  </View>
                )}
                <TouchableOpacity style={styles.iconRight}>
                  <NoViewIcon width={20} height={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
              
              {/* Inline Error Message */}
              {isError && (
                <View style={styles.errorRow}>
                  <Text style={styles.errorText}>
                    Incorrect password. Please try again or reset it below.
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
