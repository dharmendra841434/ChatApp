import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import React from 'react'

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
        >
            <Tab.Screen name="login" component={Login} options={{
                swipeEnabled: false,
                tabBarIndicator: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
                tabBarLabelStyle: {
                    backgroundColor: '#2937f2',
                    height: 30,
                    width: 90,
                    paddingTop: 5,
                    borderRadius: 6
                },
                tabBarContentContainerStyle: {

                    backgroundColor: 'yellow',
                    height: 40,
                    paddingTop: 0

                },
                tabBarStyle: {

                    backgroundColor: 'green',
                    paddingTop: 0

                },
                tabBarIndicatorStyle: {
                    backgroundColor: 'white'
                },

            }} />
            <Tab.Screen name="signup" component={Signup} options={{
                swipeEnabled: false,
                tabBarIndicator: false,
                tabBarActiveTintColor: 'white',
                tabBarIndicatorStyle: {
                    backgroundColor: 'white'
                },
                tabBarInactiveTintColor: 'white',
                tabBarLabelStyle: {
                    backgroundColor: '#2937f2',
                    height: 30,
                    width: 90,
                    paddingTop: 5,
                    borderRadius: 6
                }
            }} />
        </Tab.Navigator>
    );
}

export default MyTabs;