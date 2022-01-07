import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomInputComponent from '../components/CustomInputComponent';
import CustomTextComponent from '../components/CustomTextComponent';

const ChatScreen = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'Hello world',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages),
        );
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                        name="send-circle"
                        style={{ marginBottom: 5, marginRight: 5 }}
                        size={32}
                        color="#2e64e5"
                    />
                </View>
            </Send>
        );
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#2e64e5',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#fff',
                    },
                }}
            />
        );
    };

    const scrollToBottomComponent = () => {
        return (
            <FontAwesome name='angle-double-down' size={22} color='#333' />
        );
    }

    const renderInputToolbar = (props) => {
        return (
            <View style={{ paddingBottom: 40, marginTop: -24 }}>
                <CustomInputComponent
                    placeholderText="State"
                    iconType={require("../../assets/images/send.png")}
                    headingText="State"
                    labelValue={message}
                    onChangeText={(val) => {
                        setMessage(val);
                    }}
                    message={true}
                    {...props}
                />
                <View style={{ height: 40 }} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{
                height: 52, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', elevation: 4, backgroundColor: '#fff', paddingHorizontal: 20
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Image
                            source={require("../../assets/images/arrow.png")}
                            style={{ width: 18, height: 18, borderRadius: 100, marginRight: 8 }}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require("../../assets/images/profile.png")}
                        style={{ width: 36, height: 36, borderRadius: 100, marginHorizontal: 8 }}
                    />
                    <View style={{ marginLeft: 8 }} />
                    <CustomTextComponent
                        text={"John Doe"} fw="600"
                        fs={18} color={"#000"}
                    />
                </View>
                <View></View>
            </View>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
                textInputStyle={{ color: '#000' }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderInputToolbar={renderInputToolbar}
                renderSend={renderSend}
                scrollToBottom
                scrollToBottomComponent={scrollToBottomComponent}
            />
        </View>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});