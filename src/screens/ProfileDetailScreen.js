import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import CustomTextComponent from '../components/CustomTextComponent';
import { HeaderComponent } from './HomeScreen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomButtonComponent from '../components/CustomButtonComponent';

export default function ProfileDetailScreen({ navigation }) {

    return (
        <View>
            <ScrollView style={{ height: "90%" }}>
                <HeaderComponent />

                <View style={{ marginTop: 10 }} />
                {renderProfileInfoComponent()}

                <View style={{ marginTop: 10 }} />
                <View style={{ elevation: 4, shadowColor: '#999', backgroundColor: '#fff' }}>
                    <View style={{ width: '100%', paddingHorizontal: 20, paddingVertical: 16 }}>
                        <CustomTextComponent
                            text={"About Me"} fw="500"
                            fs={22} color={"#000"}
                        />
                        <View style={{ height: 5 }} />
                        <CustomTextComponent
                            text={"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum. ✌️"} fw="300"
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
                        text="Nearby Users" fs={14} width="100%" height={50} br={8}
                        bc={"#000"} onPress={() => { navigation.navigate("Tabs") }}
                    />
                </View>
            </View>
        </View>
    )
}


const renderProfileInfoComponent = () => {
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
                            text={"Meghna"} fw="500"
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

