import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import FeedScreen from './screens/FeedScreen'
import LoginScreen from './screens/LoginScreen'
import AccountScreen from './screens/AccountScreen'
import PostChit from './screens/PostChit'

import AsyncStorage from '@react-native-community/async-storage';
import EditProfile from './screens/EditProfile';
import SearchScreen from './screens/SearchScreen';
import OtherAccount from './screens/OtherAccount';
import Followers from './screens/Followers';
import Following from './screens/Following';
import UpdatePhoto from './screens/UpdatePhoto';
import OtherAccountFollows from './screens/OtherAccountFollows';




const Tab = createMaterialBottomTabNavigator();



function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                
                labelStyle: { fontSize: 12 },
                style: { backgroundColor: "#348eeb" },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="Chits"
                component={FeedScreen}
                options={{ tabBarLabel: 'Chits' }}
            />
            <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{ tabBarLabel: 'Profile' }}
            />
            <Tab.Screen
                name="Register"
                component={ProfileScreen}
                options={{ tabBarLabel: 'Register ' }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{ tabBarLabel: 'Account ' }}
            />

            <Tab.Screen
                name="PostChit"
                component={PostChit}
                options={{ tabBarLabel: 'PostChit' }}
            />

            <Tab.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ tabBarLabel: 'EP' }}
                

            />

            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ tabBarLabel: 'EP' }}

            />

            <Tab.Screen
                name="OtherAccount"
                component={OtherAccount}
                options={{ tabBarLabel: 'EP' }}

            />

            <Tab.Screen
                name="Followers"
                component={Followers}
                options={{ tabBarLabel: 'Followwes' }}

            />

            

            <Tab.Screen
                name="Following"
                component={Following}
                options={{ tabBarLabel: 'Fling' }}

            />

            <Tab.Screen
                name="UpdatePhoto"
                component={UpdatePhoto}
                options={{ tabBarLabel: 'EP' }}

            />

            

            <Tab.Screen
                name="OtherAccountFollows"
                component={OtherAccountFollows}
                options={{ tabBarLabel: 'EP' }}

                />

            

        </Tab.Navigator>
    );
}
export default function App() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}