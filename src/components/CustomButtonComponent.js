import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomTextComponent from './CustomTextComponent';

export default function CustomButtonComponent({
    width, height, bw, bc, br, btlr, btrr, bblr, bbrr,
    text, fs, fw, textColor, onPress, bgColors
}) {
    return (
        <LinearGradient colors={bgColors ? ["#fff", "#fff"] : ["#0073ff", "blue"]} style={{
            borderRadius: br, borderTopLeftRadius: btlr, borderTopRightRadius: btrr, borderWidth: bw,
            borderBottomLeftRadius: bblr, borderBottomRightRadius: bbrr, borderColor: bc, width: width,
            height: height, justifyContent: 'center', alignItems: 'center', elevation: 20, shadowColor: '#999',
        }}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={{
                width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
            }}>
                <CustomTextComponent
                    text={text}
                    fs={fs} fw={fw} color={textColor}
                />
            </TouchableOpacity>
        </LinearGradient>
    )
}
