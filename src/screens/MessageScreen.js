import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import CustomTextComponent from '../components/CustomTextComponent';
import io from "socket.io-client";

import {LOGGED_IN_USER_DETAILS} from '../Constants/ASYNC_STORAGE';
import {HeaderComponent} from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSingleUserDatailFromAPI} from '../utils/API';
import axios from 'axios';
import {BACKEND} from '../Constants/ASYNC_STORAGE';
import {useSelector} from 'react-redux';
// import {Alert} from 'native-base';
export default function MessageScreen({navigation, route}) {
  const socket = io(`${BACKEND}`);
  const [connections, setConnections] = useState([]);
  const [currUser, setCurrUser] = useState([]);
  const {logged_in_user_details} = useSelector(state => state);
  useEffect(() => {
    // setLoading(true);
    // socket.emit("getPrivatePreviousChat", {
    //   chatId: data.chatId,
    //   sender: data.user1,
    //   user2: data.user2,
    // });

    (async () => {
      // const currUser = await AsyncStorage.getItem(LOGGED_IN_USER_DETAILS);
      // const parsed = JSON.parse(currUser);
      Alert.alert('Sending');
      setCurrUser(logged_in_user_details);
      const {data} = await axios.get(
        `${BACKEND}/chat/members/${logged_in_user_details._id}`,
      );
      console.log("\n\n\n\n--------------\n\n\n\n\n\n ",data,
      "\n\n\n\n\n------------------------\n\n")
      if (data.success) {
        setConnections(data.chats.chat);
        Alert.alert('success');
        console.log(data.chats.chat);
      } else {
        Alert.alert('false');
      }
    })();

    // setLoading(false);
  }, []);
  const renderAdsPlacesBtn = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: '100%',
          borderWidth: 3,
          borderColor: '#A83037',
          justifyContent: 'center',
          borderRadius: 15,
          height: 100,
          alignItems: 'center',
        }}>
        <CustomTextComponent
          text={'Banner Ads'}
          fw="600"
          fs={21}
          color={'#30A04A'}
        />
      </TouchableOpacity>
    );
  };

  const messagesList = [
    {
      name: 'Caroline Johnson',
      info: 'Hi! How are you! What are you...',
      image: require('../../assets/images/p1.png'),
      messageCount: 3,
      time: '15:00',
    },
    {
      name: 'Daniel Thompson',
      info: 'Oh! Thankyou!...',
      image: require('../../assets/images/p2.jpg'),
      messageCount: 5,
      time: '5:32',
    },
    {
      name: 'Elizabeth McDonell',
      info: 'See you soon!',
      image: require('../../assets/images/p1.png'),
      messageCount: 7,
      time: '13:25',
    },
    {
      name: 'Jolene Thomas',
      info: 'Sent you a sticker',
      image: require('../../assets/images/p3.jpg'),
      messageCount: 2,
      time: '12:14',
    },
    {
      name: 'Caroline Johnson',
      info: 'Hi! How are you! What are you...',
      image: require('../../assets/images/p2.jpg'),
      messageCount: 0,
      time: '12:02',
    },
    {
      name: 'Daniel Thompson',
      info: 'Oh! Thankyou!...',
      image: require('../../assets/images/p1.png'),
      messageCount: 8,
      time: '13:25',
    },
    {
      name: 'Elizabeth McDonell',
      info: 'See you soon!',
      image: require('../../assets/images/p3.jpg'),
      messageCount: 4,
      time: '12:15',
    },
    {
      name: 'Jolene Thomas',
      info: 'Sent you a sticker',
      image: require('../../assets/images/p1.png'),
      messageCount: 0,
      time: '15:32',
    },
  ];

  return (
    <View>
      <HeaderComponent />
      <ScrollView style={{backgroundColor: '#fff', height: '100%'}}>
        <View style={{alignItems: 'center', paddingHorizontal: 16}}>
          <CustomTextComponent
            text={'Your Messages'}
            fw="600"
            fs={28}
            color={'#000'}
          />
          <View style={{height: 16}} />

          {renderAdsPlacesBtn()}

          {connections?.map((item, index) => {
            return (
              <BuildSingleMessageComponent
                item={item.secondPerson}
                index={index}
                onPress={() => {
                  navigation.navigate('ChatScreen', {
                    messageId: item.message,
                    secondPerson: item.secondPerson,
                    currUser: logged_in_user_details,
                  });
                }}
              />
            );
          })}
        </View>
        <View style={{height: 130}} />
      </ScrollView>
    </View>
  );
}

const BuildSingleMessageComponent = ({item, index, onPress}) => {
  console.log('\t\t>> item \t', item, '\n\n');

  return (
    <View
      key={index}
      style={{
        elevation: 4,
        shadowColor: '#999',
        backgroundColor: '#fff',
        width: '100%',
        padding: 10,
        marginTop: 10,
        borderRadius: 8,
      }}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={onPress}>
        <Image
          source={item?.avatar}
          style={{width: 80, height: 80, borderRadius: 100}}
        />
        <View style={{width: '60%'}}>
          <CustomTextComponent
            text={item?.userName}
            fw="600"
            fs={14}
            color={'#000'}
          />
          {/* <CustomTextComponent
            text={item?.about_me}
            fw="500"
            fs={12}
            color={'#333333'}
          /> */}
        </View>
        <View style={{paddingRight: 10, alignItems: 'center'}}>
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 100,
              backgroundColor: '#FF7777',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            {/* <CustomTextComponent
              text={item.messageCount}
              fw="600"
              fs={13}
              color={'#fff'}
            /> */}
          </View>
          {/* <CustomTextComponent
            text={item.time}
            fw="600"
            fs={12}
            color={'#000'}
          /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};
