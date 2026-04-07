import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft, Mail } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Colors, Typography } from '../theme';
import Input from '../components/Input';
import Button from '../components/Button';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
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
        </View>

        <View style={styles.footer}>
          <Button
            label="Login"
            onPress={handleLogin}
            disabled={!email}
            variant="primary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA', // Lightest gray from mockup
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
    fontSize: 16,
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
    marginBottom: 40,
  },
  inputContainer: {
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
  },
});

export default LoginScreen;
