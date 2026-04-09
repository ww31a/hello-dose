import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Mail } from 'lucide-react-native';
import { Colors } from '../../../theme';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './styles';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (!email) return;

    // Simulating an authorization check
    // For demo: test@example.com goes to Verification, others go to Error
    if (email.toLowerCase() === 'test@example.com') {
      navigation.navigate('Verification', { email });
    } else {
      navigation.navigate('LoginError', { email });
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
            Let's get you{'\n'}logged in
          </Text>

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
          <Text style={styles.helperText}>
            Use `test@example.com` for successful login. Any other email goes to the error screen.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            label="Login"
            onPress={handleLogin}
            disabled={!email}
            variant={!email ? 'disabled' : 'primary'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
