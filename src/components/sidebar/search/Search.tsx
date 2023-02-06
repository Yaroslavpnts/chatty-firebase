import React, { useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { UserChatStyled } from '../../../styles/globalStyles';
import { SearchFormStyled, SearchStyled } from './Search.styled';
import { db } from '../../../utils/init-firebase';
import { DBUserModel } from '../../../types/models';
import { Alert, Snackbar } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import SearchIcon from '../../../assets/svg/search-icon.svg';

const Search = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState<DBUserModel | null>(null);
  const [error, setError] = useState('');

  const { currentUser } = useAuth();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setError('');
  };

  const handleSearch = async () => {
    const citiesRef = collection(db, 'users');
    const q = query(citiesRef, where('displayName', '==', userName));

    const querySnapshot = await getDocs(q);
    try {
      querySnapshot.forEach((doc) => {
        setUser(doc.data() as DBUserModel);
      });
    } catch (error) {
      const { message } = error as { message: string };
      setError(message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser!.uid > user!.uid ? currentUser!.uid + user!.uid : user!.uid + currentUser!.uid;

    try {
      const chatsRef = doc(db, 'chats', combinedId);
      const docSnap = await getDoc(chatsRef);

      if (!docSnap.exists()) {
        await setDoc(chatsRef, { messages: [] });

        //create user chats
        const currentUserChatRef = doc(db, 'userChats', currentUser!.uid);
        const userChatRef = doc(db, 'userChats', user!.uid);

        await updateDoc(currentUserChatRef, {
          [`${combinedId}.userInfo`]: {
            uid: user?.uid,
            displayName: user?.displayName,
            photoUrl: user?.photoUrl,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });

        await updateDoc(userChatRef, {
          [`${combinedId}.userInfo`]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoUrl: currentUser?.photoURL,
          },
          [`${combinedId}.date`]: serverTimestamp(),
        });
      } else {
        // doc.data() will be undefined in this case
        console.log('document has already exists!');
      }
    } catch (error) {}

    setUser(null);
    setUserName('');
  };

  return (
    <SearchStyled>
      <SearchFormStyled>
        <input
          type='text'
          placeholder='Find a user'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img src={SearchIcon} alt='' />
      </SearchFormStyled>
      {user && (
        <UserChatStyled onClick={handleSelect}>
          <img src={user.photoUrl} alt='user-avatar' />
          <div>
            <p>{user.displayName}</p>
          </div>
        </UserChatStyled>
      )}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </SearchStyled>
  );
};

export default Search;
