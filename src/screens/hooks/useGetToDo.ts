import {useEffect, useState} from 'react';
import {IToDo} from 'app/screens';
import {LayoutAnimation} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {IProfile} from 'app/store/types';

const ref = firestore().collection('todos');

export const useGetToDo = (
  profile: IProfile | null,
  defaultCategory: string,
  isFocused?: boolean,
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [todos, setTodos] = useState<IToDo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    defaultCategory || '',
  );

  useEffect(() => {
    const query = ref
      .doc(profile?.uid)
      .collection('userTodos')
      .where('category', '==', selectedCategory)
      .orderBy('updatedAt', 'asc');

    return query?.onSnapshot(querySnapshot => {
      const list: IToDo[] = [];
      querySnapshot?.forEach(doc => {
        const {title, complete} = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setTodos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, [selectedCategory, isFocused, profile?.uid]);

  return {
    todos,
    selectedCategory,
    setSelectedCategory,
  };
};
