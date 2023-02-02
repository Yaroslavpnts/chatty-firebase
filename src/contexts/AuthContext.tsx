import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/init-firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

const register = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider);
};

const logout = () => {
  return signOut(auth);
};

const forgotPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/reset-password' });
};

const resetPassword = (oobCode: string, newPassword: string) => {
  return confirmPasswordReset(auth, oobCode, newPassword);
};

export const AuthContext = createContext({
  currentUser: null as User | null,
  register,
  login,
  logout,
  signInWithGoogle,
  forgotPassword,
  resetPassword,
});

interface AuthContextProps {
  children: React.ReactNode[] | React.ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      await setPersistence(auth, browserSessionPersistence);

      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        signInWithGoogle,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
