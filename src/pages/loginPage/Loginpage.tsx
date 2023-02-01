import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Alert, Snackbar, Stack } from '@mui/material';
import { Wrapper } from '../../components/formWrapper/FormWrapper';
import { DividerWithText } from '../../UI/divider/DividerWithText';
import { PageWrapper } from '../../components/pageWrapper/PageWrapper';
import { SubmitButton } from '../../UI/submitButton/SubmitButton';
import SignInWithGoogleButton from '../../UI/signInWithGoogleButton/SignInWithGoogleButton';
import InputWithIcon from '../../UI/inputWithIcon/InputWithIcon';
import { LinkStyled, SignUpButton } from './LoginPage.styled';
import { FormStyled, HeadingPageStyled, RowStyled } from '../../styles/globalStyles';
import EmailIcon from '../../assets/svg/email.svg';
import PasswordIcon from '../../assets/svg/password.svg';
import { EmailPassModel } from '../../types/models';

export default function Loginpage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [responseMessage, setResponseMessage] = useState('');

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setResponseMessage('');
  };

  const validate = (values: EmailPassModel) => {
    const errors = {} as EmailPassModel;

    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values.email, values.password);
        navigate('/');
      } catch (error) {
        const { message } = error as { message: string };
        setResponseMessage(message);
      }
    },
  });

  return (
    <PageWrapper>
      <HeadingPageStyled>Login</HeadingPageStyled>
      <Wrapper>
        <FormStyled onSubmit={formik.handleSubmit}>
          <Stack spacing={3} alignItems='center'>
            <RowStyled>
              <InputWithIcon
                placeholder='email'
                name='email'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.email}
                autoComplete='off'
              >
                <img src={EmailIcon} alt='' />
              </InputWithIcon>
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </RowStyled>
            <RowStyled>
              <InputWithIcon
                placeholder='password'
                name='password'
                type='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                autoComplete='new-password'
              >
                <img src={PasswordIcon} alt='' />
              </InputWithIcon>
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
              <LinkStyled to='/forgot-password'>Forgot password?</LinkStyled>
            </RowStyled>
            <SubmitButton loading={formik.isSubmitting}>Submit</SubmitButton>
            <SignUpButton onClick={() => navigate('/register')}>Sign Up</SignUpButton>
          </Stack>
        </FormStyled>
        <DividerWithText>OR</DividerWithText>
        {/* <SignInWithGoogleButtonStyled onClick={signInWithGoogleAuth}>
          Sign in with Google
        </SignInWithGoogleButtonStyled> */}
        <SignInWithGoogleButton setResponseMessage={setResponseMessage} />
      </Wrapper>
      <Snackbar open={!!responseMessage} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
}
