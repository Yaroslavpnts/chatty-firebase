import React, { useEffect, useRef, useState } from 'react';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { useFormik } from 'formik';
import { useAuth } from '../../../../hooks/useAuth';
import { db, storage } from '../../../../utils/init-firebase';
import { v4 as uuid } from 'uuid';
import SendImg from '../../../../assets/svg/send-image.svg';

import {
  ButtonStyled,
  ChatFormContainerStyled,
  ChatFormStyled,
  InputFileStyled,
  SendImageModalStyled,
  TextareaMessageStyled,
} from './SendMessage.styled';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useChatContext } from '../../../../hooks/useChat';
import CustomModal from '../../../../UI/modal/CustomModal';

interface SendMessageProps {
  scrollRef: React.RefObject<HTMLSpanElement>;
}

const SendMessage: React.FC<SendMessageProps> = ({ scrollRef }) => {
  const { currentUser } = useAuth();
  const { state } = useChatContext();
  const [img, setImg] = useState<string>('');

  const TextAreaRef = useRef<HTMLTextAreaElement>(null);
  const InputFileRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] as File;

    console.log('file changed');

    formik.setFieldValue('file', event.currentTarget.files?.[0]);

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = function () {
      setImg(reader.result as string);
    };
  };

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
        console.error(message);
      }

      resetForm();
    },
  });

  const handleLabelClick = () => {
    if (InputFileRef.current) {
      InputFileRef.current.value = '';
    }
  };

  useEffect(() => {
    formik.setFieldValue('message', '');
    formik.setFieldValue('file', '');

    const ref = TextAreaRef.current;

    const handleKeyUp = (e: KeyboardEvent) => {
      const target = e?.target as HTMLTextAreaElement;
      const minHeight = 50;

      let scHeight = target.scrollHeight;

      if (scHeight > minHeight) {
        target.style.height = `${scHeight}px`;
      }

      ref?.scrollIntoView(true);
    };

    ref?.addEventListener('keyup', handleKeyUp);

    return () => {
      ref?.removeEventListener('keyup', handleKeyUp);
    };
    //eslint-disable-next-line
  }, [state.chatId]);

  return (
    <ChatFormContainerStyled>
      <ChatFormStyled onSubmit={formik.handleSubmit}>
        <div>
          <TextareaMessageStyled
            value={formik.values.message}
            onChange={formik.handleChange}
            name='message'
            placeholder='Type something'
            onKeyDown={handleKeyDown}
            ref={TextAreaRef}
          />
          <InputFileStyled type='file' id='file' onChange={handleChangeFile} ref={InputFileRef} />
          <label htmlFor='file' onClick={handleLabelClick}>
            <img src={SendImg} alt='' />
          </label>
        </div>

        <ButtonStyled type='submit'>Send</ButtonStyled>

        <CustomModal
          active={!!formik.values.file}
          handleClose={() => formik.setFieldValue('file', '')}
        >
          <SendImageModalStyled>
            <img src={img} alt='' />
            <div>
              <input
                value={formik.values.message}
                onChange={formik.handleChange}
                name='message'
                placeholder='Add a caption'
                onKeyDown={handleKeyDown}
                onClick={(e) => e}
              />
              <button type='submit'>Send</button>
            </div>
          </SendImageModalStyled>
        </CustomModal>
      </ChatFormStyled>
    </ChatFormContainerStyled>
  );
};

export default SendMessage;
