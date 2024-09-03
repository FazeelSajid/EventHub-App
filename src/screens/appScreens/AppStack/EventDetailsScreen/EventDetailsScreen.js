import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../../../constants/colors/COLORS';
import { fonts } from '../../../../assets/fonts/fonts';
import CustomHeader from '../../../../components/CustomHeader';
import CustomButton from '../../../../components/customButton';
import LinearGradient from 'react-native-linear-gradient';
import ArrowLeft from '../../../../assets/svgs/arrowLeftWhite.svg';
import FilledBookmark from '../../../../assets/svgs/whiteBookmark.svg';
import Bookmark from '../../../../assets/svgs/bookmark.svg';
import Calendar from '../../../../assets/svgs/eventCalender.svg';
import Location from '../../../../assets/svgs/Location.svg';
import ButtonArrow from '../../../../assets/svgs/buttonArrow.svg';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import InviteFriends from '../../../../components/Invite';
import { inviteFriendsData } from '../../../../utils/Data';
import useApp from '../../../../redux-toolkit/StateHooks/useApp';
import PopUp from '../../../../components/PopUp';


const EventDetailsScreen = ({ route, navigation }) => {
  const event = route.params?.event;

  const { Bookmarks, addBookmarks, removeBookmarks} = useApp()

  const bottomSheetRef = useRef(null);
  const [isFav, setIsFav] = useState()
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

  const changeFavorite = (item) => {
    const existingItem = Bookmarks.find((event) => event.id === item.id);
  
    if (existingItem) {
      // If the item already exists, remove it and toggle the isFavorite property
      removeBookmarks(item.id);
      setIsFav(false)
      setPopUpMesage(`${existingItem.title} removed from your Bookmark`);
      setPopUpHeading('Bookmark removed')
      setShowRemovePopUp(true);
    } else {
      // If the item doesn't exist, add it and set it as a favorite
      addBookmarks({ ...item, isFavorite: true });
      
      setIsFav(true)
      setShowPopUp(true);
      setPopUpMesage(`${item.title} added to your Bookmark`);
      setPopUpHeading('Bookmark Added')
    }
  
    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowPopUp(false);
      setShowRemovePopUp(false);
    }, 3000);
  };


  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);


  const checkIfFavorite = (id, favArray) => {
    return favArray && favArray?.some(fav => fav.id === id);
  };

  useEffect(()=>{
    setIsFav(checkIfFavorite(event.id, Bookmarks ))
  },[])

  const handleInvite = (selectedFriends) => {
    console.log('Selected friends:', selectedFriends);
    // Handle the invite action
  };

  return (
    <BottomSheetModalProvider>

    <ScrollView style={styles.container}>
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
      {/* Header */}
      <View style={styles.header}>
        <Image source={event.image} style={styles.headerImage} />
     

        <CustomHeader
        leftSvg={<ArrowLeft width={wp(6)} height={hp(3)} />}
        leftOnpress={() => navigation.goBack()}
        heading={"  Event Details"}
        headingStyle={styles.headerText}
        containerStyle={styles.headerOverlay}
        secondRightSvg={isFav ? <FilledBookmark width={wp(6)} height={wp(6)} />: <Bookmark width={wp(6)} height={wp(6)} />}
        secondBtnContainerStyle={{
          justifyContent: 'flex-end',
          flexGrow: 1,
          // flexDirection: 'row',
          alignItems: 'flex-end',
        }}
        secondRightOnPress={()=>changeFavorite(event)}
      />
      </View>

      {/* Event Info */}
      <View style={styles.infoContainer}>
        <View style={styles.attendees}>
          {event?.attendees?.map((attendee, index) => (
            <View    style={[styles.attendeeImage, { marginLeft: index > 0 ? wp(-3) : 0 }]}>
            {attendee.image}
            </View>
            
            // <Image
            //   key={index}
            //   source={{ uri: attendee.image }}
            //   style={[styles.attendeeImage, { marginLeft: index > 0 ? wp(-2) : 0 }]}
            // />
          ))}
          <Text style={styles.attendeesText}>{` +${event.attendees.length} Going`}</Text>
        </View>
        <CustomButton
          containerStyle={styles.inviteButton}
          text={'Invite'}
          textStyle={styles.inviteText}
          onPress={handlePresentModalPress}
        />
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.eventTitle}>{event?.title}</Text>

        <EventInfoRow icon={<Calendar width={wp(10)} height={hp(6)} />} text1={event?.date} text2={event?.time} />
        <EventInfoRow icon={<Location width={wp(10)} height={hp(6)} />} text1={event?.location} text2={event?.street} />

        <View style={[styles.infoRow, { marginTop: wp(3) }]}>
          <Image source={{ uri: event?.organizer?.image }} style={styles.organizerImage} />
          <View style={styles.organizerInfo}>
            <TouchableOpacity onPress={()=> navigation.navigate('UserProfile', {organizer: event?.organizer})} >
              <Text style={styles.organizerName}>{event?.organizer?.name}</Text>
              <Text style={styles.eventDatenLocation}>Organizer</Text>
            </TouchableOpacity>
            <CustomButton
              containerStyle={styles.followButton}
              text={isfollowing ? 'Following' :'Follow'}
              textStyle={styles.followText}
              onPress={()=> handleFollow(event?.organizer?.name)}
            />
          </View>
        </View>

        {/* About Event */}
        <LinearGradient colors={['rgba(255, 255, 255, 0)', `${COLORS.white}10`]} >
          <Text style={styles.sectionTitle}>About Event</Text>
          <Text style={styles.aboutText}>{event?.description}</Text>
        </LinearGradient>
      </View>

      {/* Buy Ticket Button */}
      <View style={{
        backgroundColor: `${COLORS.white}90`,
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center'
      }} > 
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>{`BUY TICKET $ ${event?.ticketPrice}`}</Text>
        <View style={styles.ButtonArrowLogo}>
          <ButtonArrow width={wp(8)} height={wp(7)} />
        </View>
      </TouchableOpacity>
      </View>
      <InviteFriends friends={inviteFriendsData} onInvite={handleInvite} bottomSheetRef={bottomSheetRef} />

   
    </ScrollView>
    </BottomSheetModalProvider>

  );
};

const EventInfoRow = ({ icon, text1, text2 }) => (
  <View style={styles.infoRow}>
    {icon}
    <View>
      <Text style={styles.infoText}>{text1}</Text>
      <Text style={[styles.eventDatenLocation, {marginLeft: wp(3)}]}>{text2}</Text>
    </View>
  </View>
);

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    // width: '100%',
    height: hp('30%'),
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    // justifyContent: 'space-between',
    padding: wp('5%'),
    paddingTop: wp('9%'),
    alignItems: 'flex-start',
  },
  bookmarkStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    opacity: 5,
  },
  headerText: {
    color: COLORS.white,
    fontSize: wp('6%'),
    fontFamily: fonts.medium,
    textAlign: 'center',
  }, 

  infoContainer: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    position: 'absolute',
    top: hp('26.5%'),
    width: wp('80%'),
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: wp(13),
    elevation: wp(8),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  attendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeeImage: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: `${COLORS.primary}30`,
  },
  attendeesText: {
    color: COLORS.primary,
    fontFamily: fonts.medium,
  },
  inviteButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('3%'),
  },
  inviteText: {
    color: COLORS.white,
    fontSize: wp('4%'),
  },
  contentContainer: {
    paddingHorizontal: wp('7%'),
    paddingVertical: hp('6%'),
  },
  eventTitle: {
    fontSize: wp('9%'),
    marginBottom: hp('2%'),
    color: COLORS.blackColor,
    fontFamily: fonts.regular,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  infoText: {
    fontSize: wp('4%'),
    marginLeft: wp('3%'),
    color: COLORS.blackColor,
    fontFamily: fonts.medium,
  },
  eventDatenLocation: {
    fontSize: wp('3%'),
    // marginLeft: wp('3%'),
    marginTop: wp('1.5%'),
    color: COLORS.darkGray,
    fontFamily: fonts.medium,
  },
  organizerImage: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('2.5%'),
  },
  organizerInfo: {
    marginLeft: wp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    alignItems: 'center',
  },
  organizerName: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: COLORS.blackColor,
  },
  followButton: {
    backgroundColor: `${COLORS.primary}20`,
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
    marginTop: hp('0.5%'),
  },
  followText: {
    fontSize: wp('4%'),
    color: COLORS.primary,
    fontFamily: fonts.medium,
  },
  sectionTitle: {
    fontSize: wp('5%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    color: COLORS.blackTxtColor,
    fontFamily: fonts.bold,
  },
  aboutText: {
    fontSize: wp('4%'),
    color: COLORS.blackTxtColor,
    fontFamily: fonts.regular,
    lineHeight: wp(7),
  },
  buyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    borderRadius: wp('3%'),
    marginBottom: hp('1.5%'),
    width: wp(70),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  buyButtonText: {
    color: COLORS.white,
    fontSize: wp('4%'),
    fontFamily: fonts.medium,
  },
  ButtonArrowLogo: { position: 'absolute', right: 10, bottom: 15 },
});
