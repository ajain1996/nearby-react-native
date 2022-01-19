import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import Entypo from 'react-native-vector-icons/AntDesign';
import { COLORS, SIZES } from '../Constants/theme';
import CustomTextComponent from './CustomTextComponent';

const CustomInputComponent = ({ labelValue, showPassword, setShowPassword, secureTextEntry, placeholderText, iconType, passwordIcon, value, headingText, error, onPress, long, message, ...rest }) => {
    return (
        !long ? <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <CustomTextComponent fs={13} textColor={COLORS.darkgray} fw="600" text={headingText} />
                <CustomTextComponent fs={13} textColor={"red"} fw="600" text={error} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    defaultValue={labelValue}
                    style={styles.input}
                    numberOfLines={1}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholderText}
                    placeholderTextColor="silver"
                    {...rest}
                />
                {!message
                    ? <TouchableOpacity style={styles.iconStyle} activeOpacity={1} onPress={onPress}>
                        <Image
                            source={iconType}
                            style={{ width: 20, height: 20, tintColor: 'silver' }}
                        />
                    </TouchableOpacity>
                    : <View style={{
                        justifyContent: 'center', alignItems: 'center', marginTop: 6, paddingRight: 12
                    }}>
                        <TouchableOpacity style={styles.messageBtnStyle} activeOpacity={0.7} onPress={onPress}>
                            <Image
                                source={iconType}
                                style={{ width: 16, height: 16, tintColor: '#fff' }}
                            />
                        </TouchableOpacity>
                    </View>}
            </View>
        </View>
            : <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <CustomTextComponent fs={13} textColor={COLORS.darkgray} fw="600" text={headingText} />
                    <CustomTextComponent fs={13} textColor={"red"} fw="600" text={error} />
                </View>
                <View style={[styles.inputContainer, { height: 120, alignItems: 'flex-start' }]}>
                    <TextInput
                        defaultValue={labelValue}
                        style={[styles.input, { marginTop: -8 }]}
                        numberOfLines={3}
                        secureTextEntry={secureTextEntry}
                        placeholder={placeholderText}
                        placeholderTextColor="silver"
                        {...rest}
                    />
                    <Image
                        source={iconType}
                        style={{ width: 20, height: 20, tintColor: 'silver' }}
                    />
                </View>
            </View>
    );
};

export default CustomInputComponent;

const styles = StyleSheet.create({
    inputContainer: {
        height: 46,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },
    messageBtnStyle: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: 35,
        backgroundColor: '#4001CA',
        borderRadius: 100,
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
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: SIZES.width / 1.5,
        height: 42,
        fontSize: 16,
        fontFamily: 'lucida grande',
        borderRadius: 8,
        borderWidth: 1,
    },
});