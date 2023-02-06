import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';

export const useChatContext = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChatContext must be within ChatContextProvider');
  }

  return context;
};
