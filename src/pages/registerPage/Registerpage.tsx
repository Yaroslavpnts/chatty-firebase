import React, { useState } from 'react';
// import { FaGoogle } from 'react-icons/fa';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useFormik } from 'formik';
import { Wrapper } from '../../components/formWrapper/FormWrapper';
import { Alert, Stack } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { useAuth } from '../../hooks/useAuth';
import { FormStyled, HeadingPageStyled, RowStyled } from '../../styles/globalStyles';
import { db, storage } from '../../utils/init-firebase';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { RegisterModel } from '../../types/models';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components/pageWrapper/PageWrapper';
import CropImage from '../../components/cropImage/CropImage';
import InputWithIcon from '../../UI/inputWithIcon/InputWithIcon';
import UserIcon from '../../assets/svg/user.svg';
import EmailIcon from '../../assets/svg/email.svg';
import PasswordIcon from '../../assets/svg/password.svg';
import { SubmitButton } from '../../UI/submitButton/SubmitButton';

export default function Registerpage() {
  const { register } = useAuth();

  const [openError, setOpenError] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const navigate = useNavigate();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  const validate = (values: RegisterModel) => {
    const errors = {} as RegisterModel;

    if (!values.email) {
      errors.email = 'Required';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Password should be at least 6 characters';
    }

    if (!values.displayName) {
      errors.displayName = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
      file: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting }) => {
      const file = values.file as unknown as File;
      const { displayName, email, password } = values;
      let downloadURL;

      try {
        const response = await register(email, password);

        if (!file) {
          downloadURL = await getDownloadURL(ref(storage, 'unknown.png'));
        } else {
          const storageRef = ref(storage, file.name);

          const uploadTask = await uploadBytes(storageRef, file);
          downloadURL = await getDownloadURL(uploadTask.ref);
        }

        await updateProfile(response.user, {
          displayName,
          photoURL: downloadURL,
        });

        await setDoc(doc(db, 'users', response.user.uid), {
          uid: response.user.uid,
          displayName: displayName,
          photoUrl: downloadURL,
          email: email,
        });

        await setDoc(doc(db, 'userChats', response.user.uid), {});

        navigate('../', { replace: true });
      } catch (error) {
        setOpenError(true);
        const { message } = error as { message: string };
        setResponseMessage(message);
      }
      setSubmitting(false);
    },
  });

  return (
    <PageWrapper>
      <HeadingPageStyled>Register</HeadingPageStyled>
      <Wrapper>
        <FormStyled onSubmit={formik.handleSubmit}>
          <Stack spacing={2} alignItems='center'>
            <RowStyled>
              <InputWithIcon
                id='displayName'
                name='displayName'
                type='text'
                placeholder='name'
                onChange={formik.handleChange}
                value={formik.values.displayName}
              >
                <img src={UserIcon} alt='' />
              </InputWithIcon>
              {/* <input
                id='displayName'
                name='displayName'
                type='text'
                placeholder='name'
                onChange={formik.handleChange}
                value={formik.values.displayName}
              /> */}
              {formik.touched.displayName && formik.errors.displayName ? (
                <div>{formik.errors.displayName}</div>
              ) : null}
            </RowStyled>
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
              {/* <input
                id='email'
                name='email'
                type='text'
                placeholder='email'
                onChange={formik.handleChange}
                value={formik.values.email}
              /> */}
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
              {/* <input
                id='password'
                name='password'
                type='password'
                placeholder='password'
                onChange={formik.handleChange}
                value={formik.values.password}
              /> */}
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </RowStyled>
            <RowStyled>
              <CropImage setFieldValue={formik.setFieldValue} />
            </RowStyled>
            <SubmitButton loading={formik.isSubmitting}>Submit</SubmitButton>
          </Stack>
        </FormStyled>
      </Wrapper>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
}
