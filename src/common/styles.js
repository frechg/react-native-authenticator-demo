import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: 'rgb(40,40,40)',
    borderRadius: 6,
    alignItems: 'center',
    padding: 12,
  },
  buttonPrimaryText: {
    color: 'rgb(255,255,255)',
    fontSize: 18,
  },
  buttonSecondary: {
    backgroundColor: 'rgb(220,220,220)',
    borderRadius: 6,
    alignItems: 'center',
    padding: 12,
    marginTop: 12,
  },
  buttonSecondaryText: {
    color: 'rgb(60,60,60)',
    fontSize: 18,
  },
  buttonLink: {
    color: 'rgb(100,100,100)',
  }
});

export const formStyles = StyleSheet.create({
  formWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    width: '100%',
  },
  formError: {
    color: 'rgb(250,0,0)',
    marginTop: 6,
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
    color: 'rgb(60,60,60)',
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 12,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: 'rgb(140,140,140)',
    borderRadius: 0,
    width: '100%',
  },
});