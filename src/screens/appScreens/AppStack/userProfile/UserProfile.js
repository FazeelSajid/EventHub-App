import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../../../constants/colors/COLORS'; 
import CustomHeader from '../../../../components/CustomHeader';
import { fonts } from '../../../../assets/fonts/fonts';
import CustomButton from '../../../../components/customButton';
import CustomTabView from '../../../../components/CustomTabView';
import { events } from '../../../../utils/Data';
import SearchCard from '../../../../components/SearchCard';
import ArrowLeft from '../../../../assets/svgs/arrowLeft.svg'; // Assuming the CustomTabView is located here
import Star from '../../../../assets/svgs/star.svg';
import Follow from '../../../../assets/svgs/follow.svg';
import ChatBlue from '../../../../assets/svgs/chatBlue.svg';
import ThreeDots from '../../../../assets/svgs/threeDots.svg';
import PopUp from '../../../../components/PopUp';

const UserProfile = ({navigation, route}) => {

  const {organizer} = route.params
  const [PopUpMesage, setPopUpMesage] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showRemovePopUp, setShowRemovePopUp] = useState(false);
  const [popUpHeading, setPopUpHeading] = useState('');
  const [isfollowing, setIsFollowing] = useState(false);


const handleFollow = (organizerName) =>{
  if (isfollowing) {
    setIsFollowing(false);
    setPopUpMesage(`You stopped following ${organizerName}  `);
    setPopUpHeading('Unfollowed')
    setShowRemovePopUp(true);
  }else{
    setIsFollowing(true);
    setPopUpMesage(`You started following ${organizerName}  `);
    setPopUpHeading('Followed')
    setShowPopUp(true);
  }

  setTimeout(() => {
    setShowPopUp(false);
    setShowRemovePopUp(false);
  }, 3000);
}
  
  const routes = [
    { key: 'about', title: 'ABOUT' },
    { key: 'event', title: 'EVENT' },
    { key: 'reviews', title: 'REVIEW' },
  ];



  const renderScene = useCallback(({ route }) => {
    console.log('Rendering route:', route.key);

    switch (route.key) {
      case 'about':
        return   <View style={{flex: 1, paddingTop: hp(2)}}>
            <Text style={styles.aboutText}>
              Enjoy your favorite dish and a lovely your friends and family and have
              a great time. Food from local food trucks will be available for
              purchase.<Text style={styles.readMoreText}>Read More</Text>
            </Text>
          </View>
        
      case 'event':
        return (
          <FlatList
          contentContainerStyle={{paddingHorizontal: wp(3)}}
            data={events}
            renderItem={({ item, index }) => (
                <SearchCard key={index} event={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        );
      case 'reviews':
        return (
          <FlatList
            data={[
              { name: 'Rocks Velkeijnen', date: '10 Feb', review: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.' },
              { name: 'Angelina Zolly', date: '10 Feb', review: 'Cinemas is the ultimate experience to see new movies in Gold Class or Vmax. Find a cinema near you.' }
            ]}
            contentContainerStyle = {{marginTop: hp(3)}}
            renderItem={({ item }) => (
                <View   style={styles.notificationItem}>
                <View style={styles.notificationInfo}>
                  <View style={{flexDirection: 'row'}} >
            
                <Image source={{uri: 'https://randomuser.me/api/portraits/men/3.jpg'}} style={styles.NotificationprofileImage} />
                <View>

                <Text style={styles.notificationName}>{item.name}  </Text>    
                    <View style={{flexDirection: 'row',marginVertical: hp(1) }} >

                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    <Star/>
                    </View>
                  <Text style={styles.notificationMessage}>
                    {item.review}
                  </Text>
                </View>
                  </View>
                </View>
                <Text style={styles.notificationTime}>{item.date}</Text>
             
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        );
      default:
        return null
    }
  },[])

  return (
    <View style={styles.container}>
      <CustomHeader
        containerStyle={{justifyContent: 'space-between', alignItems: 'center', marginLeft: wp(4), marginTop: wp(4)}}
        // rightSvg={<ThreeDots/>}
        leftSvg={<ArrowLeft/>}
        leftOnpress={()=> navigation.goBack()}
        headingStyle={{color: COLORS.blackTxtColor, fontFamily: fonts.medium, fontSize: wp(5), marginRight: wp(4)}}
      />
       {showPopUp && (
          <PopUp
            color={COLORS.green}
            heading={popUpHeading}
            message={PopUpMesage}
          />
        )}
      {showRemovePopUp && (
          <PopUp
            color={COLORS.redishColor}
            heading={popUpHeading}
            message={PopUpMesage}
          />
        )}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: organizer.image }} // Replace with actual image URL
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>{organizer.name}</Text>
        <View style={styles.followInfo}>
          <View>
            <Text style={styles.followHeading}>350</Text>
            <Text style={styles.followText}>Following</Text>
          </View>
          <View style={styles.separator} />
          <View>
            <Text style={styles.followHeading}>346</Text>
            <Text style={styles.followText}>Followers</Text>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <CustomButton
            text={isfollowing ? '  Following' : '  Follow'}
            containerStyle={styles.followButton}
            textStyle={styles.followButtonText}
            onPress={()=>handleFollow(organizer.name)}
            svg={isfollowing ? null :<Follow/>}
          />
          <CustomButton
            text={'  Messages'}
            containerStyle={styles.messageButton}
            textStyle={styles.messageButtonText}
            onPress={() => navigation.navigate('Chat',{organizer: organizer})}
            svg={<ChatBlue/>}

          />
        </View>

        {/* Use CustomTabView for tab navigation */}
      </View>
        <CustomTabView routes={routes} renderScene={renderScene} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: hp('3%'),
    paddingBottom: hp('1%'),
  },
  profileImage: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
    marginBottom: hp('1%'),
  },
  nameText: {
    fontSize: hp('2.5%'),
    marginBottom: hp('2%'),
    color: COLORS.blackTxtColor,
    fontFamily: fonts.bold,
  },
  followInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('50%'),
    marginBottom: hp('3%'),
  },
  followText: {
    fontSize: hp('1.8%'),
    color: COLORS.mediumGray,
    textAlign: 'center',
    fontFamily: fonts.medium,
  },
  followHeading: {
    fontSize: hp('2%'),
    color: COLORS.blackTxtColor,
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
  separator: {
    height: hp(5),
    backgroundColor: COLORS.darkGray,
    width: wp(0.3),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: wp('80%'),
    marginBottom: hp('2%'),
  },
  followButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('7%'),
  },
  followButtonText: {
    color: COLORS.white,
    fontFamily: fonts.medium,
    fontSize: hp('2%'),
  },
  messageButton: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
  },
  messageButtonText: {
    color: COLORS.primary,
    fontFamily: fonts.medium,
    fontSize: hp('2%'),
  },
  aboutText: {
    fontSize: hp('2%'),
    color: COLORS.blackTxtColor,
    paddingHorizontal: wp('7%'),
    textAlign: 'left',
    fontFamily: fonts.regular,
    lineHeight: hp(3.3),
  },
  readMoreText: {
    color: '#1E90FF',
    fontSize: hp('2%'),
  },
  eventItem: {
    padding: hp('2%'),
    marginVertical: hp('1%'),
    marginHorizontal: wp('5%'),
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
  },
  eventTitle: {
    fontSize: hp('2.2%'),
    fontFamily: fonts.medium,
    color: COLORS.blackTxtColor,
  },
  eventDate: {
    fontSize: hp('2%'),
    fontFamily: fonts.regular,
    color: COLORS.mediumGray,
  },
  reviewItem: {
    padding: hp('2%'),
    marginVertical: hp('1%'),
    marginHorizontal: wp('5%'),
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
  },
  reviewerName: {
    fontSize: hp('2.2%'),
    fontFamily: fonts.bold,
    color: COLORS.blackTxtColor,
  },
  reviewDate: {
    fontSize: hp('1.8%'),
    fontFamily: fonts.regular,
    color: COLORS.mediumGray,
  },
  reviewText: {
    fontSize: hp('2%'),
    fontFamily: fonts.regular,
    color: COLORS.blackTxtColor,
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
  NotificationprofileImage: {
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
    color: COLORS.blackTxtColor,
    fontFamily: fonts.regular,
    marginBottom: hp('1%'),
    // marginLeft: hp('1%'),
    width: wp(80),
    lineHeight: hp(3)
  },
  notificationTime: {
    fontSize: wp('3.5%'),
    color: COLORS.blackLogoColor,
    marginLeft: wp('2%'),
    alignSelf: 'flex-start'
  },
});

export default UserProfile;
