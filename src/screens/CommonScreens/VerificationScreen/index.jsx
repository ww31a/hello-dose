import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CommonActions,
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Colors } from '../../../theme';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Lock from '../../../assets/icons/Login.svg';
import { authService } from '../../../api/services/auth';
import styles from './styles';

const VerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, userType } = route.params;
  const [code, setCode] = useState('');
  const [isCodeError, setIsCodeError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);
  const isNPLogin = userType === 'np';

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0) return;
    setIsResending(true);
    try {
      await authService.requestOtp(email, isNPLogin ? 'provider' : 'patient');
      setCountdown(30);
      setCode('');
      setIsCodeError(false);
      Alert.alert(
        'Success',
        'A new verification code has been sent to your email.',
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  const loginBadgeText = isNPLogin ? 'NP Login' : 'Patient Login';
  const loginRouteName = isNPLogin ? 'NPLogin' : 'Login';
  const appRouteName = isNPLogin ? 'NPTabs' : 'AppTabs';

  const verifyCode = async value => {
    if (value.length !== 6) return;

    setIsLoading(true);
    try {
      const response = await authService.verifyOtp(email, value);
      setIsCodeError(false);

      // Determine destination based on role if returned, or fallback to appRouteName
      const destination = userType === 'np' ? 'NPTabs' : 'AppTabs';

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: destination }],
        }),
      );
    } catch (error) {
      console.error('Verification error:', error);
      setIsCodeError(true);
      Alert.alert(
        'Verification Failed',
        error.message || 'Invalid code. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = value => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 6);
    setCode(digitsOnly);
    if (isCodeError) setIsCodeError(false);
  };

  const handleVerify = () => {
    verifyCode(code);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={28} color={Colors.dark} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Welcome back!{' '}
            <Text style={styles.patientBadge}>{loginBadgeText}</Text>
          </Text>

          <Text style={styles.heading}>Enter Verification Code</Text>

          <Text style={styles.subtitle}>
            A 6-digit verification code has been sent to your email
          </Text>

          <Input
            label="Verification Code"
            placeholder="e.g. 123456"
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={6}
            returnKeyType="done"
            onSubmitEditing={handleVerify}
            icon={Lock}
            containerStyle={styles.inputContainer}
          />
          {isCodeError && <Text style={styles.errorText}>Invalid code.</Text>}
          <View style={styles.linksRow}>
            <Text style={styles.mutedText}>Not {email}? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(loginRouteName)}
            >
              <Text style={styles.changeEmailLink}>Change Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label="Login"
            onPress={handleVerify}
            disabled={code.length < 6 || isLoading}
            isLoading={isLoading}
            variant={code.length < 6 || isLoading ? 'disabled' : 'primary'}
          />

          <View style={styles.resendRow}>
            <Text style={styles.mutedText}>Didn't receive the code? </Text>
            <TouchableOpacity
              onPress={handleResend}
              disabled={countdown > 0 || isResending}
            >
              <Text
                style={[
                  styles.linkText,
                  (countdown > 0 || isResending) && { color: '#9CA3AF' },
                ]}
              >
                {isResending
                  ? 'Resending...'
                  : countdown > 0
                  ? `Resend in 0:${countdown.toString().padStart(2, '0')}`
                  : 'Resend Code'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;
