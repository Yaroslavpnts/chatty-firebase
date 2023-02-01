import React, { useState } from 'react';
import { Wrapper } from '../../components/formWrapper/FormWrapper';
import { useFormik } from 'formik';
import { Alert, Snackbar, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '../../hooks/useAuth';
import { FormStyled, HeadingPageStyled, RowStyled } from '../../styles/globalStyles';
import { PageWrapper } from '../../components/pageWrapper/PageWrapper';
import InputWithIcon from '../../UI/inputWithIcon/InputWithIcon';
import EmailIcon from '../../assets/svg/email.svg';
import { SubmitButton } from '../../UI/submitButton/SubmitButton';

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    openSuccess ? setOpenSuccess(false) : setOpenError(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await forgotPassword(values.email);
        setResponseMessage('Link for reset your password was sended to your email address');
        setOpenSuccess(true);
      } catch (error) {
        const { message } = error as { message: string };
        setResponseMessage(message);
        setOpenError(true);
      }
    },
  });

  return (
    <PageWrapper>
      <HeadingPageStyled>Forgot password</HeadingPageStyled>

      <Wrapper>
        <FormStyled onSubmit={formik.handleSubmit}>
          <Stack spacing={3} alignItems='center'>
            <RowStyled>
              <InputWithIcon
                name='email'
                type='text'
                placeholder='email'
                onChange={formik.handleChange}
                value={formik.values.email}
              >
                <img src={EmailIcon} alt='' />
              </InputWithIcon>
              {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </RowStyled>
            <SubmitButton loading={formik.isSubmitting}>Submit</SubmitButton>
          </Stack>
        </FormStyled>
      </Wrapper>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {responseMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
}
