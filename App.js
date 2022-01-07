import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigation from './src/navigation/AppNavigation';


export default class App extends React.Component {
  render() {
    return (
      <NativeBaseProvider>
        <PaperProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </PaperProvider>
      </NativeBaseProvider>
    );
  }
}
