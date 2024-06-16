/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {MainNavigator} from './src/navigation/MainNavigator.tsx';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <MainNavigator />
            <StatusBar barStyle={'light-content'} />
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
