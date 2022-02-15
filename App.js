import { View, StatusBar } from 'react-native';
import React from 'react';
import StackNav from './Navigation/StackNav';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle='light-content' backgroundColor="#1b3e6b" />
      <StackNav />
    </View>
  );
};

export default App;
