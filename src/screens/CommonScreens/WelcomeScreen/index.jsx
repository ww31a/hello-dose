import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
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

  const logoTranslateY = useRef(new Animated.Value(-80)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.spring(logoTranslateY, {
          toValue: 0,
          tension: 40,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <ImageBackground
      source={require('../../../assets/images/home-background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          {/* Logo Section */}
          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: logoOpacity,
                transform: [{ translateY: logoTranslateY }],
              },
            ]}
          >
            <Text style={styles.logoText}>hello dose.</Text>
          </Animated.View>

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
                onPress={() => navigation.navigate('NPLogin')}
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