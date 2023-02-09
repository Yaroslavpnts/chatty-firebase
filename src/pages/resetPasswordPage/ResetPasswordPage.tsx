import React, { useState } from 'react';
import { Wrapper } from '../../components/formWrapper/FormWrapper';
import { useAuth } from '../../hooks/useAuth';
import { useFormik } from 'formik';
import { Alert, Snackbar, Stack } from '@mui/material';
import { RowStyled, FormStyled, HeadingPageStyled } from '../../styles/globalStyles';
import { useQuery } from '../../hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components/pageWrapper/PageWrapper';
import InputWithIcon from '../../UI/inputWithIcon/InputWithIcon';
import PasswordIcon from '../../assets/svg/password.svg';
import { SubmitButton } from '../../UI/submitButton/SubmitButton';

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const query = useQuery();

  const navigate = useNavigate();

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    openSuccess ? setOpenSuccess(false) : setOpenError(false);
  };

  const validate = (values: { password: string }) => {
    const errors = {} as { password: string };

    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const oobCode = query.get('oobCode') as string;
        await resetPassword(oobCode, values.password);

        setResponseMessage('Password was changed');
        setOpenSuccess(true);

        navigate('/login', { replace: true });
      } catch (error) {
        const { message } = error as { message: string };
        setResponseMessage(message);
        setOpenError(true);
      }
    },
  });

  return (
    <PageWrapper>
      <HeadingPageStyled>Reset password</HeadingPageStyled>
      <Wrapper>
        <FormStyled onSubmit={formik.handleSubmit}>
          <Stack spacing={3} alignItems='center'>
            <RowStyled>
              <InputWithIcon
                name='password'
                type='password'
                onChange={formik.handleChange}
                value={formik.values.password}
              >
                <img src={PasswordIcon} alt='' />
              </InputWithIcon>
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </RowStyled>
            <SubmitButton loading={formik.isSubmitting}>Submit</SubmitButton>
          </Stack>
        </FormStyled>
      </Wrapper>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          LogIn completed
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
