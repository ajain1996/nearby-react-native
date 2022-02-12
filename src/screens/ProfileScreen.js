import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import CustomTextComponent from '../components/CustomTextComponent';
import {HeaderComponent} from './HomeScreen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomButtonComponent from '../components/CustomButtonComponent';
import {getSingleUserDatailFromAPI} from '../utils/API';
import CustomProgressIndicator from '../components/CustomProgressIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGGED_IN_USER_DETAILS} from '../Constants/ASYNC_STORAGE';
import {parse} from '@babel/core';
import {useSelector} from 'react-redux';
export default function ProfileScreen({navigation}) {
  const [loading, setLoading] = useState(false);
  const [usersData, setUserData] = useState([]);
  const {logged_in_user_details} = useSelector(state => state);
  useEffect(() => {
    setLoading(true);

    (async () => {
      // const currUser = await AsyncStorage.getItem(LOGGED_IN_USER_DETAILS);
      // const parsed = JSON.parse(currUser);
      // console.log(parsed._id, '\n\n<<<<<<<<<<<<<<<<<<<<< curr user');
      console.log(
        '\n\n\n------\n\n\n',
        logged_in_user_details,
        '\n\n------------------\n',
      );

      getSingleUserDatailFromAPI(logged_in_user_details._id, response => {
        setLoading(false);
        console.log('\n\n\n------\n\n\n', response, '\n\n------------------\n');
        if (response !== null) {
          setUserData(response);
        }
      });
    })();

    setLoading(false);
  }, []);

  console.log('\n\n \n\n Single User Data: ', usersData);

  return loading ? (
    <CustomProgressIndicator />
  ) : (
    <View>
      <ScrollView style={{height: '84%'}}>
        <HeaderComponent navigation={navigation} />

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
              //   text={
              //     'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum. ✌️'
              //   }
              text={usersData.about_me}
              fw="300"
              fs={18}
              color={'#000'}
              lineHeight={24}
            />
          </View>
        </View>
        
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 45,
          }}>
             {usersData?.cover_images?.map((item, key) => {
                  return (
                    <Image
                      // source={require('../../assets/images/grocery.jpg')}
                      source={{uri: item}}
                      key={key}
                      style={{
                        width: 100,
                        height: 100,
                        margin: 3,
                        borderColor: '#000',
                        borderWidth: 2,
                        borderRadius: 10,
                      }}
                    />
                  );
                })}
          
        </View>
        <View style={{marginTop: 10}} />
      </ScrollView>
      <View
        style={{elevation: 8, shadowColor: '#999', backgroundColor: '#fff'}}>
        <View style={{padding: 16, width: '100%'}}>
          <CustomButtonComponent
            textColor={'#fff'}
            bw={0}
            bgColor={'maroon'}
            fw="normal"
            text="Pending Requests"
            fs={14}
            width="100%"
            height={50}
            br={8}
            bc={'#000'}
            onPress={() => {
              navigation.navigate('ConnectionsScreen');
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
      <View style={{width: '100%', padding: 24, borderWidth: 6}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderWidth: 5,
          }}>
          <Image
            // source={require('../../assets/images/age.png')}
            source={{uri: usersData.image}}
            style={{width: 24, height: 24}}
          />
          <View style={{width: 5}} />
          <CustomTextComponent
            text={`${usersData.age} Years`}
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
              //   source={require('../../assets/images/profile.png')}
              source={{uri: usersData.avatar}}
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
                source={require('../../assets/images/briefcase.png')}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 8,
                  tintColor: '#000',
                }}
              />
              <CustomTextComponent
                text={usersData.profession}
                fw="300"
                fs={18}
                color={'#000'}
              />
            </View>
            {/* <View
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
            </View> */}
          </View>
        </View>
      </View>
    </View>
  );
};
