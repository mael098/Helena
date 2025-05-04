import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Switch
} from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function AddPatientScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    dob: new Date(2000, 0, 1),
    email: '',
    phone: '',
    address: '',
    allergies: '',
    medicalHistory: '',
    isPregnant: false,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('dob', selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handleSubmit = () => {
    // In a real app, this would save to a database
    console.log('Submitting form data:', formData);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView style={styles.container}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Enter patient's full name"
            placeholderTextColor={colors.mediumGray}
          />
          
          <Text style={styles.label}>Date of Birth *</Text>
          <TouchableOpacity 
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(formData.dob)}</Text>
            <Calendar size={20} color={colors.mediumGray} />
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={formData.dob}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
          
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            placeholder="Enter email address"
            placeholderTextColor={colors.mediumGray}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            placeholder="Enter phone number"
            placeholderTextColor={colors.mediumGray}
            keyboardType="phone-pad"
          />
          
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
            placeholder="Enter patient's address"
            placeholderTextColor={colors.mediumGray}
            multiline
            numberOfLines={3}
          />
        </View>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Is Patient Pregnant?</Text>
            <Switch
              value={formData.isPregnant}
              onValueChange={(value) => handleInputChange('isPregnant', value)}
              trackColor={{ false: colors.lightGray, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
          
          <Text style={styles.label}>Allergies</Text>
          <TextInput
            style={styles.input}
            value={formData.allergies}
            onChangeText={(text) => handleInputChange('allergies', text)}
            placeholder="List any allergies"
            placeholderTextColor={colors.mediumGray}
          />
          
          <Text style={styles.label}>Medical History</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.medicalHistory}
            onChangeText={(text) => handleInputChange('medicalHistory', text)}
            placeholder="Enter relevant medical history"
            placeholderTextColor={colors.mediumGray}
            multiline
            numberOfLines={5}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.submitButton,
              (!formData.name || !formData.phone) && styles.disabledButton
            ]}
            onPress={handleSubmit}
            disabled={!formData.name || !formData.phone}
          >
            <Text style={styles.submitButtonText}>Save Patient</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  formSection: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.darkGray,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.extraLightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.black,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  datePickerButton: {
    backgroundColor: colors.extraLightGray,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 16,
    color: colors.black,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 14,
    marginRight: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  cancelButtonText: {
    color: colors.mediumGray,
    fontSize: 16,
    fontWeight: '500',
  },
  submitButton: {
    flex: 2,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
  disabledButton: {
    backgroundColor: colors.lightGray,
  },
});