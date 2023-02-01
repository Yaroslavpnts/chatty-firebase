import { createContext, useReducer } from 'react';
import { useAuth } from '../hooks/useAuth';

export enum ChatContextTypes {
  CHANGE_USER = 'CHANGE_USER',
}

export interface UserType {
  displayName: string;
  photoUrl: string;
  uid: string;
}

export interface ChatState {
  chatId: string | null;
  user: UserType | null;
}

const INITIAL_STATE = {
  chatId: null,
  user: {
    displayName: '',
    photoUrl: '',
    uid: '',
  },
};

export const changeUser = (user: UserType | null) => ({
  type: ChatContextTypes.CHANGE_USER,
  payload: user,
});

type ActionsTypes = ReturnType<typeof changeUser>;

export interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ActionsTypes>;
}

export const ChatContext = createContext<ChatContextType | null>(null);

interface ChatContextProps {
  children: React.ReactNode[] | React.ReactNode;
}

const ChatContextProvider: React.FC<ChatContextProps> = ({ children }) => {
  const { currentUser } = useAuth();

  const chatReducer = (state: ChatState, action: ActionsTypes) => {
    switch (action.type) {
      case ChatContextTypes.CHANGE_USER: {
        let chatId;

        if (action.payload) {
          chatId =
            currentUser!.uid > action.payload.uid
              ? currentUser!.uid + action.payload.uid
              : action.payload.uid + currentUser!.uid;
        } else {
          chatId = null;
        }

        return {
          user: action.payload,
          chatId,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return <ChatContext.Provider value={{ state, dispatch }}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
