import * as React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useFormikContext } from 'formik';
import { styles } from '../styles';

export const BasicSubmitButton = ({title, ...props}) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
    <TouchableOpacity style={styles.buttonPrimary} title={title} onPress={handleSubmit} {...props}>
      { isSubmitting ? (
          <ActivityIndicator size='small' style={{marginVertical: 1}}/>
        ) :
          <Text style={styles.buttonPrimaryText}>{title}</Text>
      }
    </TouchableOpacity>
  )
}