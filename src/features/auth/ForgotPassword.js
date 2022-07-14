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
import * as Yup from 'yup';

import { BasicTextInput } from '../../common/BasicTextInput';
import { BasicSubmitButton } from '../../common/BasicSubmitButton';
import { styles, formStyles } from '../../common/styles';

export const ForgotPassword = ({ navigation }) => {
  const [isRequestSuccess, setRequestSuccess] = React.useState(false);
  const { passwordReset } = React.useContext(AuthContext);

  const validation = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required')
  });

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
              validationSchema={validation}
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