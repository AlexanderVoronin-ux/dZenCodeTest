import React, {FC, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {colors} from '../../../../assets/colors';
import LinearGradient from 'react-native-linear-gradient';
import {ISelectedList} from 'app/constant/category';

interface IDropDownPanelProps {
  selectedList: ISelectedList[] | null;
  setSelectedCategory: (value: string | '') => void;
  setSelectedPress: (value: boolean) => void;
  selectedPress: boolean;
}

export const DropDownPanel: FC<IDropDownPanelProps> = ({
  selectedList,
  setSelectedCategory,
  setSelectedPress,
  selectedPress,
}) => {
  const Separator = () => <View style={styles.separator} />;

  const handlePress = (value: string) => {
    setSelectedCategory(value);
    setSelectedPress(!selectedPress);
  };

  const renderItem = useCallback((item: ISelectedList) => {
    const {id, value} = item;
    return (
      <LinearGradient
        key={`${id}`}
        colors={[colors.blue_1, colors.blue_2, colors.blue_3]}>
        <TouchableOpacity style={styles.btn} onPress={() => handlePress(value)}>
          <Text style={styles.itemText}>{value}</Text>
        </TouchableOpacity>
        <Separator />
      </LinearGradient>
    );
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {selectedList?.map(renderItem)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  separator: {
    borderTopWidth: 1,
    borderColor: colors.blue,
  },
  container: {
    borderWidth: 1,
    borderColor: colors.brown,
    borderRadius: 10,
    backgroundColor: colors.white,
    height: 220,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemText: {
    color: colors.white,
  },
});
