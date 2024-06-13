import React, {FC, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {CustomInput} from 'app/components';
import {DropDownPanel} from 'app/screens/AddToDoScreen/components/DropDownPanel';
import {selectedList} from 'app/constant/category';
import {colors} from '../../../../assets/colors';

interface ISelectInputProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export const SelectInput: FC<ISelectInputProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const [selectedPress, setSelectedPress] = useState<boolean>(false);
  return (
    <TouchableOpacity
      style={{marginBottom: 10}}
      onPress={() => setSelectedPress(!selectedPress)}>
      <CustomInput
        value={selectedCategory}
        placeholder={'Select ToDo Category'}
        placeholderTextColor={colors.brown}
        rightIcon={'ChevronDownSVG'}
        editable={false}
        selectInput={true}
      />
      {selectedPress && (
        <DropDownPanel
          selectedList={selectedList}
          setSelectedCategory={setSelectedCategory}
          setSelectedPress={setSelectedPress}
          selectedPress={selectedPress}
        />
      )}
    </TouchableOpacity>
  );
};
