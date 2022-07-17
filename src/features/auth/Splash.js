import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from '../../common/styles';
import { AuthContext } from '../../common/contexts/AuthProvider';

export const Splash = () => {
  const { getAuthState } = React.useContext(AuthContext);

  React.useEffect(() => {
   getAuthState();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator testID='LOADING' size='large' />
    </View>
  );
}