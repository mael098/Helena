import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Phone, Calendar, ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { PatientType } from '@/types/patients';

type PatientCardProps = {
  patient: PatientType;
  onPress: () => void;
};

export default function PatientCard({ patient, onPress }: PatientCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftSection}>
        <Image
          source={{ uri: patient.avatar }}
          style={styles.avatar}
        />
        <View style={styles.patientInfo}>
          <Text style={styles.name}>{patient.name}</Text>
          <Text style={styles.id}>ID: {patient.id}</Text>
          
          <View style={styles.contactRow}>
            <Phone size={14} color={colors.mediumGray} />
            <Text style={styles.contactText}>{patient.phone}</Text>
          </View>
          
          <View style={styles.contactRow}>
            <Calendar size={14} color={colors.mediumGray} />
            <Text style={styles.contactText}>{patient.dob}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <View style={[styles.badge, { backgroundColor: getBadgeColor(patient.status) }]}>
          <Text style={styles.badgeText}>{patient.status}</Text>
        </View>
        <ChevronRight size={20} color={colors.mediumGray} />
      </View>
    </TouchableOpacity>
  );
}

// Helper function to get badge color based on status
function getBadgeColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'active':
      return colors.success + '20'; // Adding transparency
    case 'pregnant':
      return colors.secondary + '20';
    case 'follow-up':
      return colors.warning + '20';
    default:
      return colors.lightGray;
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  leftSection: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  patientInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 2,
  },
  id: {
    fontSize: 12,
    color: colors.mediumGray,
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactText: {
    fontSize: 12,
    color: colors.darkGray,
    marginLeft: 4,
  },
  rightSection: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.black,
  },
});