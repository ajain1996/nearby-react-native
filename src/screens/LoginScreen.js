import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomTextComponent from '../components/CustomTextComponent';
import { SIZES } from '../Constants/theme';
import auth from '@react-native-firebase/auth';
import { loginUserPostRequestAPI } from '../utils/API';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {

    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);

    const [confirm, setConfirm] = useState(null);

    const loginList = [
        { name: 'Find Nearby People' },
        { name: 'See Who Is\nIntrested In You' },
        { name: 'Chat/Date Your Way' },
        { name: 'No Restrictions.\nNo Charges' },
    ];

    function onAuthStateChanged(user) {
        setUser(user);
        console.log('\n\n setUser: ', user);
        if (user) { setloggedIn(true) };
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '1020540333913-toll7o3e8n2qbr4fgfbaopce7ef5vkav.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            forceConsentPrompt: true,
        });

        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);


    const googleSignin = async () => {
        setLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //  this.setState({ userInfo });
            // setLoading(false);
            if (userInfo !== null) {
                console.log("User details: ", userInfo);
                loginUserPostRequestAPI(
                    userInfo["user"].email,
                    userInfo.idToken,
                    async (response) => {
                        setLoading(false);
                        console.log("\n\n \n\n responsesss: ", response);
                        // var isToken = await AsyncStorage.getItem("id_token");
                        if (response.status === "User does not exist.") {
                            navigation.navigate("RegisterScreen", {
                                email: userInfo["user"].email,
                                password: userInfo.idToken,
                            });
                        }
                        else {
                            navigation.replace("Tabs", {
                                email: userInfo["user"].email,
                                password: userInfo.idToken,
                            });
                        }
                    },
                );
            }
            // console.warn(userInfo);
        } catch (error) {
            setLoading(false);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log(error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log(error);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log(error);
            } else {
                // some other error happened
                console.log(error);
            }
        }
    };


    return (
        loading
            ? <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={24} color={"#000"} />
            </View>
            : <ScrollView>
                <View style={{ width: '100%', height: SIZES.height }}>
                    <View style={{ paddingHorizontal: 20, paddingVertical: 35, backgroundColor: '#FF6C5A' }}>
                        {
                            loginList.map((data, index) => {
                                return (
                                    <View key={index} style={{
                                        width: '100%', flexDirection: 'row', borderRadius: 8, padding: 10,
                                        justifyContent: 'flex-start', alignItems: 'center',
                                        marginTop: 10, backgroundColor: '#fff', elevation: 4, overflow: 'hidden'
                                    }}>
                                        <Image
                                            source={require("../../assets/images/grocery.jpg")}
                                            style={{ width: 80, height: 80, borderWidth: 3, borderRadius: 100 }}
                                        />
                                        <View style={{ width: 20 }} />
                                        <View style={{ width: SIZES.width / 1.74 }}>
                                            <CustomTextComponent
                                                text={data.name}
                                                fs={24} fw="700" color={"#000"}
                                            />
                                        </View>
                                    </View>
                                );
                            })
                        }
                    </View>

                    <LinearGradient colors={["#FF6C5A", "#FD3476", "#FD3476"]}>
                        <View style={{ width: '100%', paddingTop: 10, height: '100%' }}>
                            <View style={{ paddingHorizontal: 20 }}>
                                <CustomTextComponent
                                    text={"By clicking Log In, you agree with our Terms. \n Learn how we process your data in our Privacy\nPolicy and Cookies Policy"}
                                    fs={16} fw="500" color={"#fff"} textAlign="center" lineHeight={22}
                                />
                            </View>

                            <View style={{ marginHorizontal: 20, marginVertical: 40 }}>
                                <TouchableOpacity activeOpacity={0.9} style={{
                                    flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 16, width: '100%',
                                    alignItems: 'center', backgroundColor: '#fff', borderRadius: 30
                                }} onPress={() => { googleSignin(); }}>
                                    <Image
                                        source={require("../../assets/images/google.png")}
                                        style={{ width: 24, height: 24 }}
                                    />
                                    <View style={{ alignSelf: 'center', width: '90%' }}>
                                        <CustomTextComponent
                                            text={"LOG IN WITH GOOGLE"} lineHeight={22}
                                            fs={18} fw="500" color={"#000"} textAlign="center"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </ScrollView>
    )
}
