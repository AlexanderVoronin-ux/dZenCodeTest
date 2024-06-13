import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as S from './styles';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={S.SAFE_AREA}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{}}>
          <Text>HomeScreen</Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
