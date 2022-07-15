import React from 'react';
import {
    Alert,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { AuthContext } from '../../common/contexts/AuthProvider';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { BasicTextInput } from '../../common/components/BasicTextInput';
import { BasicSubmitButton } from '../../common/components/BasicSubmitButton';
import { styles, formStyles } from '../../common/styles';

export const ForgotPassword = ({ navigation }) => {
  const { passwordReset } = React.useContext(AuthContext);

  const validation = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required')
  });

  const handleSubmit = async (values, {setSubmitting}) => {
    await passwordReset(values)
    .then((response) => {
      if (response.ok) {
        Alert.alert(
          'Success',
          'Check your email for a link to reset your password.',
          [{
            text: 'Ok',
            onPress: () => navigation.navigate('Sign In')
          }]
        );
      } else {
        Alert.alert('Error', 'Password reset rquest failed.');
      }
    })
    .catch((error) => {
      Alert.alert('Error', error.message);
    });

    setSubmitting(false);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={formStyles.formWrapper}>
          <Formik
            initialValues={{email: ''}}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            <View>
              <Field
                component={BasicTextInput}
                name='email'
                placeholder='Email'
                keyboardType='email-address'
              />
              <BasicSubmitButton title='Request password reset' />
            </View>
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}