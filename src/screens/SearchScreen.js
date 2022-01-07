import { Card } from 'native-base';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import CustomSearchComponent from '../components/CustomSearchComponent';

export default function SearchScreen() {
    return (
        <ScrollView style={{ backgroundColor: '#f7f8f9' }}>
            <View style={{ paddingHorizontal: 0, marginTop: -10 }}>
                <Card style={{ height: '100%', elevation: 5, shadowColor: '#fff' }}>
                    <CustomSearchComponent
                        title="Search By Username or Name"
                        icon={require("../../assets/images/search-icon.png")}
                        width={20} height={20}
                        bgHeight={50}
                    />
                </Card>
            </View>
        </ScrollView>
    )
}
