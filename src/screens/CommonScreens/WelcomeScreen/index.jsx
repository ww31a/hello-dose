import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Button from '../../../components/Button';
import styles from './styles';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/home-background.jpg')}
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

export default WelcomeScreen;
