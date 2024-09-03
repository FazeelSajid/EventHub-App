import {Image, StatusBar, StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../../../config/COLORS';
import CustomHeader from '../../../../components/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {imgs} from '../../../../assets/Imgs/Img';
import {fonts} from '../../../../../config/Fonts';
import CustomButton from '../../../../components/CustomButton';
import useApp from '../../../../hooks/useApp';
import database from '@react-native-firebase/database';

const MessageRequest = ({navigation}) => {
  const {globalState, setState, User} = useApp()

  const [userId, setUserId] = useState(User.id);
  const [userName, setUserName] = useState(globalState.name);
  const [userImg, setUserImg] = useState(globalState.img);
  const [receiverId, setReceiverId] = useState(globalState.id);

  const getProfilebyId = (profileId, name) => {
    setState({id: profileId, name: name});
    navigation.navigate('userDetails')
  };

  const unReadMsgPress = () => {
    const usersRef = database().ref(`/users/${userId}/${receiverId}`);
    usersRef.update({ exist: true });
    navigation.navigate('chat');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
      />

      <CustomHeader
        left={'chevron-left'}
        iconSize={wp(10)}
        leftIconColor={COLORS.blackTxtColor}
        leftOnpress={() => navigation.goBack()}
      />
      <Text style={styles.Heading}>{`${userName} sent you a message`}</Text>
      <Text style={styles.subHeading}>Your and sahara profile matches 80% </Text>
      <View style={styles.imgContainer}>
        <View style={styles.imgWrapper}>
          <Image source={{uri: userImg}} style={styles.img} resizeMode="cover" />
        </View>
        <CustomButton
            text={'See Profile'}
            textStyle={styles.SeeDetailsBtnTxtStyle}
            containerStyle={[styles.SeeDetailsBtnContainer]}
            pressedRadius={wp('5%')}
            onPress={()=> getProfilebyId(receiverId, userName)}
          />
      </View>
      <View style={styles.BtnsContainer}>
        
          <CustomButton
            text={'Reject'}
            textStyle={styles.BtntextStyle}
            containerStyle={[styles.btnContainer,  {backgroundColor: '#F5BF0333'}]}
            pressedRadius={wp('5%')}
            onPress={() => navigation.goBack()}
          />
          <CustomButton
             text={'Accept'}
             textStyle={[styles.BtntextStyle, {color: COLORS.blackTxtColor}]}
             containerStyle={[styles.btnContainer,  {backgroundColor: COLORS.primary1}]}
            pressedRadius={wp('5%')}
            onPress={unReadMsgPress}
          />
      </View>

   
    </View>
  );
};

export default MessageRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: wp(7),
    paddingHorizontal: wp(5),
    backgroundColor: COLORS.primary2
  },
  Heading:{
    fontFamily: fonts.SemiBold,
    fontSize: wp(7),
    color: COLORS.blackTxtColor,
    paddingTop: wp(3),
    paddingBottom: wp(4.5),
    textAlign: 'center'
  },
  subHeading:{
    fontFamily: fonts.Regular,
    fontSize: wp(4),
    color: COLORS.darkGrayColor,
    // paddingTop: wp(3),
    // paddingBottom: wp(3),
    textAlign: 'center'
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  BtntextStyle:{
    fontFamily: fonts.Regular,
    fontSize: wp(3.5),
    color: COLORS.primary1,
  },
  SeeDetailsBtnTxtStyle:{
    fontFamily: fonts.SemiBold,
    fontSize: wp(4),
    color: COLORS.blackTxtColor,
    textDecorationLine: 'underline'
  },
  imgWrapper: {
    overflow: 'hidden',
    borderRadius: wp(100),
    width: wp(50),
    height: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5BF034D',
  },
  img: {
    width: wp(45),
    height: wp(49.5),
    resizeMode: 'cover',
    // borderRadisus: wp(100),
    // borderColor: '#F5BF034D',
    // borderWidth: wp(2),
  },
  name: {
    fontFamily: fonts.Medium,
    fontSize: wp(5),
    color: COLORS.white,
    paddingTop: hp('1.5%'),
  },
  btnContainer: {
    paddingVertical: wp('3%'),
    borderRadius: wp('3%'),
    marginTop: wp('4%'),
    marginBottom: wp('5%'),
    paddingHorizontal: wp('12%'),
  },
  SeeDetailsBtnContainer: {
    paddingVertical: wp('3%'),
    borderRadius: wp('3%'),
    marginTop: wp('4%'),
    marginBottom: wp('5%'),
  },
  BtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: wp(10),
    alignItems: 'center',
    paddingHorizontal: wp(7),
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: wp(5),

    // alignItems: 'center',
  },
  overlayText: {
    color: COLORS.white,
    fontSize: wp(5),
    fontFamily: fonts.Regular,
  },
});
