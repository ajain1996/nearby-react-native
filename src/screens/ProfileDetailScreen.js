import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CustomTextComponent from '../components/CustomTextComponent';
import {HeaderComponent} from './HomeScreen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomButtonComponent from '../components/CustomButtonComponent';
import {
  checkSendRequestButtonText,
  getSingleUserDatailFromAPI,
  sendUserRequestPostRequestAPI,
} from '../utils/API';
import CustomProgressIndicator from '../components/CustomProgressIndicator';
import {SIZES} from '../Constants/theme';

export default function ProfileDetailScreen({navigation, route}, props) {
  const [loading, setLoading] = useState(false);
  const [usersData, setUserData] = useState({});
  // const [currUserData, setCurrUserData] = useState({});
  const {currUserData, otherUserData} = route.params;
  const [showRequestLoader, setShowRequestLoader] = useState({
    status: true,
    text: 'Loading',
    navigate: null,
  });

  console.log('>>>>>>>>>>\n\n\n', route, '<<<<<<<  ------- current user data');
  // console.log(otherUserData, '<<<<<<<  ------- current user data');
  // console.log(route.params.currUserData._id, '<<<< curr user');
  useEffect(() => {
    setLoading(true);

    getSingleUserDatailFromAPI(otherUserData.user_id, response => {
      setLoading(false);
      if (response !== null) {
        // console.log(response, '<<<<<<<<<<<<  respo');
        setUserData(response);
        console.log(response, '<<<<<<<<<< this i response from linke 39');
        // checkRequestButtonText();
        const {accepted_request, get_request} = response;

        checkRequestButtonText(accepted_request, get_request);

        // const
        // checkRequestButtonText
      }
    });
  }, []);
  const checkRequestButtonText = async (accepted_request, get_request) => {
    try {
      // const {accepted_request, get_request} = usersData;
      const checkGetRequest = get_request.filter(
        item => item._id == currUserData._id,
      );
      // Alert.alert(get_request);
      const checkAccept = accepted_request.filter(
        item => item._id == currUserData._id,
      );
      console.log(checkAccept, checkGetRequest, 'accept , request');
      console.log(
        checkGetRequest,
        checkAccept,
        checkGetRequest.length,
        checkAccept.length,
        '<<<<<<<<<<<<<<-----------------  check button status',
      );

      if (!checkGetRequest.length && !checkAccept.length) {
        setShowRequestLoader({text: 'Send Request', status: false});
      }
      if (checkGetRequest.length) {
        setShowRequestLoader({status: false, text: 'Request Already Sent'});
      }
      if (checkAccept.length) {
        setShowRequestLoader({status: false, text: 'Message'});
      }
    } catch (e) {
      console.log(e);
    }
  };
  // console.log('\n\n \n\n Single User Data: ', usersData);

  return loading ? (
    <CustomProgressIndicator />
  ) : (
    <View>
      <ScrollView style={{height: '90%'}}>
        <HeaderComponent />

        <View style={{marginTop: 10}} />
        {renderProfileInfoComponent(usersData)}

        <View style={{marginTop: 10}} />
        <View
          style={{elevation: 4, shadowColor: '#999', backgroundColor: '#fff'}}>
          <View
            style={{width: '100%', paddingHorizontal: 20, paddingVertical: 16}}>
            <CustomTextComponent
              text={'About Me'}
              fw="500"
              fs={22}
              color={'#000'}
            />
            <View style={{height: 5}} />
            <CustomTextComponent
              text={usersData.about_me}
              fw="300"
              fs={18}
              color={'#000'}
              lineHeight={24}
            />
          </View>
        </View>
        <View style={{marginTop: 10}} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0073ff',
              paddingVertical: 10,
              paddingHorizontal: 35,
              borderRadius: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: '#fff'}}>
              Add Friend
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#0073ff',
              paddingVertical: 10,
              paddingHorizontal: 35,
              borderRadius: 10,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: '#fff'}}>
              Share Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 45,
          }}>
          <Image
            source={require('../../assets/images/grocery.jpg')}
            style={{
              width: SIZES.width / 3.4,
              height: SIZES.width / 3.4,
              margin: 3,
              borderColor: "#000",
              borderWidth: 2,
              borderRadius: 10
            }}
          />
          <Image
            source={require('../../assets/images/grocery.jpg')}
            style={{
              width: SIZES.width / 3.4,
              height: SIZES.width / 3.4,
              margin: 3,
              borderColor: "#000",
              borderWidth: 2,
              borderRadius: 10
            }}
          />
          <Image
            source={require('../../assets/images/grocery.jpg')}
            style={{
              width: SIZES.width / 3.4,
              height: SIZES.width / 3.4,
              margin: 3,
              borderColor: "#000",
              borderWidth: 2,
              borderRadius: 10
            }}
          />
        </View>
      </ScrollView>

      <View
        style={{elevation: 8, shadowColor: '#999', backgroundColor: '#fff'}}>
        <View style={{padding: 16, width: '100%'}}>
          {/* {showRequestLoader.text=="Message"?} */}
          <CustomButtonComponent
            textColor={'#fff'}
            bw={0}
            bgColor={'maroon'}
            fw="normal"
            text={showRequestLoader.text}
            fs={14}
            width="100%"
            height={50}
            br={8}
            bc={'#000'}
            onPress={() => {
              {
                (() => {
                  if (showRequestLoader.text == 'Message') {
                    return navigation.navigate('ProfileDetailToMessageScreen', {
                      messageId: 'FIND_IT',
                      secondPerson: usersData,
                      currUser: currUserData,
                    });
                  } else if (showRequestLoader.text == 'Send Request') {
                    setLoading(true);

                    return sendUserRequestPostRequestAPI(
                      currUserData?._id,
                      otherUserData?.user_id,
                      response => {
                        if (response.success) {
                          Alert.alert('Request Sent');
                          navigation.navigate('HomeScreen');
                        }
                        // console.log(
                        //   '\n\n sendUserRequestPostRequestAPI response: ',
                        //   response,
                        // );
                        setLoading(false);
                      },
                    );
                  }
                })();
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

const renderProfileInfoComponent = usersData => {
  return (
    <View style={{elevation: 4, shadowColor: '#999', backgroundColor: '#fff'}}>
      <View style={{width: '100%', padding: 24}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: usersData.avatar}}
            style={{width: 24, height: 24}}
          />
          <View style={{width: 5}} />
          <CustomTextComponent
            text={`${usersData?.age} years`}
            fw="400"
            fs={20}
            color={'#000'}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 100,
              marginRight: 30,
            }}>
            <Image
              source={require('../../assets/images/profile.png')}
              // source={usersData?.avatar}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View>
            <CustomTextComponent
              text={usersData.name}
              fw="500"
              fs={25}
              color={'#000'}
            />
            <View style={{height: 8}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                // source={require('../../assets/images/briefcase.png')}
                source={usersData.avatar}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 8,
                  tintColor: '#000',
                }}
              />
              <CustomTextComponent
                text={usersData?.profession}
                fw="300"
                fs={18}
                color={'#000'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <View style={{marginLeft: -3}}>
                <EvilIcons name="location" size={28} color={'#000'} />
              </View>
              <View style={{marginRight: 4}} />
              <CustomTextComponent
                text={'73 miles away'}
                fw="300"
                fs={18}
                color={'#000'}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
