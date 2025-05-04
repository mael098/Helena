import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Phone, Mail, Calendar, MapPin, FileText, Activity, CreditCard as Edit, Baby as BabyIcon, Pill } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { mockPatients, mockMedicalRecords } from '@/data/mockData';

export default function PatientDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('general');
  
  const patient = mockPatients.find(p => p.id === id);
  const medicalRecords = mockMedicalRecords.filter(record => record.patientId === id);
  
  if (!patient) {
    return (
      <View style={styles.container}>
        <Text>Patient not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Patient Header */}
        <View style={styles.header}>
          <Image source={{ uri: patient.avatar }} style={styles.avatar} />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{patient.name}</Text>
            <Text style={styles.id}>ID: {patient.id}</Text>
            <View style={styles.badgeContainer}>
              <View 
                style={[
                  styles.badge, 
                  { backgroundColor: patient.status === 'Active' 
                    ? colors.success + '20' 
                    : patient.status === 'Pregnant' 
                    ? colors.secondary + '20' 
                    : colors.warning + '20' 
                  }
                ]}
              >
                <Text style={styles.badgeText}>{patient.status}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.contactItem}>
            <Phone size={16} color={colors.mediumGray} />
            <Text style={styles.contactText}>{patient.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Mail size={16} color={colors.mediumGray} />
            <Text style={styles.contactText}>{patient.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Calendar size={16} color={colors.mediumGray} />
            <Text style={styles.contactText}>Born: {patient.dob} • {patient.age} years</Text>
          </View>
          <View style={styles.contactItem}>
            <MapPin size={16} color={colors.mediumGray} />
            <Text style={styles.contactText}>{patient.address}</Text>
          </View>
        </View>
        
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'general' && styles.activeTab]}
            onPress={() => setActiveTab('general')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'general' && styles.activeTabText
              ]}
            >
              General
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'obstetric' && styles.activeTab]}
            onPress={() => setActiveTab('obstetric')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'obstetric' && styles.activeTabText
              ]}
            >
              Obstetric
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'medications' && styles.activeTab]}
            onPress={() => setActiveTab('medications')}
          >
            <Text 
              style={[
                styles.tabText, 
                activeTab === 'medications' && styles.activeTabText
              ]}
            >
              Medications
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === 'general' && (
            <>
              {/* Medical History */}
              <View style={styles.medicalSection}>
                <View style={styles.medicalHeader}>
                  <FileText size={18} color={colors.primary} />
                  <Text style={styles.medicalTitle}>Medical History</Text>
                </View>
                <Text style={styles.medicalText}>
                  {patient.medicalHistory || 'No medical history recorded.'}
                </Text>
              </View>
              
              {/* Allergies */}
              <View style={styles.medicalSection}>
                <View style={styles.medicalHeader}>
                  <Activity size={18} color={colors.primary} />
                  <Text style={styles.medicalTitle}>Allergies</Text>
                </View>
                <Text style={styles.medicalText}>
                  {patient.allergies || 'No allergies recorded.'}
                </Text>
              </View>
              
              {/* Recent Medical Records */}
              <View style={styles.medicalSection}>
                <View style={styles.medicalHeader}>
                  <Text style={styles.medicalTitle}>Recent Medical Records</Text>
                </View>
                {medicalRecords.length === 0 ? (
                  <Text style={styles.medicalText}>No medical records found.</Text>
                ) : (
                  medicalRecords.map((record, index) => (
                    <View key={record.id} style={styles.recordItem}>
                      <View style={styles.recordDate}>
                        <Text style={styles.recordDateText}>{record.date}</Text>
                      </View>
                      <View style={styles.recordContent}>
                        <Text style={styles.recordTitle}>{record.title}</Text>
                        <Text style={styles.recordDescription}>{record.description}</Text>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </>
          )}
          
          {activeTab === 'obstetric' && (
            <View style={styles.medicalSection}>
              <View style={styles.medicalHeader}>
                <BabyIcon size={18} color={colors.primary} />
                <Text style={styles.medicalTitle}>Obstetric History</Text>
              </View>
              {patient.obstetricHistory ? (
                <>
                  <View style={styles.obstetricItem}>
                    <Text style={styles.obstetricLabel}>Pregnancies:</Text>
                    <Text style={styles.obstetricValue}>{patient.obstetricHistory.pregnancies}</Text>
                  </View>
                  <View style={styles.obstetricItem}>
                    <Text style={styles.obstetricLabel}>Births:</Text>
                    <Text style={styles.obstetricValue}>{patient.obstetricHistory.births}</Text>
                  </View>
                  <View style={styles.obstetricItem}>
                    <Text style={styles.obstetricLabel}>Cesarean:</Text>
                    <Text style={styles.obstetricValue}>{patient.obstetricHistory.cesarean}</Text>
                  </View>
                  <View style={styles.obstetricItem}>
                    <Text style={styles.obstetricLabel}>Abortions:</Text>
                    <Text style={styles.obstetricValue}>{patient.obstetricHistory.abortions}</Text>
                  </View>
                  <View style={styles.obstetricItem}>
                    <Text style={styles.obstetricLabel}>Last Period:</Text>
                    <Text style={styles.obstetricValue}>{patient.obstetricHistory.lastPeriod || 'N/A'}</Text>
                  </View>
                </>
              ) : (
                <Text style={styles.medicalText}>No obstetric history recorded.</Text>
              )}
            </View>
          )}
          
          {activeTab === 'medications' && (
            <View style={styles.medicalSection}>
              <View style={styles.medicalHeader}>
                <Pill size={18} color={colors.primary} />
                <Text style={styles.medicalTitle}>Current Medications</Text>
              </View>
              {patient.medications && patient.medications.length > 0 ? (
                patient.medications.map((medication, index) => (
                  <View key={index} style={styles.medicationItem}>
                    <Text style={styles.medicationName}>{medication.name}</Text>
                    <Text style={styles.medicationDosage}>{medication.dosage}</Text>
                    <Text style={styles.medicationFrequency}>{medication.frequency}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.medicalText}>No current medications.</Text>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.white,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.extraLightGray,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  id: {
    fontSize: 14,
    color: colors.mediumGray,
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.black,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.extraLightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    backgroundColor: colors.white,
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.extraLightGray,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.mediumGray,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '500',
  },
  tabContent: {
    paddingBottom: 24,
  },
  medicalSection: {
    backgroundColor: colors.white,
    padding: 16,
    marginTop: 8,
  },
  medicalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  medicalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginLeft: 8,
  },
  medicalText: {
    fontSize: 14,
    color: colors.darkGray,
    lineHeight: 20,
  },
  recordItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.extraLightGray,
  },
  recordDate: {
    width: 70,
    marginRight: 12,
  },
  recordDateText: {
    fontSize: 12,
    color: colors.mediumGray,
  },
  recordContent: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 4,
  },
  recordDescription: {
    fontSize: 14,
    color: colors.darkGray,
  },
  obstetricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.extraLightGray,
  },
  obstetricLabel: {
    fontSize: 14,
    color: colors.mediumGray,
  },
  obstetricValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.black,
  },
  medicationItem: {
    padding: 12,
    backgroundColor: colors.extraLightGray,
    borderRadius: 8,
    marginBottom: 8,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 2,
  },
  medicationFrequency: {
    fontSize: 14,
    color: colors.mediumGray,
  },
});