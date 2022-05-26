import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';

import { styles } from './src/styles';
import { AuthContext } from './src/AuthProvider';

import { SignInScreen } from './src/SignInScreen';
import { SignUpScreen } from './src/SignUpScreen';
import { ProfileScreen } from './src/ProfileScreen';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [currentUser, setCurrentUser] = React.useState({})
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
          setCurrentUser({username: jsonResponse.username});
          authDispatch({ type: 'SIGN_IN', token: jsonResponse.token });
        } else {
          throw new Error('Email or password are incorrect.');
        }
      },
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync('authToken');
          setCurrentUser({username: ''});
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
          setCurrentUser({username: jsonResponse.username});
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
              <Stack.Screen name='Sign Up' component={SignUpScreen} options={{headerShown: false}}/>
            </>
          ) : (
            <>
              <Stack.Screen name='Profile'>
                { props => <ProfileScreen {...props} userName={currentUser.username} /> }
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}