import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../../components/customButton';
import {COLORS} from '../../../../constants/colors/COLORS';
import {fonts} from '../../../../assets/fonts/fonts';
import { AppStyles } from '../../../../utils/Styles';
import CustomHeader from '../../../../components/CustomHeader';
import ArrowLeft from '../../../../assets/svgs/arrowLeft.svg';
import ThreeDots from '../../../../assets/svgs/threeDots.svg';
import Artwork from '../../../../assets/svgs/Artwork.svg';
import PopUp from '../../../../components/PopUp';

const Notification = ({navigation}) => {
  const [notifications, setNotifications] = useState([
    // Example notifications with image URLs
    {
      id: '1',
      name: 'David Silva',
      message: "Invite Jo Malone London's Mother's",
      time: 'Just now',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      type: 'invite'
    },
    {
      id: '2',
      name: 'Joan Baker',
      message: "Invite A virtual Evening of Smooth Jazz",
      time: 'Just now',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      type: 'invite'
    },
    {
      id: '3',
      name: 'Adnan Saif',
      message: 'Started following you',
      time: '5 min ago',
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: '4',
      name: 'Ronald C. Kinch',
      message: 'Likes your events',
      time: '20 min ago',
      image: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
      id: '5',
      name: 'Clara Tolson',
      message: 'Join your Event Gala Music Festival',
      time: '1 hr ago',
      image: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    // Add more notifications as needed
  ]);

  const [showPopUp, setShowPopUp] = useState(false)
  const [showRejectPopUp, setShowRejectPopUp] = useState(false)
  const [PopUpMesage, setPopUpMesage] = useState()

  const handleAccept = item => {
    setNotifications(
      notifications.filter(notification => notification.id !== item.id),
    );
    setShowPopUp(true)
    setPopUpMesage(` You accepted ${item.name}'s invitation`)
    setTimeout(()=>{
      setShowPopUp(false)
    }, 1000)
  };

  const handleReject = item => {
    setNotifications(
      notifications.filter(notification => notification.id !== item.id),
    );
    setShowRejectPopUp(true)
    setPopUpMesage(` You accepted ${item.name}'s invitation`)
    setTimeout(()=>{
      setShowRejectPopUp(false)
    }, 1000)
  };

  const renderItem = ({item}) => (
    item.type === 'invite' ?
    <View style={styles.notificationItem}>
      <View style={styles.notificationInfo}>
        <View style={{flexDirection: 'row'}} >

      <Image source={{uri: item.image}} style={styles.profileImage} />

        <Text style={styles.notificationMessage}>
          <Text style={styles.notificationName}>{item.name} </Text>
          {item.message}
        </Text>
        </View>
        <View style={styles.notificationActions}>
          <CustomButton
            text={'Reject'}
            textStyle={styles.buttonTextReject}
            containerStyle={styles.rejectButton}
            onPress={() => handleReject(item)}
          />
          <CustomButton
            text={'Accept'}
            textStyle={styles.buttonTextAccept}
            containerStyle={styles.acceptButton}
            onPress={() => handleAccept(item)}
          />
        </View>
      </View>
      <Text style={styles.notificationTime}>{item.time}</Text>
   
    </View>
    : <TouchableOpacity style={styles.notificationItem}>
    <View style={styles.notificationInfo}>
      <View style={{flexDirection: 'row'}} >

    <Image source={{uri: item.image}} style={styles.profileImage} />

      <Text style={styles.notificationMessage}>
        <Text style={styles.notificationName}>{item.name}  </Text>
        {item.message}
      </Text>
      </View>
    </View>
    <Text style={styles.notificationTime}>{item.time}</Text>
 
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        leftSvg={<ArrowLeft width={wp(6)} height={hp(3)} />}
        leftOnpress={() => navigation.goBack()}
        heading={"Notifications"}
        headingStyle={AppStyles.headingTextStyle}
        containerStyle={styles.headerContainerStyle}
        secondRightSvg={<ThreeDots width={wp(6)} height={wp(6)} />}
        secondBtnContainerStyle={{
          justifyContent: 'flex-end',
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      />
      { showPopUp && <PopUp color={COLORS.primary} heading={'Invite Accepted'} message={PopUpMesage} />}
      { showRejectPopUp && <PopUp color={COLORS.primary} heading={'Invite Rejected'} message={PopUpMesage} />}
      
      {notifications.length === 0 ? (
        <View style={styles.emptyState}>
          <Artwork  />
          <Text style={styles.emptyText}>No Notifications Yet!</Text>
          
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: COLORS.white,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  emptySubText: {
    fontSize: wp('4%'),
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: wp('10%'),
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('0.9%'),
    paddingHorizontal: wp('3%'),
    // backgroundColor: '#f9f9f9',
    // borderRadius: wp('2%'),
    // marginBottom: hp('1%'),
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // elevation: 2,
  },
  profileImage: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    marginRight: wp('3%'),
  },
  notificationInfo: {
    flex: 1,
  },
  notificationName: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: COLORS.blackLogoColor,
    fontFamily: fonts.medium,
    // marginRight: wp(5)
  },
  notificationMessage: {
    fontSize: wp('4%'),
    color: COLORS.blackLogoColor,
    fontFamily: fonts.regular,
    marginBottom: hp('1%'),
    marginLeft: hp('1%'),
    width: wp(51),
    lineHeight: hp(3)
  },
  notificationActions: {
    flexDirection: 'row',
    marginTop: hp('1%'),
    marginLeft: wp('15%'),
    // flexGrow: 1,
    // justifyContent: 'space-evenly'
  },
  acceptButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('1%'),
    marginLeft: wp('3%'),
    
  },
  rejectButton: {
    // backgroundColor: '#E0E0E0',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('7%'),
    borderRadius: wp('2%'),
    borderColor: '#706D6D',
    borderWidth: wp(0.1),
  },
  buttonTextAccept: {
    color: '#fff',
    fontFamily: fonts.regular,
    fontSize: wp('4%'),
    
  },
  buttonTextReject: {
    color: '#706D6D',
    fontFamily: fonts.regular,
    fontSize: wp('4%'),
  },
  notificationTime: {
    fontSize: wp('3.5%'),
    color: COLORS.blackLogoColor,
    marginLeft: wp('2%'),
    alignSelf: 'flex-start'
  },
  headerContainerStyle: {
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingTop: wp(10),
    marginBottom: wp(3),
  },
});
