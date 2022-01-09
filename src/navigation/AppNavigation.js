import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Tabs from '../bottom_tabs/tabs';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileDetailScreen from '../screens/ProfileDetailScreen';
import ChatScreen from '../screens/ChatScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function AppNavigation() {
    const [isLoginYes, setIsLoginYes] = React.useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem('id_token').then(value => {
            console.log("\n\n \n\n 000000000000000000000000000000000000000", value)
            if (value === null) {
                navigation.navigate("LoginScreen")
                setIsLoginYes(true);
                console.log("\n\n \n\n 11111111111111111111111111111111111111111")
            } else {
                console.log("\n\n \n\n 22222222222222222222222222222222222222222")
                navigation.navigate("Tabs")
                setIsLoginYes(false);
            }
        });
    }, []);

    console.log("\n\n Current User: ", isLoginYes);

    return (
        <Stack.Navigator initialRouteName={HomeScreen}>

            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Tabs"
                component={Tabs}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="MessageScreen"
                component={MessageScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ProfileDetailScreen"
                component={ProfileDetailScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    larrow: {
        height: 18,
        width: 18,
        resizeMode: 'cover',
    },
    splashText: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashImage: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
    },
    logo: {
        height: 110,
        width: 110,
        resizeMode: 'cover',
    },
})
