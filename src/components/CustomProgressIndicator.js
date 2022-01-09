import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { SIZES } from '../Constants/theme'

export default function CustomProgressIndicator() {
    return (
        <View style={{
            width: '100%', height: SIZES.height / 3, justifyContent: 'center', alignItems: 'center'
        }}>
            <ActivityIndicator />
        </View>
    )
}
