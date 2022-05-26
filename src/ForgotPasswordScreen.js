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

export const ForgotPasswordScreen = ({ navigation }) => {
  const [formData, setFormData] = React.useState({email: ''});
  const [errors, setErrors] = React.useState({email: '', other: ''});

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

  const handlePasswordRequest = () => {
    if (!formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: !formData.email ? 'Email is required' : '',
        other: ''
      }));
    } else {
      requestPasswordReset(formData.email)
    }
  }

  const requestPasswordReset = (email) => {
    // POST request
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
          <TouchableOpacity style={styles.buttonPrimary} title='Request Password Reset' onPress={() => handlePasswordRequest()}>
            <Text style={styles.buttonPrimaryText}>Request Password Reset</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}