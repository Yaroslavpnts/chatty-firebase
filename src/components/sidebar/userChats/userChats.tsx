import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { changeUser, UserType } from '../../../contexts/ChatContext';
import { useAuth } from '../../../hooks/useAuth';
import { UserChatStyled } from '../../../styles/globalStyles';
import { DBUserChatsModel } from '../../../types/models';
import { db } from '../../../utils/init-firebase';
import LastMsgImage from '../../../assets/svg/image.svg';
import { LastMessageContainer, LastMessageImg, UserChatsContainer } from './userChats.styled';
import { useChatContext } from '../../../hooks/useChat';

const Chats = () => {
  const [chats, setChats] = useState<DBUserChatsModel>({});
  const { currentUser } = useAuth();

  const { state, dispatch } = useChatContext();

  const handleSelect = (user: UserType) => {
    dispatch(changeUser(user));
  };

  useEffect(() => {
    const getChats = () => {
      const docRef = doc(db, 'userChats', currentUser!.uid);

      const unsub = onSnapshot(docRef, (doc) => {
        setChats(doc.data() as DBUserChatsModel);
      });

      return unsub;
    };

    if (currentUser?.uid) {
      return getChats();
    }
  }, [currentUser!.uid]);

  // console.log(chats);
  // console.log(Object.entries(chats));

  return (
    <UserChatsContainer>
      {chats &&
        Object.entries(chats)
          .sort((a, b) => b[1].date?.toDate().getTime() - a[1].date?.toDate().getTime())
          .map((chat) => (
            <UserChatStyled
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
              selected={chat[1].userInfo.uid === state.user?.uid}
            >
              <img src={chat[1].userInfo.photoUrl} alt='user-avatar' referrerPolicy='no-referrer' />
              <div>
                <p>{chat[1].userInfo.displayName}</p>
                {chat[1].lastMessage?.text ? (
                  <p>{chat[1].lastMessage?.text}</p>
                ) : chat[1].lastImg?.url ? (
                  <LastMessageContainer>
                    <LastMessageImg src={LastMsgImage} alt='' />
                    <p>Photo</p>
                  </LastMessageContainer>
                ) : null}
              </div>
            </UserChatStyled>
          ))}
    </UserChatsContainer>
  );
};

export default Chats;
