import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MessageScreen from '../screens/MessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {Colors} from '../utils/Colors';
import SplashScreen from '../screens/SplashScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: false,
        tabBarLabel: '',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'white',
          borderRadius: 0,
          height: 52,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopStartRadius: 8,
          borderTopEndRadius: 8,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <BuildTabComponent
              image={require('../../assets/images/trend.png')}
              text="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        // component={SplashScreen}
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <BuildTabComponent
              image={require('../../assets/images/search.png')}
              text="Explore"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <BuildTabComponent
              image={require('../../assets/images/message.png')}
              text="OTT"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <BuildTabComponent
              image={require('../../assets/images/user.png')}
              text="Services"
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const BuildTabComponent = ({image, text, focused}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          marginTop: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={image}
          resizeMode="contain"
          style={{
            tintColor: focused ? 'red' : Colors.BLUE,
            width: 22,
            height: 22,
            position: 'relative',
          }}
        />
        {/* <Text style={{ fontSize: 12, textAlign: 'center', color: focused ? "red" : Colors.BLUE, }}>
                    {text}
                </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
