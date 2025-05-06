import { SetStateAction, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';
import { colors } from '@/constants/colors';
import { mockAppointments } from '@/data/mockData';

export default function AppointmentsScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  // Format date to display in header
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Get appointments for selected date
  const filteredAppointments = mockAppointments.filter(
    appointment => appointment.date === selectedDate
  );

  // Generate marked dates object for the calendar
  const generateMarkedDates = () => {
    const markedDates: Record<string, any> = {};

    // Add dots for each date with appointments
    mockAppointments.forEach(appointment => {
      if (markedDates[appointment.date]) {
        markedDates[appointment.date].dots.push({
          key: appointment.id,
          color: colors.primary,
        });
      } else {
        markedDates[appointment.date] = {
          dots: [{ key: appointment.id, color: colors.primary }],
        };
      }
    });

    // Mark the selected date
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      selected: true,
      selectedColor: colors.primary,
    };

    return markedDates;
  };

  const handleMonthChange = (date: any) => {
    setMonth(date.month - 1);
    setYear(date.year);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.monthYear}>
          {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </Text>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {
              const newDate = new Date(year, month - 1);
              setMonth(newDate.getMonth());
              setYear(newDate.getFullYear());
            }}
          >
            <ChevronLeft size={20} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {
              const newDate = new Date(year, month + 1);
              setMonth(newDate.getMonth());
              setYear(newDate.getFullYear());
            }}
          >
            <ChevronRight size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <Calendar
        markingType="multi-dot"
        markedDates={generateMarkedDates()}
        onDayPress={(day: { dateString: SetStateAction<string>; }) => setSelectedDate(day.dateString)}
        onMonthChange={handleMonthChange}
        theme={{
          backgroundColor: colors.white,
          calendarBackground: colors.white,
          textSectionTitleColor: colors.darkGray,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: colors.white,
          todayTextColor: colors.primary,
          dayTextColor: colors.black,
          textDisabledColor: colors.lightGray,
          dotColor: colors.primary,
          selectedDotColor: colors.white,
          arrowColor: colors.primary,
          monthTextColor: colors.black,
          indicatorColor: colors.primary,
          textDayFontWeight: '400',
          textMonthFontWeight: '600',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
      />
      <View style={styles.appointmentsContainer}>
        <View style={styles.appointmentsHeader}>
          <View style={styles.dateHeaderContainer}>
            <CalendarIcon size={18} color={colors.primary} />
            <Text style={styles.dateHeader}>{formattedDate}</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
        {filteredAppointments.length === 0 ? (
          <View style={styles.noAppointments}>
            <Text style={styles.noAppointmentsText}>No appointments for this day</Text>
          </View>
        ) : (
          <FlatList
            data={filteredAppointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.appointmentCard}>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{item.time}</Text>
                  <View
                    style={[
                      styles.statusIndicator,
                      { backgroundColor: getStatusColor(item.status) }
                    ]}
                  />
                </View>
                <View style={styles.appointmentDetails}>
                  <Text style={styles.patientName}>{item.patientName}</Text>
                  <Text style={styles.appointmentType}>{item.type}</Text>
                  <Text style={styles.status}>{item.status}</Text>
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.appointmentsList}
          />
        )}
      </View>
    </View>
  );
}

// Helper function to get status color
function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return colors.success;
    case 'pending':
      return colors.warning;
    case 'cancelled':
      return colors.error;
    default:
      return colors.mediumGray;
  }
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
  monthYear: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  controls: {
    flexDirection: 'row',
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.extraLightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  appointmentsContainer: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 8,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  appointmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.extraLightGray,
  },
  dateHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAppointments: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noAppointmentsText: {
    fontSize: 16,
    color: colors.mediumGray,
  },
  appointmentsList: {
    padding: 16,
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: colors.extraLightGray,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  timeContainer: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  appointmentDetails: {
    flex: 1,
    marginLeft: 12,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 4,
  },
  appointmentType: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: colors.mediumGray,
  },
});