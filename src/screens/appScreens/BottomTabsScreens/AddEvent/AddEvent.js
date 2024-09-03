import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Svg from '../../../../assets/svgs/svg';
import BlueCalendar from '../../../../assets/svgs/eventCalender.svg';
import GallerySvg from '../../../../assets/svgs/GallerySvg.svg';
import Location from '../../../../assets/svgs/Location.svg';
import InvitePeople from '../../../../assets/svgs/InvitePeople.svg';
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {COLORS} from '../../../../constants/colors/COLORS';
import {fonts} from '../../../../assets/fonts/fonts';
import AddDescription from '../../../../assets/svgs/AddDescription.svg';
import TxtInput from '../../../../components/TxtInput';
import CustomButton from '../../../../components/customButton';
import {AppStyles, ComponentsStyle} from '../../../../utils/Styles';
import {FlatList} from 'react-native-gesture-handler';
import {filterCategories, inviteFriendsData} from '../../../../utils/Data';
import {
  FilterCategoryItem,
  FilterSection,
} from '../Explore/Components/FilterCategoryItem';
import PhotoUpload from '../../../../components/PhotoUpload';
import {Images} from '../../../../assets/Images/Images';
import Calendar from '../../../../assets/svgs/eventCalender.svg';
import EditIcon from '../../../../assets/svgs/editIcon.svg';
import Attendee1 from '../../../../assets/svgs/attendee1.svg';
import Attendee2 from '../../../../assets/svgs/attendee2.svg';
import Attendee3 from '../../../../assets/svgs/attendee3.svg';
import InviteFriends from '../../../../components/Invite';
import { useNavigation } from '@react-navigation/native';

// import Location from '../../../../assets/svgs/Location.svg';

const EventInfoRow = ({icon, text1, text2}) => (
  <View style={styles.infoRow}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {icon}
      <View>
        <Text style={styles.infoText}>{text1}</Text>
        <Text style={styles.eventDatenLocation}>{text2}</Text>
      </View>
    </View>
    <CustomButton
      svg={<EditIcon width={wp(4)} />}
      text={' Change'}
      containerStyle={{
        backgroundColor: `${COLORS.primary}30`,
        borderRadius: wp(5),
        paddingVertical: hp('1%'),
        paddingHorizontal: hp('2%'),
        // alignItems: 'center',
        // justifyContent: 'space-between',
      }}
      textStyle={{color: COLORS.primary, fontSize: wp(3)}}
    />
  </View>
);
const AddEvent = ({bottomSheetRef}) => {
  const snapPoints = useMemo(() => [hp('30%'), hp('90%')], []);
  const previewSnapPoints = useMemo(() => [hp('30%'), hp('90%')], []);
  const photoSnapPoints = useMemo(() => [hp('17%'), hp('17%')], []);
  const photoSheetRef = useRef();
  const InviteSheetRef = useRef();
  const previewEventSheetRef = useRef();
  const [image, setImage] = useState();
  const navigation = useNavigation()


  // useEffect(()=>{
  //   bottomSheetRef.current?.present();
  // })

  const attendees = [
    {image: <Attendee1 />}, // Replace with actual user image URLs
    {image: <Attendee2 />},
    {image: <Attendee3 />},
  ];

  // const bottomSheetRef = useRef(null);

  const [newEvent, setNewEvent] = useState({
    selectedCategories: [],
    priceRange: '',
    selectedDate: new Date(),
    location: 'New York, USA',
    selectedTime: '', // 'Today', 'Tomorrow', 'This week', or ''
  });
  const handleCategorySelect = useCallback(index => {
    setNewEvent(prevFilters => ({
      ...prevFilters,
      selectedCategories: prevFilters.selectedCategories.includes(index)
        ? prevFilters.selectedCategories.filter(i => i !== index)
        : [...prevFilters.selectedCategories, index],
    }));
  }, []);

  const handleCloseCreateEventModalPress = () => {
    bottomSheetRef.current?.dismiss();
  };
  const handleClosePhotoModalPress = () => {
    bottomSheetRef.current?.dismiss();
  };
  const handlePresentPhotoModalPress = useCallback(() => {
    photoSheetRef.current?.present();
  }, []);
  const handleClosePreviewModalPress = () => {
    previewEventSheetRef.current?.dismiss();
  };
  const handlePresentInviteModalPress = useCallback(() => {
    InviteSheetRef.current?.present();
  }, []);
  const handlePresentPreviewModalPress = useCallback(() => {
    previewEventSheetRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7} // Adjust backdrop opacity
        appearsOnIndex={0} // Index at which the backdrop appears
        disappearsOnIndex={-1} // Index at which the backdrop disappears
      />
    ),
    []
  );
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        backdropComponent={renderBackdrop}
        >
        {/* <PhotoUpload/> */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.header}>Create New Event</Text>

            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                handlePresentPreviewModalPress();
                handleCloseCreateEventModalPress();
              }}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>

          {/* <FilterSection label="Categories"> */}
          <FlatList
            data={filterCategories}
            renderItem={({item, index}) => (
              <FilterCategoryItem
                key={index}
                item={item}
                index={index}
                isSelected={newEvent.selectedCategories.includes(index)}
                onSelect={handleCategorySelect}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          {/* </FilterSection> */}

          <TextInput
            style={styles.titleInput}
            multiline={true}
            placeholder="Add title"
            placeholderTextColor={COLORS.darkGray}
            selectionColor={`${COLORS.primary}60`}
          />

          <TxtInput
            svg={<AddDescription />}
            multiline={true}
            placeholder="Add description"
            placeholderTextColor={COLORS.darkGray}
            selectableColor={`${COLORS.primary}60`}
          />

          <MenuItem
            svg={<GallerySvg />}
            label="Add cover photo"
            onPress={handlePresentPhotoModalPress}
          />
          <MenuItem svg={<BlueCalendar />} label="Date and time" onPress={() =>navigation.navigate('Calender')} />
          <MenuItem svg={<Location />} label="Add location" onPress={() =>{
            handleCloseCreateEventModalPress() 
            navigation.navigate('Map')
            }} />
          <MenuItem
            svg={<InvitePeople />}
            label="Invite people"
            onPress={handlePresentInviteModalPress}
          />
        </View>
      </BottomSheetModal>

      <BottomSheetModal
        ref={photoSheetRef}
        index={0}
        snapPoints={photoSnapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        backdropComponent={renderBackdrop}
        >
        <PhotoUpload
          toggleModal={handleClosePhotoModalPress}
          setPhoto={setImage}
        />
      </BottomSheetModal>
      
        <InviteFriends
          friends={inviteFriendsData}
          
          bottomSheetRef={InviteSheetRef}
        />
      

      <BottomSheetModal
        ref={previewEventSheetRef}
        index={0}
        snapPoints={previewSnapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        backdropComponent={renderBackdrop}
        >
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={styles.header}>Create New Event</Text>

            <CustomButton
              text={'Post Now'}
              containerStyle={styles.postBtn}
              textStyle={{color: COLORS.white}}
              onPress={handleClosePreviewModalPress}
            />
          </View>

          {/* <View style={styles.contentContainer}> */}
          <Image source={Images.upcomingEvent2} style={styles.headerImage} />
          <Text style={styles.eventTitle}>
            International Band Music Concert
          </Text>
          <Text style={styles.aboutText}>
            Enjoy your favorite dish and a lovely time with friends and family.
            Local food trucks will be available for provisions. Enjoy your
            favorite dish and a lovely time with friends and family. Local food
            trucks will be available for provisions.
          </Text>

          <EventInfoRow
            icon={<Calendar width={wp(10)} height={hp(6)} />}
            text1={'14 December, 2021'}
            text2={'Tuesday, 4:00PM - 9:00PM'}
          />
          <EventInfoRow
            icon={<Location width={wp(10)} height={hp(6)} />}
            text1={'Gola Convention'}
            text2={'36 street London, UK'}
          />
          <View style={styles.infoRow}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <InvitePeople />

              <View
                style={[
                  ComponentsStyle.eventCardAttendeesContainer,
                  {marginLeft: wp(5)},
                ]}>
                {attendees.map((attendee, index) => (
                  <View
                    style={[
                      ComponentsStyle.eventCardAttendeeImage,
                      {zIndex: index},
                    ]}
                    key={index}>
                    {attendee.image}
                  </View>

                  // <Image
                  //   key={index}
                  //   source={{uri: attendee.image}}
                  //   style={[ComponentsStyle.eventCardAttendeeImage, {zIndex: index}]}
                  // />
                ))}
                <Text
                  style={
                    ComponentsStyle.eventCardAttendeeCount
                  }>{`+ ${attendees.length} Going`}</Text>
              </View>
            </View>

            <CustomButton
              text={' Invite'}
              containerStyle={{
                backgroundColor: `${COLORS.primary}30`,
                borderRadius: wp(5),
                paddingVertical: hp('1%'),
                paddingHorizontal: hp('2%'),
                // alignItems: 'center',
                // justifyContent: 'space-between',
              }}
              textStyle={{color: COLORS.primary, fontSize: wp(4)}}
              onPress={handlePresentInviteModalPress}
            />
          </View>
        </View>
        {/* </View> */}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const MenuItem = ({svg, label, onPress}) => (
  <TouchableOpacity onPress={onPress} style={styles.menuItem}>
    {svg}
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    // padding: wp('5%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    width: wp('90%'),
    alignSelf: 'center',
  },
  headerImage: {
    width: wp(90),
    height: hp(20),
    resizeMode: 'cover',
    borderRadius: wp(4),
  },
  aboutText: {
    fontSize: wp('4%'),
    color: COLORS.blackTxtColor,
    fontFamily: fonts.regular,
    lineHeight: wp(7),
    marginBottom: hp('2%'),
  },
  bottomSheetBackground: {
    borderRadius: wp(10),
    backgroundColor: COLORS.white,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  header: {
    fontSize: hp('3%'),
    fontFamily: fonts.bold,
    // marginBottom: hp('2%'),
    color: COLORS.blackTxtColor,
  },
  nextButton: {
    // position: 'absolute',
    // right: wp('5%'),
    // top: hp('2%'),
    backgroundColor: '#ddd',
    borderRadius: wp(5),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('2%'),
  },
  nextButtonText: {
    fontSize: hp('2%'),
    color: '#888',
  },
  postBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: wp(5),
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('2%'),
    // height: hp(4.5),
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  titleInput: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    fontSize: hp('4%'),
    // marginVertical: hp('2%'),
    fontFamily: fonts.regular,
  },
  descriptionButton: {
    marginBottom: hp('2%'),
  },
  descriptionText: {
    color: '#888',
    fontSize: hp('2%'),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  icon: {
    width: hp('3%'),
    height: hp('3%'),
    marginRight: wp('3%'),
  },
  menuLabel: {
    fontSize: hp('2.2%'),
    fontFamily: fonts.regular,
    marginLeft: wp('4%'),
    color: COLORS.blackTxtColor,
  },
  //

  contentContainer: {
    // paddingHorizontal: wp('7%'),
    // paddingVertical: hp('6%'),
  },
  eventTitle: {
    fontSize: wp('8%'),
    marginBottom: hp('2%'),
    color: COLORS.blackColor,
    fontFamily: fonts.medium,
    lineHeight: wp(11),
    marginTop: hp('1%'),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: wp('4%'),
    marginLeft: wp('3%'),
    color: COLORS.blackColor,
    fontFamily: fonts.medium,
  },
  eventDatenLocation: {
    fontSize: wp('3%'),
    marginLeft: wp('3%'),
    marginTop: wp('1.5%'),
    color: COLORS.darkGray,
    fontFamily: fonts.medium,
  },
});

export default AddEvent;
