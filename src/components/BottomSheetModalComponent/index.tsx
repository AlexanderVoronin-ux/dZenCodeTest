import React, {forwardRef, useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

import {useTheme} from '../../hooks/useTheme.ts';
import {TSort} from '../../hooks/useGetMessages.ts';
import * as S from './styles.ts';
import {colors} from '../../../assets/colors';
import {TITLE_MODAL} from './styles.ts';

interface IBottomSheetModalProps {
  setSortByTimestamp: (value: TSort) => void;
  sortByTimestamp: TSort;
}

export const BottomSheetModalComponent = forwardRef<
  BottomSheetModal,
  IBottomSheetModalProps
>(({setSortByTimestamp, sortByTimestamp}: any, ref) => {
  const snapPoints = useMemo(() => ['25%'], []);
  const theme = useTheme();
  const {dismiss} = useBottomSheetModal();

  const handleCloseModal = useCallback((value: string) => {
    setSortByTimestamp(value);
    dismiss();
  }, []);

  const isSelectedDesc = sortByTimestamp === 'desc';
  const isSelectedAsc = sortByTimestamp === 'asc';

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{backgroundColor: theme.backgroundBottomModal}}>
      <View style={S.TEXT_MODAL_CTR}>
        <Text
          style={S.TITLE_MODAL(theme, isSelectedDesc)}
          onPress={() => handleCloseModal('desc')}>
          {'Filter descending'}
        </Text>
        <Text
          style={S.TITLE_MODAL(theme, isSelectedAsc)}
          onPress={() => handleCloseModal('asc')}>
          {'Filter ascending'}
        </Text>
      </View>
    </BottomSheetModal>
  );
});
