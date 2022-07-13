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
import { BasicTextInput } from '../../common/BasicTextInput';
import { BasicSubmitButton } from '../../common/BasicSubmitButton';
import { formStyles } from '../../common/styles';
import { AuthContext } from '../../common/contexts/AuthProvider';
import { Formik, Field } from 'formik';

export const SignUp = ({ navigation }) => {
  const { signUp } = React.useContext(AuthContext);

  const validate = (values) => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  }

  const handleSubmit = async (values) => {
    await signUp(values);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1, backgroundColor: 'rgb(245,245,245)'}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={formStyles.formWrapper}>
          <Formik
            initialValues={{username: '', email: '', password: ''}}
            validate={validate}
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