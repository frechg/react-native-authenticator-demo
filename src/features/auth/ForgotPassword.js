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
import { AuthContext } from '../../common/contexts/AuthProvider';
import { styles, formStyles } from '../../common/styles';

export const ForgotPassword = ({ navigation }) => {
  const [isRequestSuccess, setRequestSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({email: ''});
  const [errors, setErrors] = React.useState({email: '', other: ''});
  const { passwordReset } = React.useContext(AuthContext);

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

  const handleError = (error) => {
    setErrors((prev) => ({
      ...prev,
      other: error
    }));
  }

  const handlePasswordReset = async () => {
    if (!formData.email) {
      setErrors((prev) => ({
        ...prev,
        email: !formData.email ? 'Email is required' : '',
        other: ''
      }));
    } else {
      const requestSent = await passwordReset(formData.email)
      .catch((error) => {
        handleError(error.message);
      });

      if (requestSent) {
        setRequestSuccess(true);
      } else {
        handleError('Sorry, something went wrong.');
      }
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1, justifyContent: 'center', alignItems:'center', backgroundColor: 'rgb(245,245,245)'}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        { isRequestSuccess ? (
          <View>
            <Text style={{padding: 32, textAlign: 'center'}}>Check your email for a link to reset your password.</Text>
          </View>
        ) : (
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
                placeholder='Email'
                value={formData.email}
                onChangeText={(text) => handleTextChange(text, 'email')}
              />
            </View>
            <TouchableOpacity style={styles.buttonPrimary} title='Request Password Reset' onPress={() => handlePasswordReset()}>
              <Text style={styles.buttonPrimaryText}>Request Password Reset</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}