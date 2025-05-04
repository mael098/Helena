import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Filter, ChartBar as BarChartIcon, ChartPie as PieChartIcon, Users, Calendar } from 'lucide-react-native';
import { colors } from '@/constants/colors';

const screenWidth = Dimensions.get('window').width;

export default function StatisticsScreen() {
  const [timeRange, setTimeRange] = useState('month');
  
  const patientTypeData = {
    labels: ['Prenatal', 'Postnatal', 'Gynecology', 'Family Planning', 'Other'],
    datasets: [
      {
        data: [35, 20, 25, 15, 5]
      }
    ]
  };
  
  const appointmentsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 35, 40, 43]
      }
    ]
  };
  
  const ageDistributionData = [
    {
      name: '18-25',
      population: 22,
      color: colors.primary,
      legendFontColor: colors.darkGray,
      legendFontSize: 12
    },
    {
      name: '26-35',
      population: 38,
      color: colors.secondary,
      legendFontColor: colors.darkGray,
      legendFontSize: 12
    },
    {
      name: '36-45',
      population: 25,
      color: colors.accent,
      legendFontColor: colors.darkGray,
      legendFontSize: 12
    },
    {
      name: '46+',
      population: 15,
      color: '#9C27B0',
      legendFontColor: colors.darkGray,
      legendFontSize: 12
    }
  ];
  
  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    color: (opacity = 1) => `rgba(0, 119, 182, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    labelColor: (opacity = 1) => `rgba(85, 85, 85, ${opacity})`,
  };

  // Summary cards data
  const summaryData = [
    {
      icon: <Users size={24} color={colors.primary} />,
      title: 'Total Patients',
      value: '248',
      change: '+12%',
      isPositive: true
    },
    {
      icon: <Calendar size={24} color={colors.primary} />,
      title: 'Appointments',
      value: '52',
      change: '+8%',
      isPositive: true
    },
    {
      icon: <BarChartIcon size={24} color={colors.primary} />,
      title: 'No-shows',
      value: '5%',
      change: '-2%',
      isPositive: true
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice Insights</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={18} color={colors.primary} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.timeRangeContainer}>
        <TouchableOpacity
          style={[styles.timeButton, timeRange === 'week' && styles.activeTimeButton]}
          onPress={() => setTimeRange('week')}
        >
          <Text
            style={[
              styles.timeButtonText,
              timeRange === 'week' && styles.activeTimeButtonText
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.timeButton, timeRange === 'month' && styles.activeTimeButton]}
          onPress={() => setTimeRange('month')}
        >
          <Text
            style={[
              styles.timeButtonText,
              timeRange === 'month' && styles.activeTimeButtonText
            ]}
          >
            Month
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.timeButton, timeRange === 'year' && styles.activeTimeButton]}
          onPress={() => setTimeRange('year')}
        >
          <Text
            style={[
              styles.timeButtonText,
              timeRange === 'year' && styles.activeTimeButtonText
            ]}
          >
            Year
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        {summaryData.map((item, index) => (
          <View key={index} style={styles.summaryCard}>
            <View style={styles.summaryIconContainer}>
              {item.icon}
            </View>
            <Text style={styles.summaryTitle}>{item.title}</Text>
            <Text style={styles.summaryValue}>{item.value}</Text>
            <Text 
              style={[
                styles.summaryChange,
                { color: item.isPositive ? colors.success : colors.error }
              ]}
            >
              {item.change}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <BarChartIcon size={18} color={colors.primary} />
          <Text style={styles.chartTitle}>Monthly Appointments</Text>
        </View>
        <BarChart
          data={appointmentsData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          showValuesOnTopOfBars
        />
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <PieChartIcon size={18} color={colors.primary} />
          <Text style={styles.chartTitle}>Patient Age Distribution</Text>
        </View>
        <PieChart
          data={ageDistributionData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <BarChartIcon size={18} color={colors.primary} />
          <Text style={styles.chartTitle}>Visits by Type</Text>
        </View>
        <BarChart
          data={patientTypeData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          showValuesOnTopOfBars
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.extraLightGray,
    padding: 8,
    borderRadius: 8,
  },
  filterText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  timeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.extraLightGray,
    marginHorizontal: 4,
  },
  activeTimeButton: {
    backgroundColor: colors.primary,
  },
  timeButtonText: {
    color: colors.darkGray,
    fontSize: 14,
    fontWeight: '500',
  },
  activeTimeButtonText: {
    color: colors.white,
  },
  summaryContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-between',
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 12,
    color: colors.mediumGray,
    textAlign: 'center',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 4,
  },
  summaryChange: {
    fontSize: 12,
    fontWeight: '500',
  },
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 0,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  chart: {
    borderRadius: 8,
    paddingRight: 0,
  },
});