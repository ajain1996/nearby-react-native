export const fetchUsersDataFromAPI = async (successCallBack) => {
    console.log('\n\n fetchUsersDataFromAPI Called : ');
    try {
        let response = await fetch('https://nearbybackend.herokuapp.com/user/all', {
            method: 'GET',
        });
        let json = await response.json();
        console.log('\n\n fetchUsersDataFromAPI success: ');
        successCallBack(json.user);
    } catch (error) {
        console.log('\n\n fetchUsersDataFromAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};


export const getSingleUserDatailFromAPI = async (user_id, successCallBack) => {
    console.log('\n\n getSingleUserDatailFromAPI Called : ', user_id);
    try {
        let response = await fetch(`https://nearbybackend.herokuapp.com/user/one/${user_id}`, {
            method: 'GET',
        });
        let json = await response.json();
        console.log('\n\n getSingleUserDatailFromAPI success: ');
        successCallBack(json.user);
    } catch (error) {
        console.log('\n\n getSingleUserDatailFromAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};


export const usersWithRequestsAndAcceptFromAPI = async (user_id, successCallBack) => {
    console.log('\n\n usersWithRequestsAndAcceptFromAPI Called : ');
    try {
        let response = await fetch(`https://nearbybackend.herokuapp.com/user/with_requests`, {
            method: 'GET',
        });
        let json = await response.json();
        console.log('\n\n usersWithRequestsAndAcceptFromAPI success: ');
        successCallBack(json.user);
    } catch (error) {
        console.log('\n\n usersWithRequestsAndAcceptFromAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};


export const signUpUserPostRequestAPI = async (email, password, name, username, age, city, country, about_me, gender, state, profession, successCallBack) => {
    console.log('\n\n signUpUserPostRequestAPI Called : ');
    console.log(
        "\n Parameters: ",
        '\n email: ', email,
        '\n password: ', password,
        '\n name: ', name,
        '\n age: ', age,
        '\n city: ', city,
        '\n country: ', country,
    );
    try {
        let response = await fetch('https://nearbybackend.herokuapp.com/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "userName": username,
                "password": password,
                "name": name,
                "age": age,
                "city": city,
                "profession": profession,
                "country": country,
                "location": { "lat": "85", "long": "25" },
                "about_me": about_me,
                "gender": gender,
                "state": state,
                "dob": { "month": 12, "year": 2021, "date": 12 }
            }),
        });
        let json = await response.json();
        console.log('\n\n signUpUserPostRequestAPI success: ');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n signUpUserPostRequestAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};


export const loginUserPostRequestAPI = async (email, password, successCallBack) => {
    console.log('\n\n loginUserPostRequestAPI Called : ');
    console.log(
        "\n Parameters: ",
        '\n email: ', email,
        '\n password: ', password,
    );
    try {
        let response = await fetch('https://nearbybackend.herokuapp.com/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                "email": email,
                "password": password,
            }),
        });
        let json = await response.json();
        console.log('\n\n loginUserPostRequestAPI success: ', json, response);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n loginUserPostRequestAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};


export const updateLocationPostRequestAPI = async (lat, long, user_id, successCallBack) => {
    console.log('\n\n updateLocationPostRequestAPI Called : ');
    console.log(
        "\n Parameters: ",
        '\n user_id: ', user_id,
        '\n lat: ', lat,
        '\n long: ', long,
    );
    try {
        let response = await fetch('https://nearbybackend.herokuapp.com/location/set', {
            method: 'POST',
            body: {
                "user_id": user_id,
                "lat": lat,
                "long": long
            }
        });
        let json = await response.json();
        console.log('\n\n updateLocationPostRequestAPI success: ', json.update_user);
        successCallBack(json.update_user);
    } catch (error) {
        console.log('\n\n updateLocationPostRequestAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};


export const sendUserRequestPostRequestAPI = async (sending_id, requested_id, successCallBack) => {
    console.log('\n\n sendUserRequestPostRequestAPI Called : ');
    console.log(
        "\n Parameters: ",
        '\n sending_id: ', sending_id,
        '\n requested_id: ', requested_id,
    );
    try {
        let response = await fetch('https://nearbybackend.herokuapp.com/request/sendrequest', {
            method: 'POST',
            body: {
                "sending_id": "61d604044871b5483df2f257",
                "requested_id": "61d5f3f1292621d5d7a636a1"
            }
        });
        let json = await response.json();
        console.log('\n\n sendUserRequestPostRequestAPI success: ', json);
        successCallBack(json);
    } catch (error) {
        console.log('\n\n sendUserRequestPostRequestAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

