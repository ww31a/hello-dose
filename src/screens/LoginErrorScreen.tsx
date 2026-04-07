import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronLeft } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Colors, Typography } from '../theme';
import Button from '../components/Button';
import EmailNotRecognizedIcon from '../assets/icons/EmailNotRecognized.svg';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginError'>;

const LoginErrorScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleRetry = () => {
    navigation.navigate('Login');
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
          <View style={styles.iconContainer}>
            <EmailNotRecognizedIcon width={120} height={120} />
          </View>

          <Text style={styles.heading}>
            Email Not Recognized!
          </Text>

          <Text style={styles.subtitle}>
            We couldn't find an account associated with this email.
            Please check for typos or contact support if you need help.
          </Text>
        </View>

        <View style={styles.footer}>
          <Button
            label="Retry"
            onPress={handleRetry}
            variant="primary"
          />

          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportText}>Contact Support</Text>
          </TouchableOpacity>
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
    marginTop: 100,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FEF3C7', // Light yellow
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#FFFBEB',
  },
  heading: {
    fontSize: 28,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Typography.fontFamily.regular,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 24,
    right: 24,
  },
  supportButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 12,
  },
  supportText: {
    fontSize: 14,
    fontFamily: Typography.fontFamily.medium,
    color: '#64748B',
    textDecorationLine: 'underline',
  },
});

export default LoginErrorScreen;
