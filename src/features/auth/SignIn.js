import React, { useEffect } from 'react';
import {
    Text,
    View,
    Button,
    TouchableOpacity,
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

export const SignIn = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);

  const validation = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, {setSubmitting, setStatus}) => {
    await signIn(values).catch((error) => {
      setStatus(error.message)
      setSubmitting(false);
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
            initialValues={{email: '', password: ''}}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            {({status}) => (
              <View>
                { status && <Text style={formStyles.formError}>{status}</Text> }
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
                <BasicSubmitButton title='Sign In' />
              </View>
            )}
          </Formik>
          <TouchableOpacity style={styles.buttonSecondary} title='Create Account' onPress={() => navigation.navigate('Create Account')}>
            <Text style={styles.buttonSecondaryText}>Create Account</Text>
          </TouchableOpacity>
          <View style={{collr: 'rgb(100,100,100', marginTop: 10, flexDirection: 'row', justifyContent: 'center'}}>
            <Button
              title='Forgot Password'
              color='rgb(120,120,120)'
              onPress={() => navigation.navigate('Forgot Password')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}