import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useFormikContext } from 'formik';
import { styles } from './styles';

export const BasicSubmitButton = ({title, ...props}) => {
  /*
  const {
    formik: { handleSubmit, isSubmitting },
    ...buttonProps
  } = props
  */

  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
    <TouchableOpacity style={styles.buttonPrimary} title={title} onPress={handleSubmit} {...props}>
      <Text style={styles.buttonPrimaryText}>
        { isSubmitting ? 'Submiting...' : title }
      </Text>
    </TouchableOpacity>
  )
}