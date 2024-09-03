import {SafeAreaView, StatusBar, StyleSheet, View, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import ChatHeader from './Components/ChatHeader';
import {COLORS} from '../../../../constants/colors/COLORS';
import CustomButton from '../../../../components/customButton';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts} from '../../../../assets/fonts/fonts';
import TxtInput from '../../../../components/TxtInput';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Chat = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);
  const [isEmoji, setIsEmoji] = useState(false);
  const [inputText, setInputText] = useState('');
  const {organizer} = route.params;
  const [senderId, setSenderId] = useState(10);
  const [senderName, setSenderName] = useState('Fazeel');
  const [senderImg, setSenderImg] = useState('https://randomuser.me/api/portraits/men/18.jpg');
  const [receiverId, setReceiverId] = useState(organizer.id);
  const [receiverName, setReceiverName] = useState(organizer.name);
  const [receiverImg, setReceiverImg] = useState(organizer.image);

  const handleToggle = () => {
    setSenderId(prevSenderId => prevSenderId === 10 ? receiverId : 10);
    setSenderName(prevSenderName => prevSenderName === 'Fazeel' ? receiverName : 'Fazeel');
    setReceiverId(prevReceiverId => prevReceiverId === organizer.id ? 10 : organizer.id);
    setReceiverName(prevReceiverName => prevReceiverName === organizer.name ? 'Fazeel' : organizer.name);
  };

  const logCurrentTime = () => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedTime = `${hours}:${paddedMinutes} ${ampm}`;
    return formattedTime;
  };
  useEffect(() => {
    const chatRef = database()
      .ref(`chats/${senderId}/${receiverId}`)
      .orderByChild('createdAt');

    const handleSnapshot = snapshot => {
      const messagesFirebase = snapshot.val();
      if (messagesFirebase) {
        const messagesArray = Object.keys(messagesFirebase).map(key => ({
          _id: key,
          ...messagesFirebase[key],
        }));

        messagesArray.sort((a, b) => b.createdAt - a.createdAt);
        setMessages(messagesArray);

        // Mark all messages as read for the receiver
        messagesArray.forEach(message => {
          database()
            .ref(`chats/${receiverId}/${senderId}/${message._id}`)
            .update({read: true})
            .catch(error =>
              console.error(
                `Error updating received status for message ${message._id}:`,
                error,
              ),
            );
        });

        // Clear unread messages for the sender
        const unreadMessagesRef = database().ref(
          `users/${senderId}/${receiverId}/unreadMessages`,
        );
        unreadMessagesRef
          .set(null)
          .catch(error =>
            console.error(
              `Error clearing unread messages for user ${receiverId} under ${senderId}:`,
              error,
            ),
          );
      }
    };

    chatRef.on('value', handleSnapshot);

    return () => chatRef.off('value', handleSnapshot);
  }, [receiverId]);

  const updateUserLastMessage = async (
    userId,
    otherUserId,
    otherUserName,
    otherUserImg,
    message,
    isReceiver,
  ) => {
    const userRef = database().ref(`/users/${userId}/${otherUserId}`);
    const snapshot = await userRef.once('value');
    const userExists = snapshot.exists();

    if (userExists) {
      const existingData = snapshot.val();
      let unreadMessages = existingData.unreadMessages || [];

      if (isReceiver) {
        unreadMessages.push(message);
      }

      await userRef.update({
        lastMessage: message,
        read: !isReceiver, // Mark as read if the user is not the receiver
        unreadMessages: isReceiver ? unreadMessages : existingData.unreadMessages,
        exist: true,
      });
    } else {
      const userObject = {
        id: otherUserId,
        name: otherUserName,
        avatar: otherUserImg,
        lastMessage: message,
        read: !isReceiver,
        unreadMessages: isReceiver ? [message] : [],
        exist: false,
      };

      await userRef.set(userObject);
    }

    return userExists;
  };

  const updateUser = async (userId, otherUserId, otherUserName) => {
    const userRef = database().ref(`/users/${userId}/${otherUserId}`);
    const snapshot = await userRef.once('value');
    const userExists = snapshot.exists();

    if (!userExists) {
      const userObject = {
        id: otherUserId,
        name: otherUserName,
        avatar: otherUserImg,
        exist: false,
      };

      await userRef.set(userObject);
    } else {
      await userRef.update({exist: true});
    }

    return userExists;
  };

  const checkAndAddUser = async (
    senderId,
    receiverId,
    senderName,
    receiverName,
    senderImg, 
    receiverImg,
    message,
  ) => {
    await updateUserLastMessage(
      receiverId,
      senderId,
      senderName,
      senderImg,
      message,
      true,
    ); // Update receiver

    await updateUserLastMessage(
      senderId,
      receiverId,
      receiverName,
      receiverImg,
      message,
      false,
    ); // Update sender
    await updateUser(senderId, receiverId, receiverName);
  };

  const handleSend = async () => {
    // console.log('Sending message...');

    if (inputText.trim().length > 0) {
      const messageId = database().ref().push().key;

      const message = {
        _id: messageId,
        text: inputText.trim(),
        createdAt: new Date().getTime(),
        sent: false,
        received: false,
        pending: true,
        read: false,
        user: {
          _id: senderId,
        },
      };
      // console.log(message, 'message');

      const ReceiverMessage = {
        _id: messageId,
        text: inputText.trim(),
        createdAt: new Date().getTime(),
        user: {
          _id: senderId,
        },
      };

      console.log(new Date().getTime(), 'time');
      

      const senderMessageRef = database().ref(
        `chats/${senderId}/${receiverId}/${messageId}`,
      );
      const receiverMessageRef = database().ref(
        `chats/${receiverId}/${senderId}/${messageId}`,
      );

      try {
        await senderMessageRef.set(message); // Send message from sender
        await senderMessageRef.update({pending: false, sent: true}); // Update sender message status
        await receiverMessageRef.set(ReceiverMessage); // Send message to receiver

        await checkAndAddUser(
          senderId,
          receiverId,
          senderName,
          receiverName,
          senderImg, 
          receiverImg,
          {text: inputText.trim(),createdAt: logCurrentTime(new Date().getTime())},
        );

        setInputText(''); // Clear the input text
      } catch (error) {
        console.error('Error sending message: ', error);
      }
    }
  };

  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: styles.rightBubble,
        left: styles.leftBubble,
      }}
      textStyle={{
        right: styles.rightText,
        left: styles.leftText,
      }}
      renderTicks={() => renderTicks(props.currentMessage)}
      renderUsername={() => null}
    />
  );

  const renderTicks = message => {
    if (message.read && message.received) {
      return <Icon name="check-all" size={12} color={COLORS.white} />;
    } else if (message.received) {
      return <Icon name="check-all" size={12} color={COLORS.white} />;
    } else if (message.sent) {
      return <Icon name="check" size={12} color={COLORS.white} />;
    } else if (message.pending) {
      return <Icon name="clock-outline" size={12} color={COLORS.white}/>;
    }
    return null;
  };
  // console.log(organizer);
  

  const renderInputToolbar = props => (
    <View style={styles.inputContainer}>
      <TxtInput
        style={{flexGrow: 1}}
        rightIcon={'keyboard'}
        rightIconSize={wp(8)}
        rightIconColor={COLORS.darkGray}
        rightIconPress={handleToggle}
        placeholder={'Type a message'}
        placeholderTextColor={COLORS.darkGray}
        value={inputText}
        onChangeText={txt => setInputText(txt)}
        multiline={true}
      />
      <View>
        <CustomButton
          onPress={handleSend}
          containerStyle={styles.iconContainer}
          icon={'send'}
          iconSize={wp(7)}
          iconColor={COLORS.primary}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <ChatHeader
        name={receiverName}
        left={'chevron-left'}
        iconSize={35}
        leftIconColor={COLORS.white}
        leftOnpress={() => navigation.goBack()}
        rightOnPress={() =>navigation.navigate('audioCall')}
        img={organizer.image}
        onNamePress={() => navigation.navigate('UserProfile', {organizer: organizer})}
      />

      <GiftedChat
        messages={messages}
        user={{_id: senderId, name: senderName}}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderTicks={renderTicks}
        renderAvatar={() => null}
        showAvatarForEveryMessage={true}
      />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // paddingHorizontal: wp(3),
    flex: 1,
    paddingBottom: wp(6),
  },
  rightBubble: {
    backgroundColor: COLORS.primary,
    borderRadius: wp('3%'),
    marginBottom: wp('3%'),
    padding: wp('2%'),
  },
  leftBubble: {
    backgroundColor: COLORS.lightGrayColor,
    borderRadius: wp('3%'),
    marginBottom: wp('3%'),
    padding: wp('2%'),
  },
  rightText: {
    color: COLORS.white,
    fontSize: wp('4%'),
    fontFamily: fonts.regular,
  },
  leftText: {
    color: COLORS.blackColor,
    fontSize: wp('4%'),
    fontFamily: fonts.regular,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    paddingVertical: wp(2),
    backgroundColor: `${COLORS.primary}50`,
    borderRadius: wp('2%'),
    marginHorizontal: wp(3),
    paddingHorizontal: wp(3),
  },
});
