import {useEffect, useState} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {useTheme} from './useTheme.ts';
import {Message} from '../screens';

const ref = firestore().collection('posts');

export const useGetMessages = () => {
  const theme = useTheme();

  const [messages, setMessages] = useState<Message[]>([]);
  useState<FirebaseFirestoreTypes.DocumentSnapshot | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = ref
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages: Message[] = [];
        querySnapshot.forEach(documentSnapshot => {
          messages.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          } as Message);
        });
        setMessages(messages);
        setTotalPages(messages.filter(m => m.parentId === null).length);
      });

    return () => unsubscribe();
  }, []);

  return {
    totalPages,
    currentPage,
    setCurrentPage,
    messages,
    theme,
  };
};
