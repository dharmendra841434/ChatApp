import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../Screens/Profile';
import ChatingScreen from '../Screens/ChatingScreen';
import AllUsers from '../Screens/AllUsers';
import ChatBox from '../Screens/ChatBox';
import GroupChatBox from '../Screens/GroupChatBox';

const Mystack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Mystack.Navigator>
        <Mystack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Mystack.Screen
          name="Chating"
          component={ChatingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Mystack.Screen
          name="AllUsers"
          component={AllUsers}
          options={{
            headerShown: false,
          }}
        />
        <Mystack.Screen
          name="ChatBox"
          component={ChatBox}
          options={{
            headerShown: false,
          }}
        />
        <Mystack.Screen
          name="GroupChat"
          component={GroupChatBox}
          options={{
            headerShown: false,
          }}
        />
      </Mystack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
