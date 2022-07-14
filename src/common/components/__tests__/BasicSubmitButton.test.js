import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { useFormikContext } from 'formik';
import { BasicSubmitButton } from '../BasicSubmitButton';

jest.mock('formik');

describe('<BasicSubmitButton />', () => {
  test('Renders a basic submit button', () => {
    const handleSubmit = jest.fn();
    const isSubmitting = false;
    useFormikContext.mockReturnValue({handleSubmit, isSubmitting});

    const title = 'Test Submit';
    render(
      <BasicSubmitButton title={title} />
    )

    expect(screen.getByText(title)).toBeTruthy();
    expect(screen).toMatchSnapshot();
  });

  test('Calls the submit handler passed by the Formik context', async () => {
    const handleSubmit = jest.fn();
    const isSubmitting = false;
    useFormikContext.mockReturnValue({handleSubmit, isSubmitting});

    render(
      <BasicSubmitButton title='Submit Test' />
    )
    
    fireEvent.press(screen.getByText('Submit Test'));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  test('Hides button title and shows loading indicator when submitting', async () => {
    const handleSubmit = jest.fn();
    const isSubmitting = true;
    useFormikContext.mockReturnValue({handleSubmit, isSubmitting});

    render(
      <BasicSubmitButton title='Submit Test' />
    )
    
    await waitFor(() => {
      expect(screen.getByText('Submitting...')).toBeTruthy();
    });
  });
});