import React from 'react';
import { View, Text } from 'react-native';

export default function CustomTextComponent({ text, fs, fw, color, textAlign, lineHeight }) {
    return (
        <Text style={{ fontSize: fs, fontWeight: fw, color: color, textAlign: textAlign, lineHeight: lineHeight }}>
            {text}
        </Text>
    )
}
