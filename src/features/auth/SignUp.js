import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { styles, formStyles } from '../../common/styles';
import { AuthContext } from '../../common/contexts/AuthProvider';

export const SignUp = ({ navigation }) => {
  const [formData, setFormData] = React.useState({username: '', email: '', password: ''});
  const [errors, setErrors] = React.useState({username: '', email: '', password: '', other: ''});
  const { signUp } = React.useContext(AuthContext);

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

  const handleSignUp = () => {
    if (!formData.username || !formData.email || !formData.password ) {
      setErrors((prev) => ({
        ...prev,
        username: !formData.username ? 'Username is required' : '',
        email: !formData.email ? 'Email is required' : '',
        password: !formData.password ? 'Password is required' : '',
        other: ''
      }));
    } else {
      signUp(formData).catch((error) => {
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
            <Text style={formStyles.label}>Username</Text>
            { errors.username ? (
              <Text style={formStyles.formError}>{errors.username}</Text>
            ) : <></> }
            <TextInput
              style={formStyles.textInput}
              name='username' value={formData.username}
              onChangeText={(text) => handleTextChange(text, 'username')}
            />
          </View>
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
          <TouchableOpacity style={styles.buttonPrimary} title='Sign Up' onPress={() => handleSignUp()}>
            <Text style={styles.buttonPrimaryText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}