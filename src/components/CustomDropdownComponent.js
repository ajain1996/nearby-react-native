import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown';
import CustomTextComponent from './CustomTextComponent';

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const CustomDropdownComponent = (text, listData, width, height, icon, onChange, selectedVal) => {
    return (
        <View>
            {/* <Text style={{ fontSize: 12.2, color: 'silver', position: 'absolute', left: 20 }}>Your selectedVal</Text> */}
            <SelectDropdown
                data={listData}
                buttonStyle={{
                    width: width ? width : "45%", borderWidth: width ? 0 : 1, height: height ? height : 40,
                    borderColor: width ? "#fff" : 'grey', borderRadius: 8, backgroundColor: '#f5f5f8',
                    flexDirection: 'row', alignItems: 'center',
                }}
                defaultButtonText={text !== null ? text : "Select an option"}
                buttonTextStyle={{
                    fontWeight: 'normal', fontSize: 13, color: selectedVal.length > 0 ? "#000" : 'silver',
                    // marginLeft: width ? selectedVal.length > 0 ? -windowWidth / 1.48 : -windowWidth / 1.8 : 0,
                    position: 'absolute', left: 12
                }}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    onChange(selectedItem);
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
                            style={{
                                width: 10, height: 10, right: 20,
                                tintColor: icon ? 'silver' : "grey",
                                position: 'absolute',
                            }}
                        />
                    );
                }}
                dropdownIconPosition="right"
            />
        </View>
    );
}
