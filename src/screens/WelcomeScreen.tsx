import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import Button from '../components/Button';
import { Colors, Typography } from '../theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../assets/images/home-background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>hello dose.</Text>
          </View>

          {/* Bottom Content Section */}
          <View style={styles.bottomContent}>
            <Text style={styles.tagline}>
              Your Holistic{'\n'}Health Coach
            </Text>

            <View style={styles.buttonContainer}>
              <Button
                label="Login as a Patient"
                onPress={handleLogin}
                variant="secondary"
              />
              <Button
                label="Login as an NP"
                onPress={handleLogin}
                variant="primary"
              />
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>New to Hello Dose? </Text>
              <TouchableOpacity>
                <Text style={styles.footerLink}>Create an account</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.legalRow}>
              <TouchableOpacity>
                <Text style={styles.legalLink}>Privacy Policy</Text>
              </TouchableOpacity>
              <Text style={styles.legalSeparator}> • </Text>
              <TouchableOpacity>
                <Text style={styles.legalLink}>Terms of Service</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logoText: {
    fontSize: 48,
    fontFamily: Typography.fontFamily.logo,
    color: Colors.white,
    letterSpacing: -1,
  },
  bottomContent: {
    marginBottom: 20,
  },
  tagline: {
    fontSize: 40,
    fontFamily: Typography.fontFamily.bold,
    color: Colors.white,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 38,
  },
  buttonContainer: {
    gap: 12, // React Native 0.71+ support gap for spacing
    marginBottom: 24,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  footerText: {
    color: Colors.white,
    fontFamily: Typography.fontFamily.medium,
    fontSize: 16,
  },
  footerLink: {
    color: Colors.white,
    fontFamily: Typography.fontFamily.bold,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  legalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legalLink: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: Typography.fontFamily.regular,
    fontSize: 12,
  },
  legalSeparator: {
    color: 'rgba(255, 255, 255, 1)',
    marginHorizontal: 8,
  },
});

export default WelcomeScreen;
