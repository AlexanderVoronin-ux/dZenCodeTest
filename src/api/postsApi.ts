import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {Form} from '../screens';

const ref = firestore().collection('posts');

export interface ISendPostReq {
  data: Form;
  replyTo: string | null;
  avatar: string | undefined;
  onSuccess: () => void;
}

export const addPost = async ({
  data,
  replyTo,
  avatar,
  onSuccess,
}: ISendPostReq) => {
  const timestamp = firestore.FieldValue.serverTimestamp();
  try {
    if (data.description.trim()) {
      ref
        .add({
          text: data.description,
          username: data.username,
          parentId: replyTo,
          createdAt: timestamp,
          avatar,
        })
        .then(() => onSuccess());
    }
  } catch (e) {
    Alert.alert('Warning', 'Ooops, something went wrong');
  }
};
