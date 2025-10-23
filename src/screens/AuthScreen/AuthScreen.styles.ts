import { StyleSheet } from 'react-native';
import { COLORS } from '@utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: COLORS.background, 
  },
  header: {
    fontSize: 48,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  
  errorText: {
    color: '#DC3545', // Red error color
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  // Style for the AuthForm container
  formContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default styles;
