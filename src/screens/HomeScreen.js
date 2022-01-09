import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import CustomButtonComponent from '../components/CustomButtonComponent';
import CustomTextComponent from '../components/CustomTextComponent';
import { SIZES } from '../Constants/theme';
import SelectDropdown from 'react-native-select-dropdown'
import { windowWidth } from '../components/CustomDropdownComponent';
import { fetchUsersDataFromAPI } from '../utils/API';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { firebase } from '@react-native-firebase/auth';

export default function HomeScreen({ navigation }) {
    const [tabsBtn, setTabsBtn] = useState("nearbyUsers");
    const ageGroups = ["12 to 18", "19 to 32", "33 to 64", "65 to 80"];
    const genders = ["Male", "Female"];

    const [loading, setLoading] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const refRBSheet = useRef();

    useEffect(() => {
        setLoading(true);
        fetchUsersDataFromAPI((response) => {
            setLoading(false);
            if (response !== null) {
                setUsersData(response);
            }
        });
    }, []);

    // console.log("\n\n \n\n usersData: ", usersData);

    const renderAgeButton = (text, listData) => {
        return (
            <SelectDropdown
                data={listData}
                buttonStyle={{
                    width: "45%", borderWidth: 1, height: 40, justifyContent: 'space-between',
                    alignItems: 'center', borderColor: 'grey', borderRadius: 8, flexDirection: 'row',
                    paddingLeft: -45
                }}
                buttonTextStyle={{
                    fontWeight: 'normal', fontSize: 12.2, color: '#000'
                }}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                renderDropdownIcon={() => {
                    return (
                        <Image
                            source={require("../../assets/images/caret-down.png")}
                            style={{ width: 10, height: 10, tintColor: 'grey', position: 'absolute', right: 10 }}
                        />
                    );
                }}
                dropdownIconPosition="right"
            />
            // 
        );
    }

    const renderAdsPlacesBtn = () => {
        return (
            <TouchableOpacity activeOpacity={1} style={{
                width: "100%", borderWidth: 0, borderColor: "#A83037", justifyContent: "center",
                borderRadius: 10, height: 180, alignItems: 'center',
            }}>
                <Image
                    source={{ uri: "https://1.bp.blogspot.com/-JfQznnlXS9g/V_pi7KtKY1I/AAAAAAAAAAw/1xibMxOOvfgF0VHpr__QihMiyiCXV-yEwCLcB/s1600/Advertise1_Large.jpg" }}
                    style={{ width: "100%", height: '100%', borderRadius: 10 }}
                />
            </TouchableOpacity>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <HeaderComponent navigation={navigation} />
            <ScrollView>
                <View style={{ alignItems: 'center', paddingHorizontal: 16 }}>
                    <View style={{ height: 8 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CustomButtonComponent
                            textColor={tabsBtn === "nearbyUsers" ? "#fff" : "#000"} bw={1}
                            bgColors={tabsBtn === "nearbyUsers" ? false : true} fw="normal"
                            text="Nearby Users" fs={14} width={windowWidth / 2.2} height={46}
                            bc={tabsBtn === "nearbyUsers" ? "silver" : "0073ff"} btlr={8}
                            bblr={8} onPress={() => { setTabsBtn("nearbyUsers") }}
                        />
                        <CustomButtonComponent
                            textColor={tabsBtn === "allUsers" ? "#fff" : "#000"} bw={1}
                            bgColors={tabsBtn === "allUsers" ? false : true} fw="normal"
                            text="All Users" fs={14} width={windowWidth / 2.2} height={46}
                            bc={tabsBtn === "allUsers" ? "silver" : "0073ff"} bbrr={8}
                            btrr={8} onPress={() => { setTabsBtn("allUsers") }}
                        />
                    </View>

                    {tabsBtn === "nearbyUsers"
                        ? <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            {renderAgeButton("Age Group", ageGroups)}
                            <View style={{ width: 8 }} />
                            {renderAgeButton("Male/Female", genders)}
                        </View>
                        : <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', width: '100%',
                            height: 50, alignItems: 'center'
                        }}>
                            <CustomTextComponent
                                text={"List Of All Users"} fw="600"
                                fs={21} color={"#000"}
                            />
                            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                                <Image
                                    source={require("../../assets/images/filter.png")}
                                    style={{ width: 30, height: 30, tintColor: 'grey' }}
                                />
                            </TouchableOpacity>
                        </View>}

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
                    <View style={{ height: 10 }} />

                    {renderAdsPlacesBtn()}
                    <View style={{ height: 10 }} />

                    {loading
                        ? <View style={{
                            width: '100%', height: SIZES.height / 3, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <ActivityIndicator />
                        </View>
                        : <View style={{ width: '100%' }}>
                            {
                                usersData.map((data, index) => {
                                    return (
                                        <View key={index} style={{ width: '100%', height: 145, marginTop: 8 }}>
                                            <GroceryCardComponent
                                                navigation={navigation}
                                                // image=""
                                                username={data.name}
                                                age={data.age}
                                            />
                                        </View>
                                    );
                                })
                            }
                        </View>}
                </View>
                <View style={{ height: 80 }} />
            </ScrollView >
        </View>
    )
}


const GroceryCardComponent = ({ image, username, info, age, navigation }) => {
    return (
        <Card style={{
            backgroundColor: '#fff', shadowColor: 'silver', marginVertical: 5,
            elevation: 12, borderRadius: 8
        }}>
            <TouchableOpacity style={{ flexDirection: 'row', padding: 5 }} activeOpacity={0.9}
                onPress={() => {
                    navigation.navigate("ProfileDetailScreen", {
                        currentUser: false
                    })
                }}
            >
                <Image
                    source={require("../../assets/images/grocery.jpg")}
                    style={{ width: SIZES.width / 3.3, height: SIZES.width / 3.3, margin: 5 }}
                />
                <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                    <View style={{}}>
                        <CustomTextComponent
                            text={username}
                            fs={23} fw="700" color={"#000"}
                        />
                        <CustomTextComponent
                            text={"Age: 24"} fw="600"
                            fs={14} color={"#000"}
                        />
                        <CustomTextComponent
                            text={"Profession: Doctor"} fw="600"
                            fs={14} color={"#000"}
                        />
                        <CustomTextComponent
                            text={"Distance: 0 KM away"} fw="600"
                            fs={14} color={"#000"}
                        />
                    </View>
                    <CustomButtonComponent
                        textColor={"#fff"} bgColor={"#042165"} fw="normal" br={20}
                        text="View Profile" fs={15} width={"85%"} height={38}
                        onPress={() => { navigation.navigate("ProfileDetailScreen") }}
                    />
                    <View style={{ marginTop: 0 }} />
                </View>
            </TouchableOpacity>
        </Card>
    );
}


export const HeaderComponent = ({ navigation }) => {
    const signOut = async () => {
        await AsyncStorage.clear()
        navigation.navigate("LoginScreen");
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
        <Card style={{ elevation: 8, shadowColor: '#999', backgroundColor: '#fff' }}>
            <View style={styles.headerContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require("../../assets/images/location.png")}
                        style={{ width: 30, height: 30, tintColor: '#037D05' }}
                    />
                    <View style={{ marginLeft: 8 }}>
                        <CustomTextComponent
                            text={"Your Location"}
                            fs={16} fw="700" color={"#000"}
                        />
                        <CustomTextComponent
                            text={"83, Ak Colony, Ward ..."}
                            fs={17} fw="500" color={"#000"}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={signOut}>
                    <Image
                        source={require("../../assets/images/setting.png")}
                        style={{ width: 38, height: 38, tintColor: '#000' }}
                    />
                </TouchableOpacity>
            </View>
        </Card>
    );
}


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row", alignItems: 'center', justifyContent: 'space-between',
        width: '100%', height: 62, overflow: "hidden", marginTop: -5,
        paddingHorizontal: 16,
    }
});
