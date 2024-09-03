import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux-toolkit/Store/Store';
import AuthStack from './src/navigations/AuthStack/AuthStack';
import AppStack from './src/navigations/AppStack/AppStack';
import useAuth from './src/redux-toolkit/StateHooks/useAuth';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { COLORS } from './src/constants/colors/COLORS';

const RootNavigator = () => {
  const { authState } = useAuth();
  const isAuthenticated = authState.isAuthenticated;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

<StatusBar
        translucent={false}
        backgroundColor="transparent"
        barStyle="light-content"
      />    
      <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
