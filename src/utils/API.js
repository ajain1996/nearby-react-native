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


export const signUpUserPostRequestAPI = async (email, password, name, age, city, country, successCallBack) => {
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
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            // body: `email=${email}&password=${password}&name=${name}&age=${age}&city=${city}&country=${country}`,
            body: {
                "email": email,
                "password": password,
                "name": name,
                "age": age,
                "city": city,
                "country": country,
            }
        });
        let json = await response.json();
        console.log('\n\n signUpUserPostRequestAPI success: ', response.text());
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
            body: {
                "email": email,
                "password": password,
            }
        });
        let json = await response.json();
        console.log('\n\n loginUserPostRequestAPI success: ');
        successCallBack(json);
    } catch (error) {
        console.log('\n\n loginUserPostRequestAPI Failed : ');
        console.error('error', error);
        successCallBack(null);
    }
};

