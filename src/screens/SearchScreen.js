// import { Card } from 'native-base';
// import React from 'react';
// import { View, Text, ScrollView } from 'react-native';
// import CustomSearchComponent from '../components/CustomSearchComponent';

// export default function SearchScreen() {
//     return (
//         <ScrollView style={{ backgroundColor: '#f7f8f9' }}>
//             <View style={{ paddingHorizontal: 0, marginTop: -10 }}>
//                 <Card style={{ height: '100%', elevation: 5, shadowColor: '#fff' }}>
//                     <CustomSearchComponent
//                         title="Search By Username or Name"
//                         icon={require("../../assets/images/search-icon.png")}
//                         width={20} height={20}
//                         bgHeight={50}
//                     />
//                 </Card>
//             </View>
//         </ScrollView>
//     )
// }

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
import {Card} from 'native-base';
import CustomSearchComponent from '../components/CustomSearchComponent';
import axios from 'axios';

export default function SearchScreen({navigation}) {
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

  return (
    <View>
      <ScrollView style={{backgroundColor: '#fff', height: '100%'}}>
        <CustomSearchComponent
          title="Search By Username or Name"
          icon={require('../../assets/images/search-icon.png')}
          width={20}
          height={20}
          bgHeight={50}
        />
        <View style={{alignItems: 'center', paddingHorizontal: 16}}>
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
        //   justifyContent: 'space-around',
          alignItems: 'center',
        }}
        onPress={onPress}>
        <Image
        //   source={item.avatar}        
          source={require('../../assets/images/grocery.jpg')}
        style={{width: 100, height: 100}}
        />
        <View style={{marginLeft: 15}}>
          <View
            style={{
            //   width: '55%',
              justifyContent: 'center',
            //   alignItems: 'center',
            }}>
            <CustomTextComponent
              text={item.userName}
              fw="600"
              fs={24}
              color={'#000'}
            />
            <CustomTextComponent
              text={item.about_me}
              fw="500"
              fs={14}
              color={'#333333'}
            />
          </View>
          <View style={{flexDirection: "row", marginTop: 15}}>
          <TouchableOpacity onPress={() => acceptRequest(item._id)} style={{marginRight: 17}}>
            <View
              style={{
                elevation: 10,
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 3,
                paddingBottom: 3,
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: 'green',
              }}>
              <CustomTextComponent
                bgColor={'#7fff00'}
                text={'Accept'}
                fw="600"
                fs={17}
                color={'#fff'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteRequest(item._id)}>
            <View
              style={{
                elevation: 10,
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 3,
                paddingBottom: 3,
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: 'red',
              }}>
              <CustomTextComponent
                bgColor={'#7fff00'}
                text={'Reject'}
                fw="600"
                fs={17}
                color={'#fff'}
              />
            </View>
          </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
