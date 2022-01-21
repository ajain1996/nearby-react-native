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
import {Bubble, GiftedChat, Message, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomInputComponent from '../components/CustomInputComponent';
import CustomTextComponent from '../components/CustomTextComponent';
import axios from 'axios';
import CustomButtonComponent from '../components/CustomButtonComponent';
import {Center} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';

const ChatScreen = ({navigation, route}) => {
  //   const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [userData, setUserData] = useState({});
  //   const [messageId, setMessageId] = useState(null);
  //   const [currUserData, setcurrUserData] = useState({});
  const {messageId, currUser, secondPerson} = route.params;
  console.log('\t>>>>>>>>>>>\n\n', route.params);

  useEffect(() => {
    console.log(
      '>>>>>>>>>>>>> PARAMETER IN CHAT SCREEN\n\n\n ',
      route.params,
      '\n\n\n >>>>>>>>>>>>>>>>>>',
    );
    setUserData(route.params.item);
    // checkMessageId();
    fetchMessage();
  }, []);

  const checkMessageId = () => {
    try {
      const {chat} = route.params.currUser;
      //   const findIt = await chat.find(item => item.secondPerson == userData._id);
      const findIt = chat.map(item => {
        if (item.secondPerson == userData._id) {
          Alert.alert('find id');
          setMessageId(item.message);
        }
      });

      //   return findIt;
      //   Alert.alert(`message ${findIt} 46`);
      //   //   const findIt = chat.find(item => item.secondPerson == '001');
      //   if (findIt != undefined) {
      //     Alert.alert(`message not undefined`);
      //     Alert.alert('messageid');
      //     setMessageId(findIt.message);
      //     return findIt.message;
      //   } else {
      //     Alert.alert('undefined 54');
      //     return null;
      //   }
    } catch (e) {
      console.log(e);
    }

    // console.log(
    //   '\n\n>>>>>>>>>> chats>>>\n\n',
    //   findIt,
    //   '\n\n<<<<<<<<<<< chat \t\t',
    //   findIt,
    // );
  };

  const fetchMessage = async () => {
    try {
      //   const msgId = await checkMessageId();
      //   checkMessageId();
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

  const onSend = async message => {
    try {
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
      console.log(
        '>>>>>>>>\n\n\n',
        data,
        '\n\n\n<<<<< after sending dta ato back',
      );
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
          marginBottom: 15,
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
            if (item.sender_id == route.params.currUser._id) {
              return (
                <View style={{marginHorizontal: 5}}>
                  <LinearGradient
                    colors={['#0073ff', '#0022ff']}
                    style={{
                      // backgroundColor: 'green',
                      // width: '80%',
                      alignSelf: 'flex-end',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      paddingVertical: 2,
                      // borderRadius: 30
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                      // borderBottomLeftRadius: 30,
                    }}>
                    <CustomTextComponent
                      text={` Show this in right`}
                      fw="500"
                      fs={17}
                      color={'#f7f7f7'}
                    />
                  </LinearGradient>
                  <View
                    style={{
                      alignSelf: 'flex-end',
                      width: 167.5,
                      marginBottom: 6,
                      backgroundColor: 'blue',
                      marginHorizontal: 0.2,
                      paddingHorizontal: 4,
                      paddingBottom: 4,
                      borderBottomRightRadius: 15,
                      borderBottomLeftRadius: 15,
                    }}>
                    <CustomTextComponent
                      text={`15 Jan 12:00`}
                      fw="400"
                      fs={12}
                      textAlign="right"
                      color={'rgba(255,255,255,0.5)'}
                    />
                  </View>
                </View>
              );
            } else {
              return (
                <View style={{marginHorizontal: 5}}>
                  <LinearGradient
                    colors={['#fff', 'lightgrey']}
                    style={{
                      alignSelf: 'flex-start',
                      paddingHorizontal: 15,
                      paddingVertical: 5,
                      paddingVertical: 2,
                      // borderRadius: 30
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                      // borderBottomLeftRadius: 30,
                    }}>
                    <CustomTextComponent
                      text={` Show this in right`}
                      fw="500"
                      fs={17}
                      color={'#000'}
                    />
                  </LinearGradient>
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      width: 167.5,
                      marginBottom: 6,
                      backgroundColor: '#d9d9d9',
                      marginHorizontal: 0.2,
                      paddingHorizontal: 4,
                      paddingBottom: 4,
                      borderBottomRightRadius: 15,
                      borderBottomLeftRadius: 15,
                    }}>
                    <CustomTextComponent
                      text={`15 Jan 12:00`}
                      fw="400"
                      fs={12}
                      textAlign="right"
                      color={'rgba(0,0,0,0.4)'}
                    />
                  </View>
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
      <TouchableOpacity style={{marginTop: 25}}>
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
          onPress={() => {
            onSend('Message from akshay');
          }}
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
