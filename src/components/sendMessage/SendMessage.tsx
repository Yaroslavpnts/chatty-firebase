import React, { useContext } from 'react';
import { User } from 'firebase/auth';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { ChatContext, ChatContextType } from '../../contexts/ChatContext';
import { useAuth } from '../../hooks/useAuth';
import { db, storage } from '../../utils/init-firebase';
import { v4 as uuid } from 'uuid';
import SendImg from '../../assets/svg/send-image.svg';

import {
  ButtonStyled,
  ChatFormContainerStyled,
  ChatFormStyled,
  InputFileStyled,
  TextareaMessageStyled,
} from './SendMessage.styled';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const SendMessage = () => {
  const { currentUser } = useAuth();
  const { state } = useContext(ChatContext) as ChatContextType;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.code === 'Enter' && formik.submitForm();
  };

  const formik = useFormik({
    initialValues: {
      message: '',
      file: '',
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const file = values.file as unknown as File;

      const docRef = doc(db, 'chats', state.chatId as string);

      if (!values.file && values.message.length === 0) {
        return;
      }

      let downloadURL = '';

      try {
        if (file) {
          const storageRef = ref(storage, uuid());

          const uploadTask = await uploadBytes(storageRef, file);
          downloadURL = await getDownloadURL(uploadTask.ref);

          await updateDoc(docRef, {
            messages: arrayUnion({
              id: uuid(),
              text: values.message,
              senderId: currentUser?.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          });
        } else {
          await updateDoc(docRef, {
            messages: arrayUnion({
              id: uuid(),
              text: values.message,
              senderId: currentUser?.uid,
              date: Timestamp.now(),
            }),
          });
        }

        const currentUserChatsRef = doc(db, 'userChats', currentUser!.uid);

        await updateDoc(currentUserChatsRef, {
          [`${state.chatId}.lastMessage`]: {
            text: values.message,
          },
          [`${state.chatId}.lastImg`]: {
            url: downloadURL,
          },
          [`${state.chatId}.date`]: serverTimestamp(),
        });

        const userChatsRef = doc(db, 'userChats', state.user!.uid);

        await updateDoc(userChatsRef, {
          [`${state.chatId}.lastMessage`]: {
            text: values.message,
          },
          [`${state.chatId}.lastImg`]: {
            url: downloadURL,
          },
          [`${state.chatId}.date`]: serverTimestamp(),
        });
      } catch (error) {
        const { message } = error as { message: string };
      }

      resetForm();
    },
  });

  return (
    <ChatFormContainerStyled>
      <ChatFormStyled onSubmit={formik.handleSubmit}>
        <TextareaMessageStyled
          value={formik.values.message}
          onChange={formik.handleChange}
          name='message'
          placeholder='Type something'
          onKeyDown={handleKeyDown}
        />
        <InputFileStyled
          type='file'
          id='file'
          onChange={(event) => {
            formik.setFieldValue('file', event.currentTarget.files?.[0]);
          }}
        />
        <label htmlFor='file'>
          <img src={SendImg} alt='' />
        </label>
        <ButtonStyled type='submit'>Send</ButtonStyled>
      </ChatFormStyled>
    </ChatFormContainerStyled>
  );
};

export default SendMessage;
