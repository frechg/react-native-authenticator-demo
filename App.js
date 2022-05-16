import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
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
  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Sign In</Text>
      <Button title='Sign In' onPress={() => signIn()} />
      <Button title='Sign Up' onPress={() => navigation.navigate('Sign Up')} />
      <StatusBar style="auto" />
    </View>
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
      signIn: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy_toke' });
      },
      signOut: async (data) => {
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
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
              <Stack.Screen name='Sign In' component={SignInScreen} />
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
});
