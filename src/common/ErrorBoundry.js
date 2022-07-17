import * as React from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import RNRestart from 'react-native-restart';

class ErrorBoundry extends React.Component {
  state = {
    error: false
  }

  static getDerivedStateFromError (error) {
    return { error: true }
  }

  handleBackToSignIn = async () => {
    RNRestart.Restart();
  }

  render () {
    if (this.state.error) {
      return (
        <SafeAreaView>
          <View>
            <Text>Oops, something went wrong.</Text>
            <Button>
              title={'Back to Sign In Screen'}
              onPress={() => this.handleBackToSignIn()}
              style={{marginVertical: 15, }}
            </Button>
          </View>
        </SafeAreaView>
      )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundry;