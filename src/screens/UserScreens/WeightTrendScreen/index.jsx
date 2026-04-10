import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import Svg, { Circle, Path, Text as SvgText, G, Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Colors, Typography } from '../../../theme';
import Button from '../../../components/Button';
import styles from './styles';

const WeightTrendScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={Colors.dark} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weight Trend</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={styles.legendIconWrapper}>
              <Svg width={12} height={12}>
                <Circle cx="6" cy="6" r="4" stroke={Colors.primary} strokeWidth="2" fill="white" />
              </Svg>
            </View>
            <Text style={styles.legendLabel}>= NP check in</Text>
          </View>
        </View>

        {/* Chart Section */}
        <View style={styles.chartContainer}>
          <WeightChart />
        </View>

        {/* Current Weight Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>CURRENT WEIGHT</Text>
            <View style={styles.weightRow}>
              <Text style={styles.summaryWeight}>140.0</Text>
              <Text style={styles.summaryUnit}>lbs</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>▼ 2.1%</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => navigation.navigate('UpdateWeight')}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Entries */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Entries</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.monthTag}>
            <Text style={styles.monthTagText}>JANUARY</Text>
          </View>

          <EntryItem
            date="30"
            weight="144"
            time="8:45 AM"
          />
          <EntryItem
            date="15"
            weight="146"
            time="2:30 PM"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const WeightChart = () => {
  const width = 340;
  const height = 240;
  const padding = 30;

  const data = [188, 175, 160, 138, 128];
  const labels = ['Dec 1', 'Dec 15', 'Jan 1', 'Jan 15', 'Jan 30'];
  const gridValues = [120, 140, 160, 180, 200];

  const min = 120;
  const max = 200;

  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;

  const getY = (value) => {
    return padding + ((max - value) / (max - min)) * chartHeight;
  };

  const getX = (index) => {
    return padding + (index / (data.length - 1)) * chartWidth;
  };

  const points = data.map((val, i) => ({
    x: getX(i),
    y: getY(val),
  }));

  const path = points.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;

    // Smooth quadratic ease into each point
    const prev = points[i - 1];
    const cx = (prev.x + point.x) / 2;

    return `${acc} Q ${cx} ${prev.y}, ${point.x} ${point.y}`;
  }, '');

  const areaPath = `
    ${path}
    L ${points[points.length - 1].x} ${height - padding}
    L ${points[0].x} ${height - padding}
    Z
  `;

  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={Colors.primary} stopOpacity="0.15" />
          <Stop offset="1" stopColor={Colors.primary} stopOpacity="0" />
        </LinearGradient>
      </Defs>

      {/* Grid Lines (Dashed) */}
      {gridValues.map((val, i) => {
        const y = getY(val);
        return (
          <G key={val}>
            <SvgText
              x={padding - 8}
              y={y + 4}
              fontSize="11"
              fill="#94A3B8"
              textAnchor="end"
              fontFamily={Typography.fontFamily.medium}
            >
              {val}
            </SvgText>
            <Line
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="#F1F5F9"
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          </G>
        );
      })}

      {/* Vertical Grid Lines */}
      {labels.map((_, i) => {
        const x = getX(i);
        // Only draw vertical lines for index 1 and 3 (Dec 15 and Jan 15)
        if (i !== 1 && i !== 3) return null;
        return (
          <Line key={`v-${i}`} x1={x} y1={padding} x2={x} y2={height - padding} stroke="#F1F5F9" strokeWidth="1" />
        );
      })}

      {/* Fill Area */}
      <Path
        d={areaPath}
        fill="url(#gradient)"
      />

      {/* Weight Line */}
      <Path
        d={path}
        fill="none"
        stroke={Colors.primary}
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Data Points */}
      {points.map((p, i) => {
        // Only show circles for index 2 (Jan 1) and 4 (Jan 30)
        if (i !== 2 && i !== 4) return null;
        return (
          <Circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === 4 ? 7 : 6}
            stroke={i === 2 ? Colors.primary : 'none'}
            strokeWidth="3"
            fill={i === 2 ? 'white' : Colors.primary}
          />
        );
      })}

      {/* X-Axis Labels */}
      {labels.map((label, i) => (
        <SvgText
          key={label}
          x={getX(i)}
          y={height - 5}
          fontSize="11"
          fill="#94A3B8"
          textAnchor="middle"
          fontFamily={Typography.fontFamily.medium}
        >
          {label}
        </SvgText>
      ))}
    </Svg>
  );
};

const EntryItem = ({ date, weight, time, isSpecial }) => (
  <TouchableOpacity style={styles.entryItem}>
    <View style={[styles.dateCircle]}>
      <Text style={[styles.dateText]}>{date}</Text>
    </View>
    <View style={styles.entryContent}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryWeight}>{weight}</Text>
        <Text style={styles.entryUnit}>lbs</Text>
      </View>
      <Text style={styles.entryTime}>{time}</Text>
    </View>
    <ChevronRight color="#CBD5E1" size={20} />
  </TouchableOpacity>
);

export default WeightTrendScreen;
