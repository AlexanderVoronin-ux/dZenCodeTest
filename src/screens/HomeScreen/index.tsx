import React, {useCallback, useRef} from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

import {PaginationButtons} from './components/PaginationButtons';
import {MessageComponent} from './components/Message';
import {useGetMessages} from '../../hooks/useGetMessages.ts';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalComponent} from '../../components';
import * as S from './styles';

export type Message = {
  id: string;
  text: string;
  parentId: string | null;
  avatar: string | undefined;
  username: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
};

const PAGE_SIZE = 1;

export const HomeScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {
    totalPages,
    setCurrentPage,
    currentPage,
    messages,
    theme,
    setSortByTimestamp,
    sortByTimestamp,
  } = useGetMessages();

  const handlePageClick = (p: number) => {
    setCurrentPage(p);
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderMessage = (message: Message, level = 0) => {
    return (
      <React.Fragment key={message.id}>
        <MessageComponent
          messages={messages}
          message={message}
          level={level}
          theme={theme}
          renderMessage={renderMessage}
        />
      </React.Fragment>
    );
  };

  return (
    <SafeAreaView style={S.SAFE_AREA(theme)}>
      <PaginationButtons
        currentPage={currentPage}
        totalPages={totalPages}
        theme={theme}
        handlePageClick={handlePageClick}
        handleSort={handlePresentModalPress}
      />
      <FlatList
        data={messages
          .filter(m => m.parentId === null)
          .splice(currentPage * PAGE_SIZE, PAGE_SIZE)}
        renderItem={({item}) => renderMessage(item)}
        keyExtractor={item => item.id}
        inverted={true}
        contentContainerStyle={{padding: 10}}
      />
      <BottomSheetModalComponent
        ref={bottomSheetModalRef}
        setSortByTimestamp={setSortByTimestamp}
        sortByTimestamp={sortByTimestamp}
      />
    </SafeAreaView>
  );
};
