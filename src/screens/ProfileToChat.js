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
import {useSelector,useDispatch} from "react-redux"
const ProfileToChat = ({navigation, route}) => {
  const {logged_in_user_details}=useSelector
  //   const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [userData, setUserData] = useState({});
  const [messageId, setMessageId] = useState(null);
  //   const [currUserData, setcurrUserData] = useState({});
  const {currUser, secondPerson} = route.params;
  console.log('\t>>>>>>>>>>>\n\n', route.params);
  const socket = io(`${BACKEND}`);

  useEffect(() => {
    console.log(
      '>>>>>>>>>>>>> PARAMETER IN CHAT SCREEN\n\n\n ',
      route.params,
      '\n\n\n >>>>>>>>>>>>>>>>>>',
    );

    // (async () => {
    //   try {
    //     const {data} = await axios.get(
    //       `${BACKEND}/chat/message_id/${currUser._id}/${secondPerson._id}`,
    //     );
    //     setMessage(data.messages);
    //     setMessageId(data.messageId);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // })();
    fetchMessage();

    // setUserData(route.params.item);
    // checkMessageId();
    // fetchMessage();
  }, []);

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
  const checkMessageId = () => {
    try {
      const {chat} = route.params.currUser;
      //   const findIt = await chat.find(item => item.secondPerson == userData._id);
      const findIt = chat.map(item => {
        if (item.secondPerson == userData._id) {
          Alert.alert('find id');
          setMessage(item.message);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMessage = async () => {
    try {
      //   const msgId = await checkMessageId();
      // checkMessageId();
      //   Alert.alert(`Fetched id msg ${msgId} 72`);
      if (messageId != null) {
        const {data} = await axios.get(
          //   `${BACKEND}/message/all/${findIt.message}`,
          `${BACKEND}/message/all/${messageId}`,
        );

        if (data.success) {
          // setMessage(data);
          console.log(
            'message from backend>>>>>>>>>>>>>\n\n',
            data.messages.message,
            '<<<<<<<<, this is data',
          );
          setMessage(data.messages.message);
        } else {
          Alert.alert('Error while fetching messages !!!');
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  // socket.on('messageFromOne', data => {
  //   // setChatMessage([...ChatMessage, data.message]);
  //   console.log(data, '<<<< data form message from one');
  // });
  const onSend = async message => {
    Alert.alert(messageId);

    try {
      socket.emit('OneToOneChat', {
        messageId,
        message,
      });

      Alert.alert('sending in api');
      const dataToSend = {
        firstPerson: route.params.currUser._id,
        secondPerson: secondPerson._id,
        message_id: messageId,
        message: {
          receiver_id: secondPerson._id,
          sender_id: route.params.currUser._id,
          text: 'First Message from akshay',
        },
      };
      const {data} = await axios.post(`${BACKEND}/message/send`, dataToSend);
      console.log(data, '<<<<<<<<<< MEssge from back');
      Alert.alert(data.msg);
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

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const renderInputToolbar = props => {
    return (
      <View style={{paddingBottom: 40, marginTop: -24}}>
        <CustomInputComponent
          placeholderText="State"
          iconType={require('../../assets/images/send.png')}
          //   headingText="State"
          labelValue={message}
          onChangeText={val => {
            setMessage(val);
          }}
          message={true}
          {...props}
        />
        <View style={{height: 40}} />
      </View>
    );
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
      <View>
        {(() => {
          return message?.map((item, key) => {
            console.log(item.sender_id, '\t', route.params.currUser._id);
            if (item.sender_id == route.params.currUser._id) {
              return (
                <View
                  style={{
                    backgroundColor: 'green',
                    // width: '80%',
                    // alignItems: 'center',
                  }}>
                  <CustomTextComponent
                    text={` Show this in right`}
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
                    text={` Show this in left`}
                    fw="400"
                    fs={20}
                    color={'#000'}
                  />
                </View>
              );
            }
          });
        })()}
      </View>
      {/* <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        textInputStyle={{color: '#000'}}
        renderBubble={renderBubble}
        alwaysShowSend
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      /> */}
      <TouchableOpacity>
        <CustomButtonComponent
          textColor={'#fff'}
          bw={0}
          bgColor={'maroon'}
          fw="normal"
          text="Send Message dds"
          fs={14}
          width="100%"
          height={50}
          br={8}
          bc={'#000'}
          onPress={() => {
            onSend('Message from akshay');
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileToChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
