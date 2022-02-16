import { View, StatusBar } from 'react-native';
import React from 'react';
import { AuthProvider } from './Navigation/AuthProvider';
import Routes from './Navigation/Routes';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' backgroundColor="#1b3e6b" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </View>
  );
};

export default App;
