import * as React from 'react';
import { View, Text, TextInput } from 'react-native';
import { formStyles } from '../styles';

export const BasicTextInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched },
    ...inputProps
  } = props

  const label = props.label ? props.label : false

  return (
    <View style={formStyles.fieldWrapper}>
      { label && <Text style={formStyles.label}>{label}</Text>}
      <TextInput
        style={formStyles.textInput}
        onChangeText={onChange(name)}
        onBlur={onBlur(name)}
        value={value}
        {...inputProps}
      />
      {( errors[name] && touched[name]) && <Text style={formStyles.formError}>{errors[name]}</Text>}
    </View>
  )
}