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
import { useQuery } from '@tanstack/react-query';
import { Colors, Typography } from '../../../theme';
import Button from '../../../components/Button';
import { patientService } from '../../../api/services/patient';
import styles from './styles';
import dayjs from "dayjs";


const WeightTrendScreen = () => {
  const navigation = useNavigation();

  const { data: dashboardData } = useQuery({
    queryKey: ['patientDashboard'],
    queryFn: patientService.getDashboard,
  });

  const { data: weightData } = useQuery({
    queryKey: ['weightHistory'],
    queryFn: patientService.getWeightHistory,
  });

  const historyList = weightData?.history || [];
  const formattedNpCheckInDate = weightData?.npCheckInDate
  ? dayjs(weightData?.npCheckInDate).format('MMM D')
  : null;
  const npCheckInDate = formattedNpCheckInDate
  const currentMonthName = new Date().toLocaleString('en-US', { month: 'long' }).toUpperCase();


  const healthInsights = dashboardData?.healthInsights || {};
  const currentWeight = healthInsights.lastLoggedWeight ? Number(healthInsights.lastLoggedWeight).toFixed(1) : '--';
  const currentUnit = healthInsights.lastLoggedUnit || 'lbs';
  const weightChange = healthInsights.totalLossPercent || 0;
  const isLoss = weightChange > 0;

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
          <WeightChart historyList={historyList} />
        </View>

        {/* Current Weight Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>CURRENT WEIGHT</Text>
            <View style={styles.weightRow}>
              <Text style={styles.summaryWeight}>{currentWeight}</Text>
              <Text style={styles.summaryUnit}>{currentUnit}</Text>
              {currentWeight !== '--' && (
                <View style={[styles.badge, !isLoss && { backgroundColor: '#FEE2E2' }]}>
                  <Text style={[styles.badgeText, !isLoss && { color: '#EF4444' }]}>
                    {isLoss ? '▼' : '▲'} {Math.abs(weightChange)}%
                  </Text>
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={() => navigation.navigate('UpdateWeight', { 
              currentWeight: healthInsights.lastLoggedWeight, 
              currentUnit 
            })}
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
            <Text style={styles.monthTagText}>{currentMonthName}</Text>
          </View>

          {historyList.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#94A3B8' }}>No logs this month</Text>
          ) : (
            historyList.map(log => (
              <EntryItem
                key={log.id || log.date}
                date={log.day?.toString()}
                weight={log.weight?.toString()}
                time={log.time}
              />
            ))
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const WeightChart = ({ historyList, npCheckInDate }) => {
  const width = 340;
  const height = 240;
  const padding = 30;

  // Reverse so oldest is on the left
  const sortedHistory = [...(historyList || [])].reverse();

  if (sortedHistory.length === 0) {
    return (
      <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#94A3B8', fontFamily: Typography.fontFamily.medium }}>No chart data available</Text>
      </View>
    );
  }

  // If only 1 data point, duplicate it to draw a flat line
  if (sortedHistory.length === 1) {
    sortedHistory.push(sortedHistory[0]);
  }

  const data = sortedHistory.map(item => Number(item.weight));
  const labels = sortedHistory.map(item => dayjs(item.date).format('MMM D'));

  const minWeight = Math.min(...data);
  const maxWeight = Math.max(...data);

  const min = Math.max(0, Math.floor(minWeight - 5));
  const max = Math.ceil(maxWeight + 5);

  const interval = (max - min) / 4;
  const gridValues = [min, min + interval, min + interval * 2, min + interval * 3, max].map(Math.round);

  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;

  const getY = (value) => {
    return padding + ((max - value) / (max - min || 1)) * chartHeight;
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
          <G key={`h-${val}-${i}`}>
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
        if (i === 0 || i === labels.length - 1) return null; // Only middle lines
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
      {points.map((p, i) => (
        <Circle
          key={`p-${i}`}
          cx={p.x}
          cy={p.y}
          r={i === points.length - 1 ? 7 : 5}
          stroke={i === points.length - 1 ? 'none' : Colors.primary}
          strokeWidth="2"
          fill={i === points.length - 1 ? Colors.primary : 'white'}
        />
      ))}

      {/* X-Axis Labels */}
      {labels.map((label, i) => (
        <SvgText
          key={`l-${i}`}
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
  <View style={styles.entryItem}>
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
  </View>
);

export default WeightTrendScreen;
