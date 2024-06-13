import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomInput} from '../../components';
import * as S from './styles.ts';
import {MT10} from './styles.ts';
import {handleEmailValidation} from '../../services/emailValidation';
import {validateDescription} from '../../services/validateDescription';

type Form = {
  username: string;
  email: string;
  homePage: string;
  description: string;
};

export const AddToDoScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Form>({
    mode: 'all',
    defaultValues: {
      username: '',
      email: '',
      homePage: '',
      description: '',
    },
  });

  const onSubmit = (data: Form) => {};

  return (
    <SafeAreaView style={S.SAFE_AREA}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={S.KEYBOARD_AWARE_CTR}>
          <View style={{}}>
            <Controller
              name={'username'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Required field',
                },
                minLength: {
                  message: 'Min length 6 characters',
                  value: 3,
                },
              }}
              render={({field: {onChange, value}}) => (
                <CustomInput
                  label={`Username*`}
                  value={value}
                  onChangeText={onChange}
                  validationMessage={errors.username?.message}
                />
              )}
            />
          </View>
          <View style={S.MT10}>
            <Controller
              name={'email'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Required field',
                },
                validate: v => handleEmailValidation(v),
              }}
              render={({field: {onChange, value}}) => (
                <CustomInput
                  label={`Email*`}
                  value={value}
                  onChangeText={onChange}
                  validationMessage={errors.email?.message}
                />
              )}
            />
          </View>
          <View style={S.MT10}>
            <Controller
              name={'homePage'}
              control={control}
              render={({field: {onChange, value}}) => (
                <CustomInput
                  label={`Home Page`}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          <View style={S.MT10}>
            <Controller
              name={'description'}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Required field',
                },
                validate: v => validateDescription(v),
              }}
              render={({field: {onChange, value}}) => (
                <CustomInput
                  label={`Description*`}
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={5}
                  maxLength={300}
                  textAlignVertical={'top'}
                  underlineColorAndroid="transparent"
                  keyboardType={'default'}
                  validationMessage={errors.description?.message}
                  style={{height: 100}}
                />
              )}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
