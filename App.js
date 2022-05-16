import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

const AuthContext = React.createContext();

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title='Profile' onPress={() => navigation.navigate('Profile')} />
      <StatusBar style="auto" />
    </View>
  );
}

const ProfileScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button title='Sign Out' onPress={() => signOut()} />
      <StatusBar style="auto" />
    </View>
  );
}

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({email: '', password: ''});
  const { signIn } = React.useContext(AuthContext);

  const handleSignIn = () => {
    if (!email && !password) {
      setErrors({
        email: 'Email is required',
        password: 'Password is required.'
      });
    } else if (!email) {
      setErrors((prev) => ({
        ...prev,
        email: 'Email is required',
      }));
    } else if (!password) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password is required',
      }));
    } else if (email && password) {
      signIn({email: email, password: password});
    }
  }

  const clearError = () => {
    setError('');
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1, backgroundColor: 'rgb(245,245,245)'}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={formStyles.formWrapper}>
          <View style={formStyles.fieldWrapper}>
            <Text style={formStyles.label}>Email</Text>
            { errors.email ? (
              <Text style={formStyles.formError}>{errors.email}</Text>
            ) : <></> }
            <TextInput
              style={formStyles.textInput}
              keyboardType='email-address'
              name='email' value={email}
              onChangeText={setEmail}
              onFocus={() => setErrors((prev) => ({...prev, email: ''}))}
            />
          </View>
          <View style={formStyles.fieldWrapper}>
            <Text style={formStyles.label}>Password</Text>
            { errors.password ? (
              <Text style={formStyles.formError}>{errors.password}</Text>
            ) : <></> }
            <TextInput
              style={formStyles.textInput}
              secureTextEntry={true}
              name='password'
              value={password}
              onChangeText={setPassword}
              onFocus={() => setErrors((prev) => ({...prev, password: ''}))}/>
          </View>
          <TouchableOpacity style={styles.button} title='Sign In' onPress={() => handleSignIn()}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <Button title='Sign Up' onPress={() => navigation.navigate('Sign Up')} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const SignUpScreen = ({ navigation }) => {
  const { signUp } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <Button title='Sign Up' onPress={() => signUp()} />
      <Button title='Sign In' onPress={() => navigation.navigate('Sign In')} />
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [authState, dispatch] = React.useReducer(
    (prevState, action) => {
      switch(action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            isLoading: false,
            userToken: action.token
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          };
      }
    }, 
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      // Try to retrieve a userToken from secureStorage
      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Handle retrevial error
        console.error(e);
      }

      // Call dispatch to update the authState
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: (data) => {
        console.log('Sign In data: ', data);
        dispatch({ type: 'SIGN_IN', token: 'dummy_toke' });
      },
      signOut: (data) => {
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: (data) => {
        dispatch({type: 'SIGN_IN', token: 'dummy_toke'});
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          { authState.isLoading ? (
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : authState.userToken === null ? (
            <>
              <Stack.Screen name='Sign In' component={SignInScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Sign Up' component={SignUpScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='Profile' component={ProfileScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
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

const formStyles = StyleSheet.create({
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