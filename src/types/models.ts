import { Timestamp } from 'firebase/firestore';

export interface EmailPassModel {
  email: string;
  password: string;
}

export interface RegisterModel extends EmailPassModel {
  displayName: string;
  file: string | File;
}

export interface DBUserModel {
  uid: string;
  displayName: string;
  email: string;
  photoUrl: string;
}

export interface DBUserChatsModel {
  [index: string]: {
    date: Timestamp;
    userInfo: {
      displayName: string;
      photoUrl: string;
      uid: string;
    };
    lastMessage: {
      text: string;
    };
    lastImg: {
      url: string;
    };
  };
}

export interface DBMessageModel {
  id: string;
  text: string;
  senderId: string;
  date: Timestamp;
  image?: string;
}
