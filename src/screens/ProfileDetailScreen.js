import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import CustomTextComponent from '../components/CustomTextComponent';
import { HeaderComponent } from './HomeScreen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomButtonComponent from '../components/CustomButtonComponent';
import { getSingleUserDatailFromAPI, sendUserRequestPostRequestAPI } from '../utils/API';
import CustomProgressIndicator from '../components/CustomProgressIndicator';

export default function ProfileDetailScreen({ navigation }) {

    const [loading, setLoading] = useState(false);
    const [usersData, setUserData] = useState([]);

    useEffect(() => {
        setLoading(true);
        // (async () => {
        //     var userId = await AsyncStorage.getItem("user_id");
        //     if (userId !== null) {
        //     }
        // });

        getSingleUserDatailFromAPI("61db0ecc1eb9c4a8f9bd8f96", (response) => {
            setLoading(false);
            if (response !== null) {
                setUserData(response);
            }
        });
    }, []);

    console.log("\n\n \n\n Single User Data: ", usersData)

    return (
        loading
            ? <CustomProgressIndicator />
            : <View>
                <ScrollView style={{ height: "90%" }}>
                    <HeaderComponent />

                    <View style={{ marginTop: 10 }} />
                    {renderProfileInfoComponent(usersData)}

                    <View style={{ marginTop: 10 }} />
                    <View style={{ elevation: 4, shadowColor: '#999', backgroundColor: '#fff' }}>
                        <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 16 }}>
                            <CustomTextComponent
                                text={"About Me"} fw="500"
                                fs={22} color={"#000"}
                            />
                            <View style={{ height: 5 }} />
                            <CustomTextComponent
                                text={usersData.about_me} fw="300"
                                fs={18} color={"#000"} lineHeight={24}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }} />
                </ScrollView>

                <View style={{ elevation: 8, shadowColor: '#999', backgroundColor: '#fff' }}>
                    <View style={{ padding: 16, width: '100%' }}>
                        <CustomButtonComponent
                            textColor={"#fff"} bw={0} bgColor={"maroon"} fw="normal"
                            text="Send Request" fs={14} width="100%" height={50} br={8}
                            bc={"#000"} onPress={() => {
                                setLoading(true);
                                sendUserRequestPostRequestAPI("sending_id", "requested_id", (response) => {
                                    console.log('\n\n sendUserRequestPostRequestAPI response: ', response)
                                    setLoading(false);
                                    if (response.success) {
                                        Alert.alert(
                                            'Submit Successfully', response.msg, [{
                                                text: 'OK',
                                                onPress: () => { navigation.goBack() }
                                            }], { cancelable: false },
                                        );
                                    }
                                });
                            }}
                        />
                    </View>
                </View>
            </View>
    )
}


const renderProfileInfoComponent = (usersData) => {
    return (
        <View style={{ elevation: 4, shadowColor: '#999', backgroundColor: '#fff' }}>
            <View style={{ width: '100%', padding: 24 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Image
                        source={require("../../assets/images/age.png")}
                        style={{ width: 24, height: 24 }}
                    />
                    <View style={{ width: 5 }} />
                    <CustomTextComponent
                        text={"24 years"} fw="400"
                        fs={20} color={"#000"}
                    />
                </View>

                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: 120, height: 120, borderRadius: 100, marginRight: 30 }}>
                        <Image
                            source={require("../../assets/images/profile.png")}
                            style={{ width: "100%", height: '100%' }}
                        />
                    </View>
                    <View>
                        <CustomTextComponent
                            text={usersData.name} fw="500"
                            fs={25} color={"#000"}
                        />
                        <View style={{ height: 8 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require("../../assets/images/briefcase.png")}
                                style={{ width: 20, height: 20, marginRight: 8, tintColor: '#000' }}
                            />
                            <CustomTextComponent
                                text={"Software Engineer"} fw="300"
                                fs={18} color={"#000"}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <View style={{ marginLeft: -3 }}>
                                <EvilIcons name="location" size={28} color={"#000"} />
                            </View>
                            <View style={{ marginRight: 4 }} />
                            <CustomTextComponent
                                text={"73 miles away"} fw="300"
                                fs={18} color={"#000"}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

