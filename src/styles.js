import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#25273d',
    borderRadius: 6,
    alignItems: 'center',
    padding: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export const formStyles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    width: '100%',
  },
  formError: {
    color: 'red',
    marginBottom: 6,
  },
  fieldWrapper: {
    alignItems: 'flex-start',
    marginBottom: 24,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontWeight: 'bold',
    color: 'rgb(150,150,150)',
    textTransform: 'uppercase',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgb(120,120,120)',
    borderRadius: 6,
    width: '100%',
  },
});