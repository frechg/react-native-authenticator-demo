import React from 'react';
import {
    Alert,
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

export const SignUp = () => {
  const { signUp } = React.useContext(AuthContext);

  const validation = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, {setSubmitting}) => {
    await signUp(values).catch((error) => {
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
            initialValues={{username: '', email: '', password: ''}}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            <View>
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
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}