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
import {black, white} from 'react-native-paper/lib/typescript/styles/colors';
import CustomProgressIndicator from '../components/CustomProgressIndicator';
import CustomButtonComponent from '../components/CustomButtonComponent';
import {useSelector} from 'react-redux';

export default function SearchScreen({navigation}) {
  const [connections, setConnections] = useState([]);
  const [currUserData, setCurrUserData] = useState({});
  const [pendingReq, setPendingReq] = useState([]);
  const [acceptedReq, setacceptedReq] = useState([]);
  const [showNewReq, setShowNewReq] = useState(true);
  const {logged_in_user_details} = useSelector(state => state);
  useEffect(() => {
    // setLoading(true);

    (async () => {
      // const currUser = await AsyncStorage.getItem(LOGGED_IN_USER_DETAILS);

      // const parsed = JSON.parse(currUser);
      // console.log(
      //   '\n\n\n\n\n\n\n',
      //   parsed._id,
      //   '\n\n<<<<<<<<<<<<<<<<<<<<< curr user\n\n\n\n\n\n\n\n\n\n',
      // );

      setCurrUserData(logged_in_user_details);
      console.log('\n\n\n\n\n>>>>>>>>>---', logged_in_user_details);
      getSingleUserDatailFromAPI(logged_in_user_details._id, response => {
        // setLoading(false);
        if (response !== null) {
          //   setUserData(response);
          setPendingReq(response.get_request);
          setacceptedReq(response.accepted_request);
          // console.log(
          //   '\n\n>>> connections',
          //   response.accepted_request,
          //   '\n\n<<<<<<<<<<<<',
          // );
        }
      });
    })();

    // setLoading(false);
  }, []);

  return (
    <View>
      <ScrollView style={{backgroundColor: '#fff', height: '100%'}}>
        <HeaderComponent navigation={navigation} />

        <View style={{paddingLeft: 20}}>
          <Text style={{fontSize: 22, color: 'black'}}>New Friend Request</Text>
        </View>
        {renderAdsPlacesBtn()}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',

            // alignItems:"center",
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: showNewReq ? '#0073ff' : '#BEBEBE',
              paddingVertical: 13,
              // width: '45%',
              paddingHorizontal: 25,
              alignContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              // alignSelf:"center",
              borderRadius: 10,
            }}
            // onPress={onAddFriendPress}
            onPress={() => setShowNewReq(true)}>
            <Text style={{fontWeight: 'bold', fontSize: 17, color: '#fff'}}>
              {/* {showRequestLoader.text} */}
              New Requests
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: showNewReq ? '#BEBEBE' : '#0073ff',
              paddingVertical: 13,
              paddingHorizontal: 25,
              borderRadius: 10,
              // width: '45%',
            }}
            onPress={() => setShowNewReq(false)}>
            <Text style={{fontWeight: 'bold', fontSize: 17, color: '#fff'}}>
              Your Friends
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          {(() => {
            if (!showNewReq) {
              return acceptedReq.length ? (
                acceptedReq.map((item, key) => {
                  // console.log('\n\n ', item.userName, '\t<<<---------------');
                  const {avatar, userName, about_me, profession, age, _id} =
                    item;
                  return userComponent(
                    key,
                    avatar,
                    userName,
                    about_me,
                    profession,
                    age,
                    _id,
                    navigation,
                    logged_in_user_details,
                  );
                })
              ) : (
                <View
                  style={{
                    alignSelf: 'center',
                    verticalAlign: 'center',
                    marginVertical: 40,
                  }}>
                  <Text style={{fontSize: 25}}>No Pending Request</Text>
                </View>
              );
            } else {
              return pendingReq.length ? (
                pendingReq.map((item, key) => {
                  console.log('\n\n', item, '\t\t<<<---------------');

                  return BuildSingleMessageComponent(
                    item,
                    key,
                    logged_in_user_details,
                    navigation,
                  );
                })
              ) : (
                <View
                  style={{
                    alignSelf: 'center',
                    verticalAlign: 'center',
                    marginVertical: 40,
                  }}>
                  <Text style={{fontSize: 25}}>No Pending Request</Text>
                </View>
              );
            }
          })()}
          {/* <CustomProgressIndicator /> */}
        </View>
        <View style={{height: 130}} />
      </ScrollView>
    </View>
  );
}

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
const BuildSingleMessageComponent = (item, index, currUserData, navigation) => {
  console.log(
    '\n\n\n\n\n\n\n\n---------------------------',
    currUserData,
    '\n\n',
    item,
    '\n\n\n-------------',
  );
  const acceptRequest = async otherPersonId => {
    // const asyncData = await AsyncStorage.getItem(LOGGED_IN_USER_DETAILS);
    // const parsed = JSON.parse(asyncData);
    try {
      const {data} = await axios.post(`${BACKEND}/request/acceptrequest`, {
        curent_user_id: currUserData._id,
        requested_id: item._id,
      });
      console.log(
        '\n\n>>>>>>>>>>>>>>>>>  ACCEPT THE REQUEST--------- \n\n\n ',
        data,
        '\n\n\n>>>>>>> Accepted request data',
      );
    } catch (e) {
      console.log(e);
    }
  };
  const deleteRequest = async otherPersonId => {
    console.log('called');
    // const asyncData = await AsyncStorage.getItem(LOGGED_IN_USER_DETAILS);
    // const parsed = JSON.parse(asyncData);
    const {data} = await axios.post(`${BACKEND}/request/deleterequest`, {
      curent_user_id: currUserData._id,
      requested_id: item._id,
    });
    Alert.alert(data.msg);
    // console.log(
    //   '\n\n>>>>>>>>>>>>>>>>>  ACCEPT THE REQUEST--------- \n\n\n ',
    //   // data,
    //   '\n\n\n>>>>>>> Accepted request data',
    // );
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
        onPress={() => {
          console.log('\n\n\n\n\n\n\n\n ==>>>>>>>>>>> \t\t ', {
            currUserData,
            id: item._id,
          });
          navigation.navigate('ProfileDetailScreen', {
            currentUser: false,
            currUserData: currUserData,
            otherUserData: {user_id: item._id},
          });
        }}>
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
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <TouchableOpacity
              onPress={() => acceptRequest(item._id)}
              style={{marginRight: 17}}>
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
const userComponent = (
  key,
  avatar,
  userName,
  about_me,
  profession,
  age,
  _id,
  navigation,
  currUserData,
) => {
  console.log('\n\n\n\n\n====>>>>>>>> ', currUserData);
  return (
    <Card
      key={key}
      style={{
        backgroundColor: '#fff',
        shadowColor: 'silver',
        marginVertical: 5,
        elevation: 12,
        borderRadius: 8,
      }}>
      <TouchableOpacity
        style={{flexDirection: 'row', padding: 5}}
        activeOpacity={0.9}
        onPress={() => {
          console.log('\n\n\n \t\t\t=====>>', {
            currUserData,
            otherUserData: _id,
          });
          navigation.navigate('ProfileDetailScreen', {
            currentUser: false,
            currUserData: currUserData,
            otherUserData: {user_id: _id},
          });
        }}
      >
        <Image
          source={require('../../assets/images/grocery.jpg')}
          style={{
            // width: SIZES.width / 3.3,
            width: 120,
            height: 120,
            // height: SIZES.width / 3.3,
            margin: 5,
          }}
        />
        <View style={{justifyContent: 'space-between', marginLeft: 10}}>
          <View style={{}}>
            <CustomTextComponent
              text={userName}
              fs={23}
              fw="700"
              color={'#000'}
            />
            <CustomTextComponent
              text={`Age: ${age}`}
              fw="600"
              fs={14}
              color={'#000'}
            />
            <CustomTextComponent
              text={`Profession: ${profession}`}
              fw="600"
              fs={14}
              color={'#000'}
            />
            <CustomTextComponent
              text={'Distance: 0 KM away'}
              fw="600"
              fs={14}
              color={'#000'}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log('\n\n\n \t\t\t=====>>', {
                currUserData,
                otherUserData: _id,
              });
              navigation.navigate('ProfileDetailScreen', {
                currentUser: false,
                currUserData: currUserData,
                otherUserData: {user_id: _id},
              });
            }}>
            <CustomButtonComponent
              textColor={'#fff'}
              bgColor={'#042165'}
              fw="normal"
              br={20}
              text="View Profile"
              fs={15}
              width={'85%'}
              height={38}
            
                onPress={() => {
                  console.log('\n\n\n \t\t\t=====>>', {
                    currUserData,
                    otherUserData: _id,
                  });
                  navigation.navigate('ProfileDetailScreen', {
                    currentUser: false,
                    currUserData: currUserData,
                    otherUserData: {user_id: _id},
                  });
                }}
              
            />
          </TouchableOpacity>

          <View style={{marginTop: 0}} />
        </View>
      </TouchableOpacity>
    </Card>
  );
};
