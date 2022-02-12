import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigation from './src/navigation/AppNavigation';
import {Provider} from 'react-redux';

import {store} from './src/Reducer/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider
        // store={store(
        //   rootReducer,
        //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
        //     window.__REDUX_DEVTOOLS_EXTENSION__()
        // )}
        store={store}>
        <NativeBaseProvider>
          <PaperProvider>
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </PaperProvider>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
