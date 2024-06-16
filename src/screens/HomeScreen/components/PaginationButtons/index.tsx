import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../../../constants/theme';
import {SVGIcon} from '../../../../constants/svgIcons';
import * as S from '../../styles.ts';

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  handlePageClick: (page: number) => void;
  handleSort: () => void;
  theme: Colors;
}

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  handlePageClick,
  theme,
  handleSort,
}) => {
  const maxButtonsToShow = 5;
  let startPage = Math.max(0, currentPage - Math.floor(maxButtonsToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxButtonsToShow - 1);

  if (endPage - startPage + 1 < maxButtonsToShow) {
    startPage = Math.max(0, endPage - maxButtonsToShow + 1);
  }

  const buttons = [];
  for (let i = startPage; i < endPage; i++) {
    buttons.push(
      <TouchableOpacity
        key={i}
        onPress={() => handlePageClick(i)}
        style={[S.PAGIN_BTN(theme), i === currentPage ? S.ACTIVE_BTN : null]}>
        <Text style={S.BTN_TEXT(theme)}>{i + 1}</Text>
      </TouchableOpacity>,
    );
  }

  return (
    <View style={S.PAGIN_CTR(theme)}>
      {buttons}
      <TouchableOpacity style={{marginLeft: 20}} onPress={() => handleSort()}>
        <SVGIcon name={'SortSvg'} color={theme.text} />
      </TouchableOpacity>
    </View>
  );
};
