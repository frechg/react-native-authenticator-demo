import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#000',
    borderRadius: 6,
    alignItems: 'center',
    padding: 12,
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonSecondary: {
    backgroundColor: 'rgb(200,200,200)',
    borderRadius: 6,
    alignItems: 'center',
    padding: 12,
    marginTop: 12,
  },
  buttonSecondaryText: {
    color: 'rgb(20,20,20)',
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
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 12,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: 'rgb(20,20,20)',
    borderRadius: 0,
    width: '100%',
  },
});