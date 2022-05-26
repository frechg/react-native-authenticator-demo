import React from 'react';
import {
    Text,
    View,
    Button,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { styles, formStyles } from './styles';
import { AuthContext } from './AuthProvider';

export const SignInScreen = ({ navigation }) => {
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