import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft, Lock } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Colors, Typography } from '../theme';
import Input from '../components/Input';
import Button from '../components/Button';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Verification'>;
type VerificationRouteProp = RouteProp<RootStackParamList, 'Verification'>;

const VerificationScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<VerificationRouteProp>();
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
              <Text style={styles.linkText}>Change Email</Text>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  backButton: {
    marginTop: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    marginBottom: 8,
  },
  patientBadge: {
    color: '#94A3B8',
    fontFamily: Typography.fontFamily.regular,
  },
  heading: {
    fontSize: 32,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    lineHeight: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    lineHeight: 24,
    marginBottom: 32,
  },
  inputContainer: {
    marginTop: 10,
  },
  linksRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  mutedText: {
    color: '#64748B',
    fontFamily: Typography.fontFamily.regular,
    fontSize: 14,
  },
  linkText: {
    color: Colors.dark,
    fontFamily: Typography.fontFamily.bold,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
  },
  resendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default VerificationScreen;
