import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ActivityIndicator, Card} from 'react-native-paper';
import CustomButtonComponent from '../components/CustomButtonComponent';
import CustomTextComponent from '../components/CustomTextComponent';
import {SIZES} from '../Constants/theme';
import SelectDropdown from 'react-native-select-dropdown';
import {windowWidth} from '../components/CustomDropdownComponent';
// import Geolocation from 'react-native-community/geolocation';
import {
  fetchsersByAgeGroup,
  fetchUserbyGender,
  fetchUsersByAgeAndGender,
  fetchUsersDataFromAPI,
} from '../utils/API';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/auth';
import {LOGGED_IN_USER_DETAILS} from '../Constants/ASYNC_STORAGE';

export default function HomeScreen({navigation}) {
  const [tabsBtn, setTabsBtn] = useState('nearbyUsers');
  const ageGroups = ['12 to 18', '19 to 32', '33 to 64', '65 to 80', 'All'];
  const genders = ['MALE', 'FEMALE', 'ALL'];
  const [ageValue, setAgeValue] = useState({to: 0, from: 100});
  const [selectedGender, setselectedGender] = useState('ALL');

  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const refRBSheet = useRef();
  const [currUserData, setCurrUserData] = useState({});

  const getCurrUser = async () => {
    const currUser = await AsyncStorage.getItem(LOGGED_IN_USER_DETAILS);
    setCurrUserData(JSON.parse(currUser));
  };
  useEffect(() => {
    getCurrUser();
    fetchAllUsers();
  }, []);
  const fetchAllUsers = () => {
    setLoading(true);
    fetchUsersDataFromAPI(response => {
      setLoading(false);
      if (response !== null) {
        setUsersData(response);
      }
    });
  };
  const fetchByGender = gender => {
    setLoading(true);
    fetchUserbyGender(gender, response => {
      setLoading(false);
      if (response !== null) {
        setUsersData(response);
      }
    });
  };
  const fetchByAge = (to, from) => {
    setLoading(true);
    fetchsersByAgeGroup(to, from, response => {
      setLoading(false);
      if (response !== null) {
        setUsersData(response);
      }
    });
  };
  const filterDataWithGenderAndAge = (gender, from, to) => {
    setLoading(true);
    fetchUsersByAgeAndGender(gender, from, to, response => {
      setLoading(false);
      if (response !== null) {
        setUsersData(response);
      }
    });
  };
  // console.log("\n\n \n\n usersData: ", usersData);

  const renderAgeButton = (text, listData) => {
    return (
      <SelectDropdown
        data={listData}
        value="ALL"
        placeholder="Age"
        buttonStyle={{
          width: '45%',
          borderWidth: 1,
          height: 40,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: 'grey',
          borderRadius: 8,
          flexDirection: 'row',
          paddingLeft: -45,
        }}
        buttonTextStyle={{
          fontWeight: 'normal',
          fontSize: 12.2,
          color: '#000',
        }}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index, '<<<<');
          if (listData.length <= 3) {
            // Alert.alert('length greater than 2');
            AsyncStorage.setItem('GENDER', selectedItem);
            setselectedGender(selectedItem);
            fetchByGender(selectedItem);
          } else {
            if (index == 0) {
              // fetchByAge(12, 18);
              setAgeValue({from: 12, to: 18});
              filterDataWithGenderAndAge(selectedGender, 12, 18);
            } else if (index == 1) {
              // fetchByAge(19, 32);
              setAgeValue({from: 19, to: 32});
              filterDataWithGenderAndAge(selectedGender, 19, 32);
            } else if (index == 2) {
              // fetchByAge(33, 64);
              setAgeValue({from: 33, to: 64});
              filterDataWithGenderAndAge(selectedGender, 33, 64);
            } else if (index == 3) {
              // fetchByAge(65, 80);
              setAgeValue({from: 65, to: 80});
              filterDataWithGenderAndAge(selectedGender, 65, 80);
            } else {
              // fetchAllUsers();
              setAgeValue({from: 0, to: 100});
              filterDataWithGenderAndAge(selectedGender, 0, 100);
            }
          }
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item;
        }}
        renderDropdownIcon={() => {
          return (
            <Image
              source={require('../../assets/images/caret-down.png')}
              style={{
                width: 10,
                height: 10,
                tintColor: 'grey',
                position: 'absolute',
                right: 10,
              }}
            />
          );
        }}
        dropdownIconPosition="right"
      />
      //
    );
  };

  const renderAdsPlacesBtn = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: '100%',
          borderWidth: 0,
          borderColor: '#A83037',
          justifyContent: 'center',
          borderRadius: 10,
          height: 180,
          alignItems: 'center',
        }}>
        <Image
          source={{
            uri: 'https://1.bp.blogspot.com/-JfQznnlXS9g/V_pi7KtKY1I/AAAAAAAAAAw/1xibMxOOvfgF0VHpr__QihMiyiCXV-yEwCLcB/s1600/Advertise1_Large.jpg',
          }}
          style={{width: '100%', height: '100%', borderRadius: 10}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <HeaderComponent navigation={navigation} />
      <ScrollView>
        <View style={{alignItems: 'center', paddingHorizontal: 16}}>
          <View style={{height: 8}} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomButtonComponent
              textColor={tabsBtn === 'nearbyUsers' ? '#fff' : '#000'}
              bw={1}
              bgColors={tabsBtn === 'nearbyUsers' ? false : true}
              fw="normal"
              text="Nearby Userss"
              fs={14}
              width={windowWidth / 2.2}
              height={46}
              bc={tabsBtn === 'nearbyUsers' ? 'silver' : '0073ff'}
              btlr={8}
              bblr={8}
              onPress={() => {
                setTabsBtn('nearbyUsers');
              }}
            />
            <CustomButtonComponent
              textColor={tabsBtn === 'allUsers' ? '#fff' : '#000'}
              bw={1}
              bgColors={tabsBtn === 'allUsers' ? false : true}
              fw="normal"
              text="All Users"
              fs={14}
              width={windowWidth / 2.2}
              height={46}
              bc={tabsBtn === 'allUsers' ? 'silver' : '0073ff'}
              bbrr={8}
              btrr={8}
              onPress={() => {
                setTabsBtn('allUsers');
              }}
            />
          </View>

          {tabsBtn === 'nearbyUsers' ? (
            <View style={{flexDirection: 'row', marginTop: 10}}>
              {renderAgeButton('Age Group', ageGroups)}
              <View style={{width: 8}} />
              {renderAgeButton('Male/Female', genders)}
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                height: 50,
                alignItems: 'center',
              }}>
              <CustomTextComponent
                text={'List Of All Users'}
                fw="600"
                fs={21}
                color={'#000'}
              />
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Image
                  source={require('../../assets/images/filter.png')}
                  style={{width: 30, height: 30, tintColor: 'grey'}}
                />
              </TouchableOpacity>
            </View>
          )}

          <RBSheet
            ref={refRBSheet}
            height={550}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="fade"
            customStyles={{
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}>
            <></>
          </RBSheet>
          <View style={{height: 10}} />

          {renderAdsPlacesBtn()}
          <View style={{height: 10}} />

          {loading ? (
            <View
              style={{
                width: '100%',
                height: SIZES.height / 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator />
            </View>
          ) : (
            <View style={{width: '100%'}}>
              {usersData.map((data, index) => {
                return (
                  <View
                    key={index}
                    style={{width: '100%', height: 145, marginTop: 8}}>
                    <GroceryCardComponent
                      profession={data.profession}
                      navigation={navigation}
                      user_id={data._id}
                      // image=""
                      currUserData={currUserData}
                      username={data.name}
                      age={data.age}
                      // age="52"
                    />
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View style={{height: 80}} />
      </ScrollView>
    </View>
  );
}

const GroceryCardComponent = ({
  image,
  username,
  info,
  profession,
  age,
  navigation,
  currUserData,

  user_id,
}) => {
  return (
    <Card
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
          navigation.navigate('ProfileDetailScreen', {
            currentUser: false,
            passingThis: {hello: 'hii'},
          });
        }}>
        <Image
          source={require('../../assets/images/grocery.jpg')}
          style={{
            width: SIZES.width / 3.3,
            height: SIZES.width / 3.3,
            margin: 5,
          }}
        />
        <View style={{justifyContent: 'space-between', marginLeft: 10}}>
          <View style={{}}>
            <CustomTextComponent
              text={username}
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
              // navigation.navigate('ProfileDetailScreen');
              navigation.navigate('ProfileDetailScreen', {
                currentUser: false,
                otherUserData: {user_id},
                currUserData,
              });
            }}
          />
          <View style={{marginTop: 0}} />
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export const HeaderComponent = ({navigation}) => {
  const signOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate('LoginScreen');
    // try {
    //     await GoogleSignin.revokeAccess();
    //     await GoogleSignin.signOut();
    //     firebase.auth()
    //         .signOut()
    //         .then(async () => {
    //             navigation.navigate("LoginScreen");
    //             await AsyncStorage.clear();
    //         });
    // } catch (error) {
    //     console.error(error);
    // }
  };
  return (
    <Card style={{elevation: 8, shadowColor: '#999', backgroundColor: '#fff'}}>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 6}}>
          <Image
            source={require('../../assets/images/grocery.jpg')}
            style={{width: 40, height: 40, tintColor: '#037D05', borderRadius: 25, borderColor: "red", borderWidth: 2}}
          />
          <View style={{marginLeft: 15}}>
            <CustomTextComponent
              text={'Nearby'}
              fs={26}
              fw="700"
              color={'red'}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
          <Image
            source={require('../../assets/images/setting.png')}
            style={{width: 38, height: 38, tintColor: '#000'}}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 62,
    overflow: 'hidden',
    marginTop: -5,
    paddingHorizontal: 16,
  },
});
