import React, { useContext, useState } from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Image
} from "react-native";


const CustomSearchComponent = ({ title, icon, width, height, numberOfLines, bgHeight }) => {
    return (
        <View style={[styles.searchContainer, { height: bgHeight }]}>
            <TextInput
                style={styles.searchInput}
                onChangeText={(text) => { }}
                placeholder={title ? title : "Search by doctor name or location"}
                placeholderTextColor={"silver"}
                numberOfLines={numberOfLines ? numberOfLines : 1}
                multiline={true}
            />
            {icon
                ? <Image
                    source={icon}
                    style={[styles.singleIcon, { width: width, height: height }]}
                />
                : <></>}
        </View>
    );
};

export default CustomSearchComponent;

const styles = StyleSheet.create({
    searchInput: {
        backgroundColor: "#fff",
        color: "black", width: "100%", paddingLeft: 24,
        borderRadius: 10,
        marginHorizontal: 7
    },
    searchContainer: {
        flexDirection: 'row', alignItems: 'center',
        borderRadius: 10, marginTop: 10,
        elevation: 8, shadowColor: '#999',
        overflow: 'hidden',
    },
    singleIcon: {
        width: 28, height: 28, position: 'absolute',
        tintColor: "#000", right: 20
    },
});