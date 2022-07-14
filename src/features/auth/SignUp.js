import React from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { BasicTextInput } from '../../common/components/BasicTextInput';
import { BasicSubmitButton } from '../../common/components/BasicSubmitButton';
import { styles, formStyles } from '../../common/styles';
import { AuthContext } from '../../common/contexts/AuthProvider';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

export const SignUp = ({ navigation }) => {
  const { signUp } = React.useContext(AuthContext);

  const validation = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values) => {
    await signUp(values);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={formStyles.formWrapper}>
          <Formik
            initialValues={{username: '', email: '', password: ''}}
            validationSchema={validation}
            onSubmit={async (values, {setSubmitting, setStatus}) => {
              await handleSubmit(values).catch((error) => {
                setStatus(error.message)
                setSubmitting(false);
              });
              setSubmitting(false);
            }}
          >
            {({status}) => (
              <View>
                { status && <Text style={formStyles.formError}>{status}</Text> }
                <Field
                  component={BasicTextInput}
                  name="username"
                  placeholder="Username"
                />
                <Field
                  component={BasicTextInput}
                  name="email"
                  placeholder="Email"
                  keyboardType='email-address'
                />
                <Field
                  component={BasicTextInput}
                  name="password"
                  placeholder="Password"
                  secureTextEntry={true}
                />
                <BasicSubmitButton title='Sign Up' />
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}