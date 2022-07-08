import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../common/styles';
import { AuthContext } from '../../common/contexts/AuthProvider';

export const Splash = () => {
  const { getAuthState } = React.useContext(AuthContext);

  React.useEffect(() => {
    getAuthState();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
}