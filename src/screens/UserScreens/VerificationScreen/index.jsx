import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Colors } from '../../../theme';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Lock from '../../../assets/icons/Login.svg';
import styles from './styles';

const VerificationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const [code, setCode] = useState('');

  const handleVerify = () => {
    // For demo: Any 6 digits work
    if (code.length === 6) {
      navigation.navigate('AppTabs');
    }
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
            Welcome back! <Text style={styles.patientBadge}>Patient Login</Text>
          </Text>

          <Text style={styles.heading}>
            Enter Verification Code
          </Text>

          <Text style={styles.subtitle}>
            A 6-digit verification code has been sent to your email
          </Text>

          <Input
            label="Verification Code"
            placeholder="e.g. 123456"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            icon={Lock}
            containerStyle={styles.inputContainer}
          />

          <View style={styles.linksRow}>
            <Text style={styles.mutedText}>Not {email}? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.changeEmailLink}>Change Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label="Login"
            onPress={handleVerify}
            disabled={code.length < 6}
            variant="primary"
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
