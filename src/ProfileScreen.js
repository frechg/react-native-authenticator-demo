import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { AuthContext } from './AuthProvider';

export const ProfileScreen = (props) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Welcome {props.userName}</Text>
      <Button title='Sign Out' onPress={() => signOut()} />
      <StatusBar style="auto" />
    </View>
  );
}