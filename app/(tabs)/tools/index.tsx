import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { 
  Calculator, 
  Calendar, 
  FileText, 
  PencilRuler, 
  Stethoscope, 
  Baby, 
  ArrowRight 
} from 'lucide-react-native';
import { colors } from '@/constants/colors';

export default function ToolsScreen() {
  const tools = [
    {
      id: 'calculator',
      name: 'Calculadora Obstétrica',
      description: 'Calcula fechas de parto, edad gestacional y más',
      icon: <Calculator size={24} color={colors.white} />,
      backgroundColor: colors.primary,
    },
    {
      id: 'menstrual',
      name: 'Rastreador Menstrual',
      description: 'Rastrea ciclos menstruales y predice ventanas fértiles',
      icon: <Calendar size={24} color={colors.white} />,
      backgroundColor: colors.secondary,
    },
    {
      id: 'templates',
      name: 'Plantillas de Reportes',
      description: 'Plantillas predefinidas para diagnósticos comunes',
      icon: <FileText size={24} color={colors.white} />,
      backgroundColor: colors.accent,
    },
    {
      id: 'measurements',
      name: 'Mediciones de Crecimiento',
      description: 'Rastrea el crecimiento y desarrollo fetal',
      icon: <PencilRuler size={24} color={colors.white} />,
      backgroundColor: '#4CAF50', // Verde
    },
    {
      id: 'screening',
      name: 'Guías de Tamizaje',
      description: 'Recomendaciones actualizadas de tamizaje',
      icon: <Stethoscope size={24} color={colors.white} />,
      backgroundColor: '#9C27B0', // Morado
    },
    {
      id: 'newborn',
      name: 'Evaluación del Recién Nacido',
      description: 'Herramientas para evaluar la salud del recién nacido',
      icon: <Baby size={24} color={colors.white} />,
      backgroundColor: '#FF9800', // Naranja
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Herramientas Clínicas</Text>
        <Text style={styles.subtitle}>
          Herramientas esenciales para asistir en el cuidado ginecológico y obstétrico
        </Text>
      </View>

      <View style={styles.toolsGrid}>
        {tools.map((tool) => (
          <TouchableOpacity key={tool.id} style={styles.toolCard}>
            <View style={[styles.iconContainer, { backgroundColor: tool.backgroundColor }]}>
              {tool.icon}
            </View>
            <View style={styles.toolInfo}>
              <Text style={styles.toolName}>{tool.name}</Text>
              <Text style={styles.toolDescription} numberOfLines={2}>
                {tool.description}
              </Text>
            </View>
            <ArrowRight size={20} color={colors.mediumGray} style={styles.arrow} />
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cálculos Recientes</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No hay cálculos recientes</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Plantillas Guardadas</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No hay plantillas guardadas</Text>
        </View>
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
    padding: 16,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.darkGray,
    lineHeight: 22,
  },
  toolsGrid: {
    padding: 16,
  },
  toolCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  toolInfo: {
    flex: 1,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    color: colors.mediumGray,
    lineHeight: 20,
  },
  arrow: {
    marginLeft: 8,
  },
  section: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 16,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.extraLightGray,
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.mediumGray,
  },
});