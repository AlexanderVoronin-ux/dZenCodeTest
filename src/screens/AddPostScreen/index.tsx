import React, {useCallback, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomInput} from '../../components';
import {handleEmailValidation} from '../../services/emailValidation';
import {validateDescription} from '../../services/validateDescription';
import GoogleRecaptcha, {
  GoogleRecaptchaToken,
  GoogleRecaptchaRefAttributes,
} from 'react-native-google-recaptcha';
import * as S from './styles.ts';
import {useTheme} from '../../hooks/useTheme.ts';
import {SVGIcon} from '../../constants/svgIcons';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import {permissionsForStorage} from '../../services/permissions';
import {colors} from '../../../assets/colors';
import {AVATAR_IMG, DELETE_BTN, DELETE_CTR} from './styles.ts';

type Form = {
  username: string;
  email: string;
  homePage: string;
  description: string;
};

const imagePickerOptions: ImageLibraryOptions = {
  selectionLimit: 1,
  mediaType: 'photo',
  includeBase64: false,
};

export const AddToDoScreen = () => {
  const theme = useTheme();
  const [avatarFile, setAvatarFile] = useState<Asset | undefined>(undefined);

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

  const recaptchaRef = React.useRef<GoogleRecaptchaRefAttributes>(null);

  const handleSend = () => {
    recaptchaRef.current?.open();
  };

  const onSubmit = (data: Form) => {
    console.log('data', data);
  };

  const handleVerify = (token: GoogleRecaptchaToken) => {
    console.log('Recaptcha Token:', token);
    if (!!token) {
      if (!!avatarFile) {
        handleSubmit(onSubmit)();
      } else {
        Alert.alert('Warning', 'Please add the avatar image');
      }
    }
  };

  const handleError = (error: unknown) => {
    console.error('Recaptcha Error:', error);
  };

  const selectImageFromGallery = useCallback(() => {
    permissionsForStorage().then(res => {
      if (res) {
        launchImageLibrary(imagePickerOptions, e => {
          const imageFile = e.assets?.[0];
          setAvatarFile(imageFile);
        }).then();
      }
    });
  }, []);

  return (
    <SafeAreaView style={S.SAFE_AREA(theme.backgroundColor)}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={S.KEYBOARD_AWARE_CTR(theme.backgroundColor)}>
          <Text style={{color: theme.text, marginBottom: 16}}>
            Add Avatar Image*
          </Text>
          <View style={S.DELETE_CTR}>
            <TouchableOpacity
              style={S.SEND_BTN}
              onPress={selectImageFromGallery}>
              {!avatarFile ? (
                <SVGIcon name={'PhotoSVG'} width={50} height={50} />
              ) : (
                <Image
                  style={S.AVATAR_IMG}
                  source={{uri: avatarFile?.uri}}
                  resizeMode={'cover'}
                />
              )}
            </TouchableOpacity>
            {!!avatarFile && (
              <TouchableOpacity
                style={S.DELETE_BTN}
                onPress={() => setAvatarFile(undefined)}>
                <SVGIcon name={'DeleteSVG'} />
              </TouchableOpacity>
            )}
          </View>
          <View style={S.MT10}>
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

        <View style={S.MT10}>
          <Button
            color={theme.backgroundTabs}
            title="Send"
            onPress={handleSend}
          />
        </View>

        <GoogleRecaptcha
          ref={recaptchaRef}
          baseUrl="http://localhost:3000"
          onError={handleError}
          onVerify={handleVerify}
          siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
