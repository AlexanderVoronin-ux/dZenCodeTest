import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {Form} from '../screens';

const ref = firestore().collection('users');

export const addUser = async (data: Form, uid: string) => {
  const timestamp = firestore.FieldValue.serverTimestamp();
  try {
    await ref.doc(uid).set({
      username: data.username,
      email: data.email,
      homePage: data.homePage,
      updatedAt: timestamp,
    });
  } catch (e) {
    Alert.alert('Warning', 'Ooops, something went wrong');
  }
};
