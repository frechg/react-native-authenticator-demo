import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { useFormikContext } from 'formik';
import { BasicTextInput } from '../BasicTextInput';

jest.mock('formik');

describe('<BasicTextInput />', () => {
  test('Renders a basic text input', () => {
    const field = {name: 'email', onBlur: jest.fn(), onChange: jest.fn(), value: ''};
    const form = {errors: {}, touched: {}};

    render(
      <BasicTextInput field={field} form={form} />
    )

    expect(screen).toMatchSnapshot();
  });

  test('Renders a basic text input with label', () => {
    const field = {name: 'email', onBlur: jest.fn(), onChange: jest.fn(), value: ''};
    const form = {errors: {}, touched: {}};

    render(
      <BasicTextInput field={field} form={form} label='Email' />
    )

    expect(screen.getByText('Email')).toBeDefined();
    expect(screen).toMatchSnapshot();
  });

  test('Renders a basic text input with default value', () => {
    const email = 'example@email.com';
    const field = {name: 'email', onBlur: jest.fn(), onChange: jest.fn(), value: email};
    const form = {errors: {}, touched: {}};

    render(
      <BasicTextInput field={field} form={form} />
    )

    expect(screen.getByDisplayValue(email)).toBeDefined();
  });

  test('Displays field errors after touched once', () => {
    const field = {name: 'email', onBlur: jest.fn(), onChange: jest.fn(), value: ''};
    const form = {errors: {email: 'Error'}, touched: {email: true}};

    render(
      <BasicTextInput field={field} form={form} />
    )

    expect(screen.getByText('Error')).toBeDefined();
  });

  test('Does not show field error before first touch', () => {
    const field = {name: 'email', onBlur: jest.fn(), onChange: jest.fn(), value: ''};
    const form = {errors: {email: 'Error'}, touched: {email: false}};

    render(
      <BasicTextInput field={field} form={form} />
    )

    expect(screen.queryByText('Error')).toBeFalsy();
  })
});