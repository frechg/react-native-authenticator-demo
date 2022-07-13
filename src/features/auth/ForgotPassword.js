import React from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { AuthContext } from '../../common/contexts/AuthProvider';
import { Formik, Field } from 'formik';

import { BasicTextInput } from '../../common/BasicTextInput';
import { BasicSubmitButton } from '../../common/BasicSubmitButton';
import { styles, formStyles } from '../../common/styles';

export const ForgotPassword = ({ navigation }) => {
  const [isRequestSuccess, setRequestSuccess] = React.useState(false);
  const { passwordReset } = React.useContext(AuthContext);

  const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  }

  const handleSubmit = async (values, {setSubmitting, setStatus}) => {
    const requestSent = await passwordReset(values)
    .catch((error) => {
      setStatus(error.message);
      setSubmitting(false);
    });

    if (requestSent) {
      setRequestSuccess(true);
    } else {
      setStatus('Sorry, something went wrong.');
    }

    setSubmitting(false);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={formStyles.formWrapper}>
          { isRequestSuccess ? (
            <View>
              <Text style={{padding: 32, textAlign: 'center'}}>Check your email for a link to reset your password.</Text>
            </View>
          ) :
            <Formik
              initialValues={{email: ''}}
              validate={validate}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <View>
                  { formik.status && <Text style={formStyles.formError}>{formik.status}</Text> }
                  <Field
                    component={BasicTextInput}
                    name='email'
                    placeholder='Email'
                    keyboardType='email-address'
                  />
                  <BasicSubmitButton title='Request password reset' />
                </View>
              )}
            </Formik>
          }
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}