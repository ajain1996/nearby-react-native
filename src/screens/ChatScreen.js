import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {BACKEND} from '../Constants/ASYNC_STORAGE';
import io from 'socket.io-client';

import {Bubble, GiftedChat, Message, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomInputComponent from '../components/CustomInputComponent';
import CustomTextComponent from '../components/CustomTextComponent';
import axios from 'axios';
import CustomButtonComponent from '../components/CustomButtonComponent';
import {Center} from 'native-base';
import {useSelector} from 'react-redux';

const ChatScreen = ({navigation, route}) => {
  const [allMessages, setallMessages] = useState([]);
  const [userData, setUserData] = useState({});
  const {messageId, currUser, secondPerson} = route.params;
  const {logged_in_user_detail} = useState(state => state);
  const socket = io(`${BACKEND}`);

  useEffect(() => {
    // console.log(
    //   '>>>>>>>>>>>>> PARAMETER IN CHAT SCREEN\n\n\n ',
    //   route.params,
    //   '\n\n\n >>>>>>>>>>>>>>>>>>',
    // );
    setUserData(route.params.item);
    // checkMessageId();
    fetchMessage();
  }, []);

  const checkMessageId = () => {
    try {
      const {chat} = route.params.currUser;
      //   const findIt = await chat.find(item => item.secondPerson == userData._id);
      // const findIt = chat.map(item => {
      //   if (item.secondPerson == userData._id) {
      //     Alert.alert('find id');
      //     // setMessageId(item.message);
      //   }
      // });
    } catch (e) {
      console.log(e);
    }
  };
  socket.on('initialMessage', data => {
    console.log('\n\n\n\n\ninitial message \n\n>>>>>', data, '\n\n');
    // setChatMessage(data);
    
    setallMessages(data.message);
  });

  const fetchMessage = async () => {
    try {
      socket.emit('getPrivatePreviousChat', {
        messageId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onSend = async () => {
    try {
      // Alert.alert('sending in api');
      const dataToSend = {
        firstPerson: route.params.currUser._id,
        secondPerson: secondPerson._id,
        messageId: messageId,
        message: {
          receiver_id: secondPerson._id,
          sender_id: route.params.currUser._id,
          text: '325',
        },
      };
      socket.emit('OneToOneChat', dataToSend);
      // Alert.alert(data.msg);
    } catch (e) {
      console.log(e);
    }
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
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
  socket.on('messageFromOne', data => {
    console.log(
      '\n\n\n\n\n\n\n\n',
      data.message.message,
      '\n\n\n\n<<<<<< data form  from one>>>',
      // allMessages[0],
    );
    setallMessages([...allMessages, data.message.message]);
    // allMessages.push(data.message.message);
    console.log(allMessages, '<<<< ALl messages');
    // setallMessages([...allMessages, data.message.message]);
  });
  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          height: 52,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          elevation: 4,
          backgroundColor: '#fff',
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{width: 18, height: 18, borderRadius: 100, marginRight: 8}}
            />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/profile.png')}
            style={{
              width: 36,
              height: 36,
              borderRadius: 100,
              marginHorizontal: 8,
            }}
          />
          <View style={{marginLeft: 8}} />
          <CustomTextComponent
            text={secondPerson?.userName}
            fw="600"
            fs={18}
            color={'#000'}
          />
        </View>
        <View></View>
      </View>
      <ScrollView>
        {(() => {
          return allMessages?.map((item, key) => {
            // console.log(item.sender_id, '\t', route.params.currUser._id);
            if (item.sender_id == route.params.currUser._id) {
              return (
                <View
                  key={key}
                  style={{
                    backgroundColor: 'yellow',
                    // width: '40%',

                    maxWidth: '50%',
                    marginTop: 3,
                    borderRadius: 20,
                    padding: 7,
                    // justifyContent: 'end',
                    // alignItems: 'end',
                  }}>
                  <CustomTextComponent
                    text={item.text}
                    fw="400"
                    fs={20}
                    color={'#000'}
                  />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    backgroundColor: 'green',
                    width: '20%',
                    // alignItems: 'center',
                  }}>
                  <CustomTextComponent
                    text={item.text}
                    fw="400"
                    fs={20}
                    color={'#000'}
                  />
                </View>
              );
            }
          });
        })()}
      </ScrollView>

      <TouchableOpacity>
        <CustomButtonComponent
          textColor={'#fff'}
          bw={0}
          bgColor={'maroon'}
          fw="normal"
          text="Send Message"
          fs={14}
          width="100%"
          height={50}
          br={8}
          bc={'#000'}
          onPress={onSend}
        />
      </TouchableOpacity>
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
