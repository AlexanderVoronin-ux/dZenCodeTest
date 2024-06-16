import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, View, Text, Button, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {TabActions, useNavigation} from '@react-navigation/native';
import {BottomTabScreen} from '../../navigation/constants.ts';
import {useTheme} from '../../hooks/useTheme.ts';
import moment from 'moment';
import * as S from './styles';
import {PaginationButtons} from './components/PaginationButtons';

type Message = {
  id: string;
  text: string;
  parentId: string | null;
  avatar: string | undefined;
  username: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

const PAGE_SIZE = 1;

const ref = firestore().collection('posts');

export const HomeScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [messages, setMessages] = useState<Message[]>([]);
  useState<FirebaseFirestoreTypes.DocumentSnapshot | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = ref
      .orderBy('createdAt', 'asc')
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

  const handlePageClick = (p: number) => {
    setCurrentPage(p);
  };

  const renderMessage = (message: Message, level = 0) => {
    return (
      <View key={message.id} style={[S.MESSAGE_CTR, {marginLeft: level * 20}]}>
        <View style={S.HEADER_MES_CTR(theme)}>
          <View style={S.IMAGE}>
            <Image
              style={{width: 30, height: 30}}
              source={{uri: message.avatar}}
            />
          </View>
          <Text style={S.USER_NAME_TXT(theme)}>{message.username}</Text>
          <Text style={S.TIME_TXT(theme)}>
            {moment(
              message.createdAt.seconds * 1000 +
                message.createdAt.nanoseconds / 1000,
            ).calendar()}
          </Text>

          <Button
            title="Reply"
            onPress={() =>
              navigation.dispatch(
                TabActions.jumpTo(BottomTabScreen.AddPostScreen, {
                  replyTo: message.id,
                }),
              )
            }
          />
        </View>
        <Text style={S.MESSAGE_TXT(theme)}>{message.text}</Text>

        {messages
          .filter(m => m.parentId === message.id)
          .map(m => renderMessage(m, level + 1))}
      </View>
    );
  };

  return (
    <SafeAreaView style={S.SAFE_AREA(theme)}>
      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        theme={theme}
        handlePageClick={handlePageClick}
      />
      <FlatList
        data={messages
          .filter(m => m.parentId === null)
          .splice(currentPage * PAGE_SIZE, PAGE_SIZE)
          .reverse()}
        renderItem={({item}) => renderMessage(item)}
        keyExtractor={item => item.id}
        inverted={true}
      />
    </SafeAreaView>
  );
};
