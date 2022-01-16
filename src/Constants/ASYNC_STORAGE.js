import AsyncStorage from '@react-native-async-storage/async-storage';

const CHECK_LOGGED_IN_VALUE = 'CHECK_LOGGED_IN_VALUE';
const LOGGED_IN_USER_DETAILS = 'LOGGED_IN_USER_DETAILS';
const BACKEND = 'https://nearbybackend.herokuapp.com';

const getCurrUSerData = async () => {
  try {
    const asyncData = await AsyncStorage.getItem(LOGGED_IN_USER_DETAILS);
    const parsed = JSON.parse(asyncData);
    return parsed;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  CHECK_LOGGED_IN_VALUE,
  LOGGED_IN_USER_DETAILS,
  BACKEND,
  getCurrUSerData,
};
