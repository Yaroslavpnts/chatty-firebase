import React from 'react';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { db, storage } from '../../utils/init-firebase';
import { SignInBtnStyled, SignInContainer } from './SignInWithGoogleButton.styled';
import GoogleLogo from '../../assets/svg/google-icon.svg';

interface SignInWithGoogleButtonProps {
  setResponseMessage: (message: string) => void;
}

const SignInWithGoogleButton: React.FC<SignInWithGoogleButtonProps> = ({ setResponseMessage }) => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const signInWithGoogleAuth = async () => {
    try {
      const auth = await signInWithGoogle();

      let downloadPhotoURL =
        auth.user.photoURL || (await getDownloadURL(ref(storage, 'unknown.png')));

      await updateProfile(auth.user, {
        photoURL: downloadPhotoURL,
      });

      await setDoc(doc(db, 'users', auth.user.uid), {
        uid: auth.user.uid,
        displayName: auth.user.displayName,
        photoUrl: auth.user.photoURL,
        email: auth.user.email,
      });

      await setDoc(doc(db, 'userChats', auth.user.uid), {}, { merge: true });

      navigate('/');
    } catch (error) {
      const { message } = error as { message: string };
      setResponseMessage(message);
    }
  };

  return (
    <SignInContainer onClick={signInWithGoogleAuth}>
      <img src={GoogleLogo} alt='' />
      <SignInBtnStyled>Sign in with Google</SignInBtnStyled>
    </SignInContainer>
  );
};

export default SignInWithGoogleButton;
