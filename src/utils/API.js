import axios from 'axios';
import {Alert} from 'react-native';

// const BACKEND = 'http://192.168.10.5:5001';
// const BACKEND = 'http://10.0.2.2:5001';
const BACKEND = 'https://nearbybackend.herokuapp.com';
export const fetchUsersDataFromAPI = async (curr_user_id, successCallBack) => {
  // console.log('\n\n fetchUsersDataFromAPI Called : ');
  try {
    // console.log(`${BACKEND}/user/all/${curr_user_id} =<<<<<<<<<<<<<<<<<< api`);
    let response = await fetch(`${BACKEND}/user/all/${curr_user_id}`, {
      // let response = await fetch(
      //   'https://nearbybackend.herokuapp.com/user/MALE',
      //   {
      method: 'GET',
    });
    let json = await response.json();
    // console.log('\n\n fetchUsersDataFromAPI success: ');
    successCallBack(json.user);
  } catch (error) {
    // console.log('\n\n fetchUsersDataFromAPI Failed : ');
    // console.error('error', error);
    successCallBack(null);
  }
};

export const fetchUserbyGender = async (GENDER, successCallBack) => {
  // console.log('\n\n fetch Data By Gender Called : ');
  try {
    // let response = await fetch('https://nearbybackend.herokuapp.com/user/all', {
    let response = await fetch(`${BACKEND}/user/gender/${GENDER}`, {
      method: 'GET',
    });
    let json = await response.json();
    // console.log('this i suserss by gender>>>>>>>>>>', json.users);
    // console.log('\n\n fetch users by gender success: ');
    successCallBack(json.users);
  } catch (error) {
    // console.log('\n\n fetch users by gender Failed : ');
    // console.error('error', error);
    successCallBack(null);
  }
};
export const fetchsersByAgeGroup = async (to, from, successCallBack) => {
  // console.log('\n\n fetch Data By Age Group Called : ');
  try {
    // let response = await fetch('https://nearbybackend.herokuapp.com/user/all', {
    let response = await fetch(`${BACKEND}/user/byage/${to}/${from}`, {
      method: 'GET',
    });
    let json = await response.json();
    // console.log('this i suserss by Age group>>>>>>>>>>', json.users);
    // console.log('\n\n fetch users by Age group success: ');
    successCallBack(json.users);
  } catch (error) {
    // console.log('\n\n fetch users by Age group Failed : ');
    // console.error('error', error);
    successCallBack(null);
  }
};
export const fetchUsersByAgeAndGender = async (
  gender,
  from,
  to,
  successCallBack,
) => {
  // console.log(
  //   '\n\n fetch Data By Age and gender Group Called : ',
  //   gender,
  //   to,
  //   from,
  // );
  // console.log(`${BACKEND}/user/byage/${gender}/${from}/${to}`);
  try {
    // let response = await fetch('https://nearbybackend.herokuapp.com/user/all', {
    let response = await fetch(
      `${BACKEND}/user/filter/${gender}/${from}/${to}`,
      {
        method: 'GET',
      },
    );
    let json = await response.json();
    // console.log('this i suserss by gender and Age group>>>>>>>>>>', json.users);
    // console.log('\n\n fetch users by gender and Age group success: ');
    successCallBack(json.users);
  } catch (error) {
    // console.log('\n\n fetch users by gender and Age group Failed : ');
    // console.error('error', error);
    successCallBack(null);
  }
};

export const getSingleUserDatailFromAPI = async (user_id, successCallBack) => {
  // // console.log('\n\n getSingleUserDatailFromAPI Called : ', user_id);
  try {
    let response = await fetch(`${BACKEND}/user/one/${user_id}`, {
      method: 'GET',
    });
    let json = await response.json();
    // // console.log('\n\n getSingleUserDatailFromAPI success: ');
    successCallBack(json.user);
  } catch (error) {
    // // console.log('\n\n getSingleUserDatailFromAPI Failed : ');
    // // console.error('error', error);
    successCallBack(null);
  }
};

export const fetchNearByUsers = async (
  user_id,
  log,
  lat,
  quantity,
  gender,
  from,
  to,
  successCallBack,
) => {
  try {
    Alert.alert('called');
    // console.log(
    //   `Sending====>>>>>>>>>>> ${BACKEND}/user/location/${user_id}/${log}/${lat}/${quantity}`,
    // );
    // const {data} = await axios.get(
    //   `${BACKEND}/user/location/${user_id}/${log}/${lat}/${quantity}`,
    // );
    const {data} = await axios.get(
      `${BACKEND}/user/filter/location/${user_id}/${log}/${lat}/${quantity}/${gender}/${from}/${to}}`,
    );
    successCallBack(data.data);
    // console.log(
    //   '\n\n=================\n\n\n\n',
    //   data,
    //   '\n\n\n=============\n\n\n',
    // );
  } catch (e) {
    // console.log(e);
  }
};
export const fetchAllUSersWithLocation = async (
  user_id,
  log,
  lat,
  quantity,
  successCallBack,
) => {
  try {
    Alert.alert('called');
    console.log(
      `\n\n\n\n\n\nSending====>>>>>>>>>>> ${BACKEND}/user/location/${user_id}/${log}/${lat}/${quantity}\n\n\n`,
    );
    const {data} = await axios.get(
      `${BACKEND}/user/all/location/${user_id}/${log}/${lat}/${quantity}`,
    );
    successCallBack(data.data);
    // console.log(
    //   '\n\n=================\n\n\n\n',
    //   data,
    //   '\n\n\n=============\n\n\n',
    // );
  } catch (e) {
    // console.log(e);
  }
};

export const usersWithRequestsAndAcceptFromAPI = async (
  user_id,
  successCallBack,
) => {
  // console.log('\n\n usersWithRequestsAndAcceptFromAPI Called : ');
  try {
    let response = await fetch(`${BACKEND}/user/with_requests`, {
      method: 'GET',
    });
    let json = await response.json();
    // console.log('\n\n usersWithRequestsAndAcceptFromAPI success: ');
    successCallBack(json.user);
  } catch (error) {
    // console.log('\n\n usersWithRequestsAndAcceptFromAPI Failed : ');
    // console.error('error', error);
    successCallBack(null);
  }
};
// export const signUpUserPostRequestAPI=async()

export const signUpUserPostRequestAPI = async (
  email,
  password,
  name,
  username,
  age,
  city,
  country,
  about_me,
  gender,
  state,
  profession,
  successCallBack,
) => {
  // console.log('\n\n signUpUserPostRequestAPI Called : ');
  // console.log(
  //   email,
  //   password,
  //   name,
  //   username,
  //   age,
  //   city,
  //   country,
  //   about_me,
  //   gender,
  //   state,
  //   profession,
  //   '><<<<<<<<<<<<<<<<<<<<< THERE ARE SIGN  IN VALUES',
  // );
  try {
    let response = await fetch(`${BACKEND}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        userName: username,
        password: password,
        name: name,
        age: 24,
        city: city,
        profession: profession,
        country: country,
        location: {lat: '85', long: '25'},
        about_me: about_me,
        gender: gender,
        state: state,
        dob: {month: 12, year: 2021, date: 12},
      }),
    });

    let json = await response.json();
    // console.log('\n\n signup response >>>>>>> ', json);
    successCallBack(json);
  } catch (error) {
    // console.log('\n\n signUpUserPostRequestAPI Failed : ');
    // console.error('error', error);
    successCallBack(null);
  }
};

export const loginUserPostRequestAPI = async (
  email,
  password,
  successCallBack,
) => {
  // console.log('\n\n loginUserPostRequestAPI Called : ');
  // console.log('thsi is data sending while login:---------- ', email, password);
  try {
    let response = await fetch(`${BACKEND}/auth/login/${email}`, {
      method: 'POST',
    });
    let json = await response.json();
    // console.log('\n\n loginUserPostRequestAPI success: ', json, response);
    successCallBack(json);
  } catch (error) {
    // console.log('\n\n loginUserPostRequestAPI Failed : ');
    // console.error('error', error);
    successCallBack(null);
  }
};

export const checkSendRequestButtonText = async (
  curr_user_id,
  other_user_id,
  successCallBack,
) => {
  // console.log(
  //   curr_user_id,
  //   other_user_id,
  //   'Sending request to current user and other user id',
  // );
  try {
    const response = await fetch(
      `${BACKEND}/user/check_request/${curr_user_id}/${other_user_id}`,
      {method: 'GET'},
    );
    let json = await response.json();
    successCallBack(json);
  } catch (e) {
    // console.log(e);
    successCallBack(null);
  }
};

export const updateLocationPostRequestAPI = async (
  lat,
  long,
  user_id,
  successCallBack,
) => {
  // console.log('\n\n updateLocationPostRequestAPI Called : ');
  // console.log(
  //   '\n Parameters: ',
  //   '\n user_id: ',
  //   user_id,
  //   '\n lat: ',
  //   lat,
  //   '\n long: ',
  //   long,
  // );
  try {
    let response = await fetch(`${BACKEND}/location/set`, {
      method: 'POST',
      body: {
        user_id: user_id,
        lat: lat,
        long: long,
      },
    });
    let json = await response.json();
    // console.log(
    //   '\n\n updateLocationPostRequestAPI success: ',
    //   json.update_user,
    // );
    successCallBack(json.update_user);
  } catch (error) {
    // console.log('\n\n updateLocationPostRequestAPI Failed : ');
    // console.error('error', error);
    successCallBack(null);
  }
};

export const sendUserRequestPostRequestAPI = async (
  sending_id,
  requested_id,
  successCallBack,
) => {
  // console.log('\n\n sendUserRequestPostRequestAPI Called : ');
  // console.log(
  //   '\n Parameters: ',
  //   '\n sending_id: ',
  //   sending_id,
  //   '\n requested_id: ',
  //   requested_id,
  // );
  try {
    let response = await fetch(
      `${BACKEND}/request/sendrequest/${sending_id}/${requested_id}`,
      {
        method: 'POST',
        body: {
          sending_id: sending_id,
          requested_id: requested_id,
        },
      },
    );
    let json = await response.json();
    // console.log('\n\n sendUserRequestPostRequestAPI success: ', json);
    successCallBack(json);
  } catch (error) {
    // console.log('\n\n sendUserRequestPostRequestAPI Failed : ');
    // console.error('error', error);
    successCallBack(null);
  }
};
export const nearByUsers = async (user_id, lon, lat, successCallBack) => {
  try {
    const {data} = await axios.get(
      `${BACKEND}/user/location/${user_id}/${lon}/${lat}`,
    );
    // console.log('\n\n\n\n\n\n\n\n\n\n\n', data);
  } catch (e) {
    // console.log(e);
  }
};
export const updateUser = async (senddata, successCallBack) => {
  try {
    console.log(`${BACKEND}/auth/update/${senddata._id}`);
    const {data} = await axios.patch(`${BACKEND}/auth/update/${senddata._id}`, {
      data: senddata,
    });
    successCallBack(data);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
