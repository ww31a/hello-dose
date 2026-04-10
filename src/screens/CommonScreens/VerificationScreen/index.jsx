import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CommonActions, useRoute, useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Colors } from '../../../theme';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Lock from '../../../assets/icons/Login.svg';
import styles from './styles';

const VerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email, userType } = route.params;
  const [code, setCode] = useState('');
  const [isCodeError, setIsCodeError] = useState(false);
  const isNPLogin = userType === 'np';
  const loginBadgeText = isNPLogin ? 'NP Login' : 'Patient Login';
  const loginRouteName = isNPLogin ? 'NPLogin' : 'Login';
  const appRouteName = isNPLogin ? 'NPTabs' : 'AppTabs';

  const verifyCode = (value) => {
    if (value.length !== 6) return;
    if (value === '666666') {
      setIsCodeError(false);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: appRouteName }],
        })
      );
    } else {
      setIsCodeError(true);
    }
  };

  const handleCodeChange = (value) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 6);
    setCode(digitsOnly);
    if (isCodeError) setIsCodeError(false);

    if (digitsOnly.length === 6) {
      verifyCode(digitsOnly);
    }
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
            Welcome back! <Text style={styles.patientBadge}>{loginBadgeText}</Text>
          </Text>

          <Text style={styles.heading}>
            Enter Verification Code
          </Text>

          <Text style={styles.subtitle}>
            A 6-digit verification code has been sent to your email
          </Text>
          <Text style={styles.helperText}>
            Use `666666` as the correct OTP for successful login.
          </Text>

          <Input
            label="Verification Code"
            placeholder="e.g. 666666"
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={6}
            returnKeyType="done"
            onSubmitEditing={handleVerify}
            icon={Lock}
            containerStyle={styles.inputContainer}
          />
          {isCodeError && (
            <Text style={styles.errorText}>
              Invalid code. Please enter `666666`.
            </Text>
          )}

          <View style={styles.linksRow}>
            <Text style={styles.mutedText}>Not {email}? </Text>
            <TouchableOpacity onPress={() => navigation.navigate(loginRouteName)}>
              <Text style={styles.changeEmailLink}>Change Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label="Login"
            onPress={handleVerify}
            disabled={code.length < 6}
            variant={code.length < 6 ? 'disabled' : 'primary'}
          />

          <View style={styles.resendRow}>
            <Text style={styles.mutedText}>Didn't receive the code? </Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Resend in 0:30</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;
