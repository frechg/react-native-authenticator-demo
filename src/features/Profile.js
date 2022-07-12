import React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';
import { styles } from '../common/styles';
import { AuthContext } from '../common/contexts/AuthProvider';

export const Profile = () => {
  const { authState, signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Welcome {authState.username}</Text>
      <Button title='Sign Out' onPress={() => signOut()} />
      <StatusBar style="auto" />
    </View>
  );
}