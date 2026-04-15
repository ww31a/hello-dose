import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Minus, Plus } from 'lucide-react-native';
import { Colors } from '../../../theme';
import Button from '../../../components/Button';
import { patientService } from '../../../api/services/patient';

import styles from './styles';

const UpdateWeightScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const queryClient = useQueryClient();

  const weightObj = route.params?.currentWeight ? Number(route.params.currentWeight) : 140;
  const initialWhole = Math.floor(weightObj).toString();
  const initialDecimal = Math.round((weightObj - Math.floor(weightObj)) * 10).toString();

  const [wholeNumber, setWholeNumber] = useState(initialWhole);
  const [decimalPart, setDecimalPart] = useState(initialDecimal);
  const [unit, setUnit] = useState(route.params?.currentUnit || 'lbs');


  const logWeightMutation = useMutation({
    mutationFn: ({ weight, unit }) => patientService.logWeight(weight, unit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patientDashboard'] });
      Alert.alert('Success', 'Weight updated successfully');
      navigation.goBack();
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Failed to update weight');
    },
  });

  const handleSave = () => {
    const weight = parseFloat(`${wholeNumber}.${decimalPart}`);
    if (isNaN(weight)) {
      Alert.alert('Error', 'Please enter a valid weight');
      return;
    }
    logWeightMutation.mutate({ weight, unit });
  };

  // Format today's date
  const today = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  const incrementWhole = () => {
    const current = parseInt(wholeNumber || '0', 10) || 0;
    setWholeNumber(String(current + 1));
  };
  const decrementWhole = () => {
    const current = parseInt(wholeNumber || '0', 10) || 0;
    setWholeNumber(String(Math.max(0, current - 1)));
  };

  const incrementDecimal = () => {
    const current = parseInt(decimalPart || '0', 10) || 0;
    if (current < 999) setDecimalPart(String(current + 1));
    else setDecimalPart('0');
  };
  const decrementDecimal = () => {
    const current = parseInt(decimalPart || '0', 10) || 0;
    if (current > 0) setDecimalPart(String(current - 1));
    else setDecimalPart('999');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={Colors.dark} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Weight</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainCard}>
          <Text style={styles.cardTitle}>Log Current Weight</Text>

          {/* Whole Number Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>WHOLE NUMBER</Text>
            <View style={styles.controlRow}>
              <TouchableOpacity style={styles.roundButton} onPress={decrementWhole}>
                <Minus color={Colors.dark} size={24} />
              </TouchableOpacity>
              
              <View style={styles.displayBox}>
                <TextInput
                  style={styles.valueInput}
                  value={wholeNumber}
                  onChangeText={(text) => setWholeNumber(text.replace(/[^0-9]/g, ''))}
                  onBlur={() => {
                    if (!wholeNumber) setWholeNumber('0');
                  }}
                  keyboardType="number-pad"
                  returnKeyType="done"
                  textAlign="center"
                  maxLength={4}
                />
              </View>
              
              <TouchableOpacity style={styles.roundButton} onPress={incrementWhole}>
                <Plus color={Colors.dark} size={24} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Decimal Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>DECIMAL</Text>
            <View style={styles.controlRow}>
              <TouchableOpacity style={styles.roundButton} onPress={decrementDecimal}>
                <Minus color={Colors.dark} size={24} />
              </TouchableOpacity>
              
              <View style={styles.displayBox}>
                <View style={styles.decimalContent}>
                  <View style={styles.decimalPointDot} />
                  <TextInput
                    style={styles.valueInput}
                    value={decimalPart}
                    onChangeText={(text) => {
                      const digits = text.replace(/[^0-9]/g, '');
                      setDecimalPart(digits.slice(0, 3));
                    }}
                    onBlur={() => {
                      if (!decimalPart) setDecimalPart('0');
                    }}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    textAlign="center"
                    maxLength={3}
                  />
                </View>
              </View>
              
              <TouchableOpacity style={styles.roundButton} onPress={incrementDecimal}>
                <Plus color={Colors.dark} size={24} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Units Section */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>UNITS</Text>
            <View style={styles.unitToggle}>
              <TouchableOpacity 
                style={[styles.unitButton, unit === 'lbs' && styles.unitButtonActive]}
                onPress={() => setUnit('lbs')}
              >
                <View style={[unit === 'lbs' && styles.unitButtonActiveInner]}>
                   <Text style={[styles.unitText, unit === 'lbs' && styles.unitTextActive]}>lbs</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.unitButton, unit === 'kg' && styles.unitButtonActive]}
                onPress={() => setUnit('kg')}
              >
                <View style={[unit === 'kg' && styles.unitButtonActiveInner]}>
                   <Text style={[styles.unitText, unit === 'kg' && styles.unitTextActive]}>kg</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.dateText}>
            Today's date: <Text style={styles.dateValue}>{formattedDate}</Text>
          </Text>
          <Button
            label="Save and Update"
            onPress={handleSave}
            isLoading={logWeightMutation.isPending}
            disabled={logWeightMutation.isPending}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateWeightScreen;
