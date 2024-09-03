import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../../../../components/customButton';
import { COLORS } from '../../../../constants/colors/COLORS';
import { fonts } from '../../../../assets/fonts/fonts';
import { EventsCategories, ProfileEventsCategories } from '../../../../utils/Data';
import CustomHeader from '../../../../components/CustomHeader';
import ArrowLeft from '../../../../assets/svgs/arrowLeft.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import PhotoUpload from '../../../../components/PhotoUpload';


const EditProfile = ({navigation}) => {
  const [editName, setEditName] = useState("Ashfak Sayem")
  const [editAbout, setEditAbout] = useState(" Enjoy your favorite dish and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.")
  const [filteredArray, setFilteredArray] = useState([])
  const [image, setImage] = useState()
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [hp('17%'), hp('17%')], []);
  const [currentIntrests, setCurrentIntrests] = useState([
      {
        title: 'Gaming Online',
        color: COLORS.primary,
      },
        {
          title: 'Concert',
          color: '#EE544A',
        },
        {
          title: 'Music',
          color: '#F59762',
        },
        {
          title: 'Art',
          color: '#7D67EE',
        },
        {
          title: 'Movie',
          color: '#29D697',
        },
      ])

      useEffect(()=>{
        setFilteredArray(
          currentIntrests.filter(
            item1 => !ProfileEventsCategories.some(item2 => item2.title === item1.title)
          ).concat(
            ProfileEventsCategories.filter(
              item2 => !currentIntrests.some(item1 => item1.title === item2.title)
            )
          )
        )
      },[])

      const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
      }, []);
      const handleCloseModalPress = () => {
        bottomSheetRef.current?.dismiss();
      };
    
     
      const addIntrest = (obj) =>{
       setFilteredArray (filteredArray.filter(item => item.title !== obj.title))
        setCurrentIntrests([...currentIntrests, obj])
        console.log(obj);
        
      }
      const removeIntrest = (obj) =>{
       setCurrentIntrests(currentIntrests.filter(item => item.title !== obj.title))
        setFilteredArray([...filteredArray, obj])
        console.log(obj);
        
      }
      
      console.log(image);
      

      
  return (
    <BottomSheetModalProvider>

    <ScrollView style={styles.container}>
        <CustomHeader
        containerStyle={{justifyContent: 'space-between', alignItems: 'center', marginLeft: wp(4)}}
        heading={'Edit Profile'}
        leftSvg={<ArrowLeft/>}
        leftOnpress={()=> navigation.goBack()}
        headingStyle={{color: COLORS.blackTxtColor, fontFamily: fonts.medium, fontSize: wp(5), marginRight: wp(4)}}
        />
      <View style={styles.profileContainer}>
        {image?  <Image
          source={{uri: image}} 
          style={styles.profileImage}
          />: <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/3.jpg' }} 
          style={styles.profileImage}
          />}
        
       
        <CustomButton icon={'camera'} iconColor={COLORS.primary} iconSize={wp(5)} containerStyle={styles.changeButton} onPress={handlePresentModalPress} />
       
        <Text style={styles.aboutHeading}>Edit your name</Text>
        <TextInput style={styles.input} value={editName} onChangeText={setEditName} />
    
        <Text style={styles.aboutHeading}>Edit your about info</Text>
        <TextInput
          style={[styles.input, styles.aboutInput]}
          multiline
          numberOfLines={4}
          value={editAbout}
          onChangeText={setEditAbout}
          
        />
        <Text style={styles.aboutHeading}>Edit your interest</Text>
        <View style={styles.interestContainer}>
          <View style={styles.interests}>
            {currentIntrests.map((item, index) => (
              <View
              key={index}
              style={[styles.interestItem, { backgroundColor: item.color }]}
              >
              <TouchableOpacity style={[styles.iconContainer, { backgroundColor: `${COLORS.white}90` }]} onPress={()=> removeIntrest(item)} >
                <Icon name={'close'} size={wp(4)} color={COLORS.darkGray}   />
              </TouchableOpacity>
              <Text style={styles.interestText}>{item.title}</Text>
            </View>
            ))}
          </View>
          <View style={{width: wp(80), height: hp(0.1) , backgroundColor: COLORS.darkGray}} />
          <View style={[styles.interests, {paddingTop: wp(5)}]}>
            {filteredArray.map((item, index) => (
              <View
              key={index}
              style={[styles.interestItem, { backgroundColor: item.color }]}
              >
              <TouchableOpacity style={[styles.iconContainer, { backgroundColor: `${COLORS.white}90` }]} onPress={()=> addIntrest(item)  } >
                <Icon name={'plus'} size={wp(4)} color={COLORS.darkGray}   />
              </TouchableOpacity>
              <Text style={styles.interestText}>{item.title}</Text>
            </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
    <BottomSheetModal
     ref={bottomSheetRef}
     index={0}
     snapPoints={snapPoints}
     backgroundStyle={styles.bottomSheetBackground}
    >
      <PhotoUpload toggleModal={handleCloseModalPress} setPhoto={setImage} />

    </BottomSheetModal>
            </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: hp('5%'),
  },
  profileImage: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
    marginBottom: hp('2%'),
  },
  changeButton: {
    position: 'absolute',
    top: hp(15),
    right: wp(37),
    borderRadius: wp(10),
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('1%'),
    marginBottom: hp('3%'),
    borderWidth: wp('0.3%'),
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white
  },
  changeButtonText: {
    fontSize: hp('2%'),
    color: COLORS.primary,
  },
  aboutHeading: {
    alignSelf: 'flex-start',
    color: COLORS.blackTxtColor,
    textAlign: 'left',
    fontFamily: fonts.medium,
    marginBottom: hp('1.5%'),
    fontSize: wp(5),
    marginLeft: wp(7),
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: wp(0.3),
    width: wp('80%'),
    fontSize: hp('2.2%'),
    marginBottom: hp('2%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    color:COLORS.blackColor,
    fontFamily: fonts.regular,
    borderRadius: wp(4)
  },
  aboutInput: {
    height: hp('17%'),
    textAlignVertical: 'top',
  },
  followInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('50%'),
    marginBottom: hp('3%'),
  },
  followHeding: {
    fontSize: hp('2%'),
    color: COLORS.blackTxtColor,
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
  followText: {
    fontSize: hp('2%'),
    color: COLORS.mediumGray,
    textAlign: 'center',
    fontFamily: fonts.medium,
    marginTop: hp('0.8%'),
  },
  interestContainer: {
    width: wp('88%'),
    alignItems: 'flex-start',
  },
  interestHeader: {
    fontSize: hp('2.5%'),
    marginBottom: hp('2%'),
    color: COLORS.blackTxtColor,
    fontFamily: fonts.medium,
    // marginLeft: wp(2)
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestItem: {
    backgroundColor: '#EEE',
    borderRadius: 20,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    marginRight: wp('2%'),
    marginBottom: hp('1%'),
    position: 'relative', // Enable positioning of children relative to this container
  },
  interestText: {
    fontSize: hp('1.8%'),
    color: COLORS.white,
  },
  iconContainer: {
    position: 'absolute',
    top: -wp('1.5%'), // Adjust to move the icon up, half inside and half outside
    right: -wp('0%'), // Adjust to move the icon to the right, half inside and half outside
    // backgroundColor: item.color, // Match the background color of the interest item
    borderRadius: wp('2%'), // To make the container rounded
    backgroundColor: COLORS.white
  },
});

export default EditProfile;
