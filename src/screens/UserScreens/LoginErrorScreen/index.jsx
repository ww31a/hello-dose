import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import { Colors } from '../../../theme';
import Button from '../../../components/Button';
import EmailNotRecognizedIcon from '../../../assets/icons/EmailNotRecognized.svg';
import styles from './styles';

const LoginErrorScreen = () => {
  const navigation = useNavigation();

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
            We couldn't find an account associated with this <Text style={styles.emailText}>email.</Text>
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

export default LoginErrorScreen;
