import AsyncStorage from '@react-native-async-storage/async-storage';

const CHECK_LOGGED_IN_VALUE = 'CHECK_LOGGED_IN_VALUE';
const ASYNC_LOGGED_IN_USER_DETAILS = 'ASYNC_LOGGED_IN_USER_DETAILS';
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
  ASYNC_LOGGED_IN_USER_DETAILS,
  BACKEND,
  getCurrUSerData,
};
