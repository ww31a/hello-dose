import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Mail } from 'lucide-react-native';
import { Colors } from '../../../theme';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { authService } from '../../../api/services/auth';
import styles from './styles';

const NPLoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) return;

    setIsLoading(true);
    try {
      // NP login → always provider
      await authService.requestOtp(email, 'provider');

      navigation.navigate('Verification', {
        email,
        userType: 'np',
      });
    } catch (error) {
      console.error('Login error:', error);

      if (error.status === 404) {
        navigation.navigate('LoginError', { email });
      } else {
        Alert.alert(
          'Login Failed',
          error.message || 'Could not send OTP. Please check your connection.',
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft size={28} color={Colors.dark} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>
            Welcome back! <Text style={styles.patientBadge}>NP Login</Text>
          </Text>

          <Text style={styles.heading}>Let's get you{'\n'}logged in</Text>

          <Input
            label="Email"
            placeholder="hello@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon={Mail}
            containerStyle={styles.inputContainer}
          />
        </View>

        <View style={styles.footer}>
          <Button
            label="Login"
            onPress={handleLogin}
            disabled={!email || isLoading}
            isLoading={isLoading}
            variant={!email || isLoading ? 'disabled' : 'primary'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NPLoginScreen;
