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
import {BACKEND, LOGGED_IN_USER_DETAILS} from '../Constants/ASYNC_STORAGE';
import {HeaderComponent} from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSingleUserDatailFromAPI} from '../utils/API';
import CustomButtonComponent from '../components/CustomButtonComponent';
import axios from 'axios';

export default function MessageScreen({navigation}) {
  const [connections, setConnections] = useState([]);
  const [currUserData, setCurrUserData] = useState({});
  useEffect(() => {
    // setLoading(true);

    (async () => {
      const currUser = await AsyncStorage.getItem(LOGGED_IN_USER_DETAILS);
      const parsed = JSON.parse(currUser);
      console.log(parsed._id, '\n\n<<<<<<<<<<<<<<<<<<<<< curr user');
      setCurrUserData(parsed);
      getSingleUserDatailFromAPI(parsed._id, response => {
        // setLoading(false);
        if (response !== null) {
          //   setUserData(response);
          setConnections(response.get_request);
          console.log(
            '\n\n>>> connections',
            response.accepted_request,
            '\n\n<<<<<<<<<<<<',
          );
        }
      });
    })();

    // setLoading(false);
  }, []);
  // const a

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
                item={item}
                index={index}
                // onPress={() => {
                //   navigation.navigate('ChatScreen');
                // }}
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
  const acceptRequest = async otherPersonId => {
    console.log('called');
    const asyncData = await AsyncStorage.getItem(LOGGED_IN_USER_DETAILS);
    const parsed = JSON.parse(asyncData);
    const {data} = await axios.post(`${BACKEND}/request/acceptrequest`, {
      curent_user_id: parsed._id,
      requested_id: otherPersonId,
    });
    console.log(
      '\n\n>>>>>>>>>>>>>>>>>  ACCEPT THE REQUEST--------- \n\n\n ',
      data,
      '\n\n\n>>>>>>> Accepted request data',
    );
  };
  const deleteRequest = async otherPersonId => {
    console.log('called');
    const asyncData = await AsyncStorage.getItem(LOGGED_IN_USER_DETAILS);
    const parsed = JSON.parse(asyncData);
    const {data} = await axios.post(`${BACKEND}/request/deleterequest`, {
      curent_user_id: parsed._id,
      requested_id: otherPersonId,
    });
    Alert.alert(data.msg);
    console.log(
      '\n\n>>>>>>>>>>>>>>>>>  ACCEPT THE REQUEST--------- \n\n\n ',
      // data,
      '\n\n\n>>>>>>> Accepted request data',
    );
  };
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
          source={item.avatar}
          style={{width: 50, height: 50, borderRadius: 100}}
        />
        <View
          style={{
            width: '55%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomTextComponent
            text={item.userName}
            fw="600"
            fs={14}
            color={'#000'}
          />
          <CustomTextComponent
            text={item.about_me}
            fw="500"
            fs={12}
            color={'#333333'}
          />
        </View>
        <TouchableOpacity onPress={() => acceptRequest(item._id)}>
          <View
            style={{
              // paddingRight: 10,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 3,
              paddingBottom: 3,
              alignItems: 'center',
              borderRadius: 20,
              backgroundColor: 'green',
            }}>
            <CustomTextComponent
              bgColor={'#7fff00'}
              text={'A'}
              fw="600"
              fs={13}
              color={'#fff'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteRequest(item._id)}>
          <View
            style={{
              // paddingRight: 10,
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 3,
              paddingBottom: 3,
              alignItems: 'center',
              borderRadius: 20,
              backgroundColor: 'red',
            }}>
            <CustomTextComponent
              bgColor={'#7fff00'}
              text={'F'}
              fw="600"
              fs={13}
              color={'#fff'}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
