import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, Search, Filter } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { mockPatients } from '@/data/mockData';
import PatientCard from '@/components/patients/PatientCard';

export default function PatientsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  const filteredPatients = mockPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={colors.mediumGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search patient name or ID"
            placeholderTextColor={colors.mediumGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredPatients}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PatientCard
            patient={item}
            onPress={() => router.push({
              pathname: '/(tabs)/patients/details',
              params: { id: item.id }
            })}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No patients found</Text>
          </View>
        }
      />
      
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => router.push('/(tabs)/patients/add')}
      >
        <Plus size={24} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.extraLightGray,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.black,
  },
  filterButton: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.extraLightGray,
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.mediumGray,
  },
  fabButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});