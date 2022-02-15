import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../Screens/Profile';
import ChatingScreen from '../Screens/ChatingScreen';

const Mystack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <NavigationContainer>
            <Mystack.Navigator>
                <Mystack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
                <Mystack.Screen name='Chating' component={ChatingScreen} options={{
                    headerShown: false
                }} />
            </Mystack.Navigator>
        </NavigationContainer>
    );
};

export default AppStack;
