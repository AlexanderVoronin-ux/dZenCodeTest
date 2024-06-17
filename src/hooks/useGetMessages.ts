import {useEffect, useState} from 'react';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {useTheme} from './useTheme.ts';
import {Message} from '../screens';
import {useDispatch, useSelector} from 'react-redux';
import {s_App, s_Loading, s_Messages} from '../store/selectors';
import {updateMessagesFromDataBase} from '../store/reducers';
import {addPost} from '../api/postsApi.ts';

export type TSort = 'asc' | 'desc';

const ref = firestore().collection('posts');

export const useGetMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const messagesS = useSelector(s_Messages);
  const isConnected = useSelector(s_App);
  const isLoading = useSelector(s_Loading);

  useState<FirebaseFirestoreTypes.DocumentSnapshot | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortByTimestamp, setSortByTimestamp] = useState<TSort>('desc');

  const messages = messagesS.slice().sort((a, b) => {
    if (sortByTimestamp === 'asc') {
      return a.createdAt - b.createdAt;
    }
    return b.createdAt - a.createdAt;
  });

  useEffect(() => {
    const unsubscribe = ref
      .orderBy('createdAt', sortByTimestamp)
      .onSnapshot(querySnapshot => {
        const messages: Message[] = [];
        querySnapshot.forEach(documentSnapshot => {
          messages.push({
            // id: documentSnapshot.id,
            ...documentSnapshot.data(),
          } as Message);
        });
        dispatch(updateMessagesFromDataBase(messages));
      });

    return () => unsubscribe();
  }, [sortByTimestamp]);

  useEffect(() => {
    const totalPagesCount = messages.filter(m => m.parentId === null).length;

    if (!totalPagesCount) {
      setTotalPages(0);
    } else {
      setTotalPages(totalPagesCount - 1);
    }
  }, [messages]);

  useEffect(() => {
    const uploadMessages = async (array: Message[]) => {
      for (let i = 0; i < array.length; i++) {
        await addPost({
          data: {
            username: array[i].username,
            email: array[i].email,
            homePage: array[i].homePage,
            description: array[i].description,
          },
          parentId: array[i].parentId,
          avatar: array[i].avatar,
          id: array[i].id,
          loading: true,
        });
      }
    };

    if (isConnected && !isLoading) {
      const messagesForUpload = messages.filter(item => !item.loading);
      if (messagesForUpload) {
        uploadMessages(messagesForUpload).then();
      }
    }
  }, [isConnected]);

  return {
    totalPages,
    currentPage,
    setCurrentPage,
    messages,
    theme,
    setSortByTimestamp,
    sortByTimestamp,
  };
};
