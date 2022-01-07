import { Card } from 'native-base';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CustomInputComponent from '../components/CustomInputComponent';
import CustomTextComponent from '../components/CustomTextComponent';
import { COLORS } from '../Constants/theme';
import moment from 'moment';
import CustomButtonComponent from '../components/CustomButtonComponent';
import LinearGradient from 'react-native-linear-gradient';
import { CustomDropdownComponent, windowWidth } from '../components/CustomDropdownComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { signUpUserPostRequestAPI } from '../utils/API';

export default function RegisterScreen({ navigation, route }) {

    const [fnameError, setFNameError] = useState(false);
    const [lnameError, setLNameError] = useState(false);
    const [professionError, setProfessionError] = useState(false);
    const [aboutMeError, setAboutMeError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [stateError, setStateError] = useState(false);
    const [cityError, setCityError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [dobError, setDobError] = useState(false);

    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [profession, setProfession] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");

    const [date, setDate] = useState(new Date(1598051730000));
    const [showDatePicker, setShowdatePicker] = useState(false);

    const [loading, setLoading] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowdatePicker(false);
        setDate(moment(currentDate).format("YYYY-MM-DD"));
        setDob(moment(currentDate).format("YYYY-MM-DD"));
        setDobError(false);
    };

    const ageGroupList = ["12 to 18", "19 to 32", "33 to 64", "65 to 80"];

    const yourProfessionList = ["Profession 1", "Profession 2", "Profession 3", "Profession 4", "Profession 5"];

    const countryList = ["India", "US", "UK", "Swizerland", "Australia"];

    const cityList = ["Mumbai", "Jabalpur", "Nagpur", "Malburn", "Vascodigama"];

    const stateList = ["MP", "UP", "Delhi", "Uttrakhand", "Indiana"];


    const renderdatePicker = () => {
        if (showDatePicker) {
            return (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    display="default"
                    onChange={onChange}
                />
            );
        } else {
            return (<></>)
        }
    }


    const handleClick = () => {
        if (fname.length === 0) {
            setFNameError(true);
        } if (lname.length === 0) {
            setLNameError(true);
        } if (profession.length === 0) {
            setProfessionError(true);
        } if (aboutMe.length === 0) {
            setAboutMeError(true);
        } if (country.length === 0) {
            setCountryError(true);
        } if (state.length === 0) {
            setStateError(true);
        } if (dob.length === 0) {
            setDobError(true);
        } if (gender.length === 0) {
            setGenderError(true);
        } if (age.length === 0) {
            setAgeError(true);
        } else {
            var fullname = fname + ' ' + lname;
            setLoading(true);
            signUpUserPostRequestAPI(
                route.params.email,
                route.params.password,
                fullname,
                age,
                city,
                country,
                (response) => {
                    setLoading(false);
                    if (response !== null) {
                        console.log(response);
                    }
                    navigation.replace("Tabs")
                },
            );
        }
    }


    return (
        <View>
            <View style={{ elevation: 4, shadowColor: '#999', backgroundColor: '#0073ff' }}>
                <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
                    <CustomTextComponent
                        text={"Complete Your Profile"}
                        fs={24} fw="500" color={"#f7f8f9"} textAlign="center"
                    />
                </View>
            </View>
            {loading
                ? <View style={{ width: '100%', height: '90%', justifyContent: 'center', alignItems: 'center', }}>
                    <ActivityIndicator />
                </View>
                : <ScrollView style={{ backgroundColor: '#f7f8f9' }}>
                    <View style={{ marginHorizontal: 0 }}>
                        <View style={{ height: 10 }} />

                        <Card style={{ ...styles.addProfileContainer }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ ...styles.addProfileImageStyle }}>
                                    <Image
                                        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
                                        style={{ width: '100%', height: '100%', borderRadius: 100 }}
                                    />
                                </View>
                                <View style={{ width: 20 }} />
                                <View style={{ alignItems: 'center' }}>
                                    <CustomTextComponent
                                        text={"Add Profile Picture"} fs={18}
                                        fw="600" color={"#000"} textAlign="center"
                                    />
                                    <View style={{ marginTop: 5 }} />
                                    <CustomButtonComponent
                                        textColor={"#000"} bgColor={"#0073ff"} fw="normal" fs={14} br={8}
                                        text="Pick Image" width={110} height={36} textColor={"#fff"}
                                        onPress={() => { }}
                                    />
                                </View>
                            </View>
                        </Card>
                        <View style={{ marginTop: 10 }} />

                        <View style={{ elevation: 4, shadowColor: '#999', paddingHorizontal: 20, backgroundColor: "#fff" }}>
                            <CustomInputComponent
                                placeholderText="First Name"
                                iconType={require("../../assets/images/fname.png")}
                                headingText="First Name"
                                // error={"emailError"}
                                labelValue={fname}
                                onChangeText={(val) => {
                                    setFName(val);
                                    setFNameError(false);
                                }}
                            />
                            {fnameError ? <ErrorBlock text="Please enter your first name" /> : <></>}


                            <CustomInputComponent
                                placeholderText="Last Name"
                                iconType={require("../../assets/images/fname.png")}
                                headingText="Last Name"
                                labelValue={lname}
                                onChangeText={(val) => {
                                    setLName(val);
                                    setLNameError(false);
                                }}
                            />
                            {lnameError ? <ErrorBlock text="Please enter your last name" /> : <></>}
                            <View style={{ height: 20 }} />


                            {CustomDropdownComponent(
                                "Your Profession", yourProfessionList, "100%", 50,
                                require("../../assets/images/profession.png"),
                                (selectedItem) => {
                                    console.log('\n selectedItem: ', selectedItem)
                                    setProfession(selectedItem);
                                    setProfessionError(false);
                                }, profession
                            )}
                            {professionError ? <ErrorBlock text="Please enter your Profession" /> : <></>}


                            <CustomInputComponent
                                placeholderText="About Me"
                                long={true}
                                headingText="About Me"
                                labelValue={aboutMe}
                                onChangeText={(val) => {
                                    setAboutMe(val);
                                    setAboutMeError(false);
                                }}
                            />
                            {aboutMeError ? <ErrorBlock text="About me field is mandatory" /> : <></>}
                            <View style={{ height: 20 }} />


                            {CustomDropdownComponent(
                                "Country", countryList, "100%", 50,
                                require("../../assets/images/country.png"),
                                (selectedItem) => {
                                    console.log('\n selectedItem: ', selectedItem)
                                    setCountry(selectedItem);
                                    setCountryError(false);
                                }, country,
                            )}
                            {countryError ? <ErrorBlock text="Please select country" /> : <></>}
                            <View style={{ height: 20 }} />


                            {CustomDropdownComponent(
                                "State", stateList, "100%", 50,
                                require("../../assets/images/states.png"),
                                (selectedItem) => {
                                    console.log('\n selectedItem: ', selectedItem)
                                    setState(selectedItem);
                                    setStateError(false);
                                }, state,
                            )}
                            {stateError ? <ErrorBlock text="Please select state" /> : <></>}
                            <View style={{ height: 20 }} />


                            {CustomDropdownComponent(
                                "City", cityList, "100%", 50,
                                require("../../assets/images/states.png"),
                                (selectedItem) => {
                                    console.log('\n selectedItem: ', selectedItem)
                                    setCity(selectedItem);
                                    setCityError(false);
                                }, city,
                            )}
                            {cityError ? <ErrorBlock text="Please select city" /> : <></>}


                            <TouchableOpacity
                                style={[styles.inputContainer, { paddingRight: 16 }]}
                                onPress={() => setShowdatePicker(true)}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                                    {dob.length === 0
                                        ? <Text style={[styles.input, { color: "silver" }]}>DOB</Text>
                                        : <Text style={styles.input}>{dob.toString()}</Text>}
                                    <Fontisto name={"date"} size={20} color="silver" />
                                </View>
                            </TouchableOpacity>
                            {dobError ? <ErrorBlock text="Please select DOB" /> : <></>}
                            <View style={{ height: 20 }} />


                            {CustomDropdownComponent(
                                "Age Group", ageGroupList, "100%", 50,
                                require("../../assets/images/age.png"),
                                (selectedItem) => {
                                    console.log('\n selectedItem: ', selectedItem)
                                    setAge(selectedItem);
                                    setAgeError(false);
                                }, age,
                            )}
                            {ageError ? <ErrorBlock text="Please select your age group" /> : <></>}
                            <View style={{ height: 20 }} />


                            <View style={{ alignItems: 'flex-start' }}>
                                <CustomTextComponent
                                    text={"Select Your Gender"}
                                    fs={18} fw="500" color={"#000"} textAlign="center"
                                />
                                <View style={{ height: 10 }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20 }}>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => { setGender("male") }}
                                        style={{
                                            paddingHorizontal: 12, paddingVertical: 7, flexDirection: 'row',
                                            borderRadius: 8, borderWidth: 1, borderColor: "#0073ff",
                                            backgroundColor: gender === "male" ? '#0073ff' : "#fff",
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image
                                            source={require("../../assets/images/male.png")}
                                            style={{
                                                width: 18, height: 18, marginRight: 10,
                                                tintColor: gender === "male" ? '#fff' : "#000",
                                            }}
                                        />
                                        <CustomTextComponent
                                            text={"Male"} fs={16} fw="500" textAlign="center"
                                            color={gender === "male" ? '#fff' : "#000"}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ width: 10 }} />
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => { setGender("feMale"); setGenderError(false) }}
                                        style={{
                                            paddingHorizontal: 8, paddingVertical: 7, flexDirection: 'row',
                                            borderRadius: 8, borderWidth: 1, borderColor: "#0073ff",
                                            backgroundColor: gender === "feMale" ? '#0073ff' : "#fff",
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image
                                            source={require("../../assets/images/female.png")}
                                            style={{
                                                width: 20, height: 20, marginRight: 10,
                                                tintColor: gender === "feMale" ? '#fff' : "#000",
                                            }}
                                        />
                                        <CustomTextComponent
                                            text={"FeMale"} fs={16} fw="500" textAlign="center"
                                            color={gender === "feMale" ? '#fff' : "#000"}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {genderError ? <ErrorBlock text="Please select your gender" /> : <></>}
                            </View>


                            {renderdatePicker()}
                            <View style={{ height: 20 }} />


                            <CustomButtonComponent
                                textColor={"#000"} fw="normal"
                                text="Sign Up Now" fs={14} width="100%" height={46}
                                textColor={"#fff"} br={8}
                                onPress={() => { handleClick() }}
                            />
                            <View style={{ height: 80 }} />


                        </View>
                    </View>
                </ScrollView>}
        </View>
    )
}


const styles = StyleSheet.create({
    addProfileContainer: {
        elevation: 4, padding: 8,
        backgroundColor: '#fff',
        shadowColor: '#999'
    },
    addProfileImageStyle: {
        width: 100, elevation: 4, height: 100,
        borderRadius: 100, backgroundColor: '#fff',
    },
    inputContainer: {
        height: 46,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f8',
        marginTop: 20
    },
    input: {
        padding: 10,
        paddingLeft: 18,
        flex: 1,
        fontSize: 14,
        fontFamily: 'lucida grande',
        color: '#dcdcdc',
        justifyContent: 'center',
        alignItems: 'center',
        color: COLORS.black,
    },
});


const ErrorBlock = ({ text }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="exclamationcircle" size={13} color={"red"} />
            <View style={{ width: 4 }} />
            <Text style={{ color: 'red', fontSize: 12 }}>{text}</Text>
        </View>
    );
}

