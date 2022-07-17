import * as React from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import { styles } from './styles';
import * as Updates from 'expo-updates';

class ErrorBoundry extends React.Component {
  state = {
    error: false
  }

  static getDerivedStateFromError (error) {
    return { error: true }
  }

  handleBackToSignIn = async () => {
    await Updates.reloadAsync();
  }

  render () {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text>Oops, something went wrong.</Text>
          <Button
            title='Ok'
            onPress={() => this.handleBackToSignIn()}
            style={{marginVertical: 15, }}
          />
        </View>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundry;