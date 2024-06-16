import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';

import {Form} from '../screens';

const ref = firestore().collection('posts');

export interface ISendPostReq {
  data: Form;
  replyTo: string | null;
  avatar: string;
  onSuccess: () => void;
}

const uploadImage = async (imageUri: string) => {
  const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

  const task = storage().ref(filename).putFile(imageUri);

  try {
    await task;

    return await storage().ref(filename).getDownloadURL();
  } catch (e) {
    console.error(e);
  }
};

export const addPost = async ({
  data,
  replyTo,
  avatar,
  onSuccess,
}: ISendPostReq) => {
  const timestamp = firestore.FieldValue.serverTimestamp();
  try {
    if (data.description.trim()) {
      uploadImage(avatar).then(avatarUri => {
        ref
          .add({
            text: data.description,
            username: data.username,
            parentId: replyTo,
            createdAt: timestamp,
            avatar: avatarUri,
          })
          .then(() => onSuccess());
      });
    }
  } catch (e) {
    Alert.alert('Warning', 'Ooops, something went wrong');
  }
};
