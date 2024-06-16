import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TabActions} from '@react-navigation/native';
import moment from 'moment';

import {Message} from '../../index.tsx';
import {Colors} from '../../../../constants/theme';
import {BottomTabScreen} from '../../../../navigation/constants.ts';
import * as S from '../../styles.ts';

interface MessageProps {
  message: Message;
  messages: Message[];
  level: number;
  renderMessage: (message: Message, level: number) => React.JSX.Element;
  theme: Colors;
}

export const MessageComponent: React.FC<MessageProps> = ({
  message,
  messages,
  level,
  renderMessage,
  theme,
}) => {
  const navigation = useNavigation();

  const handleReply = () =>
    navigation.dispatch(
      TabActions.jumpTo(BottomTabScreen.AddPostScreen, {
        replyTo: message.id,
      }),
    );

  return (
    <View style={[S.MESSAGE_CTR, {marginLeft: level * 20}]}>
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
            message.createdAt?.seconds * 1000 +
              message.createdAt?.nanoseconds / 1000,
          ).calendar()}
        </Text>

        <Button title="Reply" onPress={handleReply} />
      </View>
      <Text style={S.MESSAGE_TXT(theme)}>{message.text}</Text>

      {messages
        .filter(m => m.parentId === message.id)
        .map(m => renderMessage(m, level + 1))}
    </View>
  );
};
