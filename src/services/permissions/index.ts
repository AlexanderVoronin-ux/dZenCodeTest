import {
  check,
  RESULTS,
  request,
  openSettings,
  PERMISSIONS,
  Permission,
  IOSPermission,
} from 'react-native-permissions';
import {Alert, Platform} from 'react-native';

type Args = {
  iosPermission: IOSPermission;
  androidPermission: Permission;
};

export const permissionsForStorage = async () => {
  try {
    const apiLevel = Platform.Version;

    return await askPermission({
      iosPermission: PERMISSIONS.IOS.PHOTO_LIBRARY,
      androidPermission:
        +apiLevel < 33
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    });
  } catch (e) {
    console.log('Error - permissions', e);
  }
};

export const permissionsForGeolocation = async () => {
  try {
    return await askPermission({
      iosPermission: PERMISSIONS.IOS.LOCATION_ALWAYS,
      androidPermission: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });
  } catch (e) {
    console.log('Error - permissions', e);
  }
};

export const _request = async (name: Permission) => {
  const res = await request(name);

  if (res === RESULTS.GRANTED) {
    return res === RESULTS.GRANTED;
  }
  return false;
};

export const _onBlocked = () => {
  Alert.alert(
    'Can we access to your location',
    'To grant permission, you need to open the settings',
    [
      {
        text: 'Ok',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Go to settings',
        onPress: openSettings,
      },
    ],
  );

  return false;
};

export const askPermission = async ({
  iosPermission,
  androidPermission,
}: Args) => {
  const permission =
    Platform.OS === 'android' ? androidPermission : iosPermission;
  const res = await check(permission);
  let hasPermission = false;

  switch (res) {
    case RESULTS.DENIED:
      hasPermission = await _request(permission);
      break;
    case RESULTS.BLOCKED:
      hasPermission = _onBlocked();
      break;
    case RESULTS.UNAVAILABLE:
      console.log(RESULTS.UNAVAILABLE);
      break;
    default:
      hasPermission = true;
      break;
  }

  return hasPermission;
};
