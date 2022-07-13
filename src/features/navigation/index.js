import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../common/contexts/AuthProvider';

import { Splash } from '../auth/Splash';
import { SignIn } from '../auth/SignIn';
import { SignUp } from '../auth/SignUp';
import { ForgotPassword } from '../auth/ForgotPassword';
import { Profile } from '../Profile';

const Stack = createNativeStackNavigator();

export const Navigation = (props) => {
  const { authState } = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { authState.isLoading ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : authState.authToken === null ? (
          <>
            <Stack.Screen
              name='Sign In'
              component={SignIn}
              options={{headerShown: false}}
              initialParams={{message: null}}
            />
            <Stack.Screen
              name='Create Account'
              component={SignUp}
            />
            <Stack.Screen
              name='Forgot Password'
              component={ForgotPassword}
            />
          </>
        ) : (
          <>
            <Stack.Screen name='Profile' component={Profile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}