import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Minus, Plus } from 'lucide-react-native';
import { Colors } from '../../../theme';
import Button from '../../../components/Button';

import styles from './styles';

const UpdateWeightScreen = () => {
  const navigation = useNavigation();
  const [wholeNumber, setWholeNumber] = useState(140);
  const [decimalPart, setDecimalPart] = useState(6);
  const [unit, setUnit] = useState('lbs');

  // Format today's date
  const today = new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  const incrementWhole = () => setWholeNumber(prev => prev + 1);
  const decrementWhole = () => setWholeNumber(prev => Math.max(0, prev - 1));

  const incrementDecimal = () => {
    if (decimalPart < 9) setDecimalPart(prev => prev + 1);
    else setDecimalPart(0);
  };
  const decrementDecimal = () => {
    if (decimalPart > 0) setDecimalPart(prev => prev - 1);
    else setDecimalPart(9);
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
                <Text style={styles.valueText}>{wholeNumber}</Text>
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
                  <Text style={styles.valueText}>{decimalPart}</Text>
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
            onPress={() => navigation.goBack()}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateWeightScreen;
