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
import { styles, formStyles } from '../../common/styles';
import { AuthContext } from '../../common/contexts/AuthProvider';

export const SignIn = ({ navigation }) => {
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

  const handleSignIn = async () => {
    if (!formData.email || !formData.password ) {
      setErrors((prev) => ({
        ...prev,
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
        other: ''
      }));
    } else {
      await signIn(formData).catch((error) => {
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
              name='email'
              value={formData.email}
              placeholder='Your email'
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
              placeholder='Your password'
              onChangeText={(text) => handleTextChange(text, 'password')}
            />
          </View>
          <TouchableOpacity style={styles.buttonPrimary} title='Sign In' onPress={() => handleSignIn()}>
            <Text style={styles.buttonPrimaryText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} title='Create Account' onPress={() => navigation.navigate('Create Account')}>
            <Text style={styles.buttonSecondaryText}>Create Account</Text>
          </TouchableOpacity>
          <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'center'}}>
            <Button title='Forgot Password' onPress={() => navigation.navigate('Forgot Password')} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}