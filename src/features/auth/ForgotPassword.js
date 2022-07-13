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
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { BasicTextInput } from '../../common/BasicTextInput';

import { styles, formStyles } from '../../common/styles';
import { BasicSubmitButton } from '../../common/BasicSubmitButton';

export const ForgotPassword = ({ navigation }) => {
  const [isRequestSuccess, setRequestSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState({email: '', other: ''});
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
    const requestSent = await passwordReset(JSON.stringify(values))
    .catch((error) => {
      setStatus(error.message);
    });

    if (requestSent) {
      setRequestSuccess(true);
    } else {
      setStatus('Sorry, something went wrong.');
    }

    setSubmitting(false);
  }

  const testingSubmit = (values, {setSubmitting, setStatus}) => {
    setTimeout(() => {
      alert(JSON.stringify(values));
      setSubmitting(false);
      setStatus('Error');
    }, 2000);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1, justifyContent: 'center', alignItems:'center', backgroundColor: 'rgb(245,245,245)'}}
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
              {({status}) => (
                <View>
                  { status && <Text style={formStyles.formError}>{status}</Text> }
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