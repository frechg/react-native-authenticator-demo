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

const ProfileScreen = (props) => {
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
  const [formData, setFormData] = React.useState({email: '', password: ''});
  const [errors, setErrors] = React.useState({email: '', password: '', other: ''});
  const { signIn } = React.useContext(AuthContext);

  const handleTextChange = (text, type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: text,
    }));

    setErrors((prev) => ({
      ...prev,
      [type]: '',
    }));
  }

  const handleSignIn = () => {
    if (!formData.email || !formData.password ) {
      setErrors((prev) => ({
        ...prev,
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
        other: ''
      }));
    } else {
      signIn(formData).catch((error) => {
        setErrors((prev) => ({
          ...prev,
          other: error.message
        }));
      });
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1, backgroundColor: 'rgb(245,245,245)'}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={formStyles.formWrapper}>
          { errors.other ? (
            <View><Text style={formStyles.formError}>{ errors.other }</Text></View>
          ) : <></> }
          <View style={formStyles.fieldWrapper}>
            <Text style={formStyles.label}>Email</Text>
            { errors.email ? (
              <Text style={formStyles.formError}>{errors.email}</Text>
            ) : <></> }
            <TextInput
              style={formStyles.textInput}
              keyboardType='email-address'
              name='email' value={formData.email}
              onChangeText={(text) => handleTextChange(text, 'email')}
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
              value={formData.password}
              onChangeText={(text) => handleTextChange(text, 'password')}
            />
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
  const [formData, setFormData] = React.useState({username: '', email: '', password: ''});
  const [errors, setErrors] = React.useState({username: '', email: '', password: '', other: ''});
  const { signUp } = React.useContext(AuthContext);

  const handleTextChange = (text, type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: text,
    }));

    setErrors((prev) => ({
      ...prev,
      [type]: '',
    }));
  }

  const handleSignUp = () => {
    if (!formData.username || !formData.email || !formData.password ) {
      setErrors((prev) => ({
        ...prev,
        username: !formData.username ? 'Username is required' : '',
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
        other: ''
      }));
    } else {
      signUp(formData).catch((error) => {
        setErrors((prev) => ({
          ...prev,
          other: error.message
        }));
      });
    }
  }

  return (
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{flex: 1, backgroundColor: 'rgb(245,245,245)'}}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={formStyles.formWrapper}>
        { errors.other ? (
          <View><Text style={formStyles.formError}>{ errors.other }</Text></View>
        ) : <></> }
        <View style={formStyles.fieldWrapper}>
          <Text style={formStyles.label}>Username</Text>
          { errors.username ? (
            <Text style={formStyles.formError}>{errors.username}</Text>
          ) : <></> }
          <TextInput
            style={formStyles.textInput}
            name='username' value={formData.username}
            onChangeText={(text) => handleTextChange(text, 'username')}
          />
        </View>
        <View style={formStyles.fieldWrapper}>
          <Text style={formStyles.label}>Email</Text>
          { errors.email ? (
            <Text style={formStyles.formError}>{errors.email}</Text>
          ) : <></> }
          <TextInput
            style={formStyles.textInput}
            keyboardType='email-address'
            name='email' value={formData.email}
            onChangeText={(text) => handleTextChange(text, 'email')}
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
            value={formData.password}
            onChangeText={(text) => handleTextChange(text, 'password')}
          />
        </View>
        <TouchableOpacity style={styles.button} title='Sign Up' onPress={() => handleSignUp()}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Button title='Sign In' onPress={() => navigation.navigate('Sign In')} />
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [authState, authDispatch] = React.useReducer(
    (state, action) => {
      switch(action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...state,
            isLoading: false,
            authToken: action.token
          };
        case 'SIGN_IN':
          return {
            ...state,
            isSignout: false,
            authToken: action.token
          };
        case 'SIGN_OUT':
          return {
            ...state,
            isSignout: true,
            authToken: null
          };
      }
    }, 
    {
      isLoading: true,
      isSignout: false,
      authToken: null
    }
  );

  React.useEffect(() => {
    // On initial app render, look for a saved userToken
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await SecureStore.getItemAsync('authToken');
        authDispatch({ type: 'RESTORE_TOKEN', token: token });
      } catch (error) {
        throw new Error(error);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        
        const response = await fetch('http://192.168.1.13:3000/authenticate', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({user: { email: data.email, password: data.password }})
        })

        if (response.ok) {
          const jsonResponse = await response.json();
          await SecureStore.setItemAsync('authToken', jsonResponse.token);
          authDispatch({ type: 'SIGN_IN', token: jsonResponse.token });
        } else {
          throw new Error('Email or password are incorrect.');
        }
      },
      signOut: async (data) => {
        try {
          await SecureStore.deleteItemAsync('authToken');
          authDispatch({ type: 'SIGN_OUT' });
        } catch (error) {
          throw new Error(error);
        }
      },
      signUp: async (data) => {

        const response = await fetch('http://192.168.1.13:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({new_user: { ...data }})
        })

        if (response.ok) {
          const jsonResponse = await response.json();
          await SecureStore.setItemAsync('authToken', jsonResponse.token);
          authDispatch({type: 'SIGN_IN', token: jsonResponse.token});
        } else {
          const jsonResponse = await response.json();
          throw new Error(jsonResponse.errors[0])
        }
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
          ) : authState.authToken === null ? (
            <>
              <Stack.Screen name='Sign In' component={SignInScreen} options={{headerShown: false}}/>
              <Stack.Screen name='Sign Up' component={SignUpScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name='Profile' component={ProfileScreen}/>
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