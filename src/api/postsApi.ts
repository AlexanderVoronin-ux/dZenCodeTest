import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';

import {Form} from '../screens';

const ref = firestore().collection('posts');

export interface ISendPostReq {
  id: string;
  data: Form;
  parentId: string | null;
  avatar: string;
  loading: boolean;
}

const uploadImage = async (imageUri: string) => {
  const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);

  const task = storage().ref(filename).putFile(imageUri);
  console.log('3333---');

  try {
    await task;

    return await storage().ref(filename).getDownloadURL();
  } catch (e) {
    console.error(e);
  }
};

export const addPost = async ({
  data,
  parentId,
  avatar,
  id,
  loading,
}: ISendPostReq) => {
  const timestamp = Date.now();
  try {
    if (data.description.trim()) {
      uploadImage(avatar).then(avatarUri => {
        console.log('555----');

        ref.add({
          id,
          description: data.description,
          username: data.username,
          parentId,
          createdAt: timestamp,
          avatar: avatarUri,
          homePage: data.homePage,
          loading,
        });
      });
    }
  } catch (e) {
    Alert.alert('Warning', 'Ooops, something went wrong');
  }
};
