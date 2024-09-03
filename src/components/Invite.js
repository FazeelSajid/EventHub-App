import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../constants/colors/COLORS';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CheckBoxBlueTick from '../assets/svgs/checkBoxBlueTick.svg';
import CheckBoxGrayTick from '../assets/svgs/CheckBoxGrayTick.svg';
import ButtonArrow from '../assets/svgs/buttonArrow.svg';
import SearchBlue from '../assets/svgs/searchBlue.svg';
import TxtInput from './TxtInput';
import { AppStyles } from '../utils/Styles';
import { fonts } from '../assets/fonts/fonts';
import {BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal} from '@gorhom/bottom-sheet';
import PopUp from './PopUp';


const InviteFriends = ({ friends, onInvite, closeModal, bottomSheetRef }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [PopUpMesage, setPopUpMesage] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const snapPoints = useMemo(() => [hp('75%'), hp('95%')], []);
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

  const toggleFriendSelection = (friendId) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleCloseModalPress = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  return (

    <BottomSheetModal
    ref={bottomSheetRef}
    index={0}
    snapPoints={snapPoints}
    backgroundStyle={styles.bottomSheetBackground}
    backdropComponent={renderBackdrop}
    >
    {/* <FilterBottomSheet bottomSheetRef={bottomSheetRef} /> */}
    <View style={styles.container}>
      {/* Header */}
      {showPopUp && (
          <PopUp
            color={COLORS.green}
            heading={'Invited Successfully'}
            message={'Invite sent to the selected friends'}
          />
        )}
      <View style={styles.header}>
        <Text style={styles.title}>Invite Friend</Text>
       <TxtInput placeholder={'Search'} placeholderTextColor={COLORS.darkGray} containerStyle={[AppStyles.txtInput, styles.txtInput]} leftSvg={<SearchBlue/>}  />
      </View>

      {/* Friends List */}
      <BottomSheetFlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.friendContainer}
            onPress={() => toggleFriendSelection(item.id)}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.followerCount}>{item.followers} Followers</Text>
            </View>
            {selectedFriends.includes(item.id) ? <CheckBoxBlueTick width={wp(6)}  /> : <CheckBoxGrayTick width={wp(6)} /> }
          </TouchableOpacity>
        )}
        scrollEnabled={true}
      />

      {/* Invite Button */}
      <TouchableOpacity style={styles.buyButton} onPress={()=>{
        setShowPopUp(true)
        setTimeout(() => {
          setShowPopUp(false)
          handleCloseModalPress()
        }, 3000);
        
        
      }} >
        <Text style={styles.buyButtonText}>INVITE</Text>
        <View style={styles.ButtonArrowLogo}>
          <ButtonArrow width={wp(8)} height={wp(6)} />
        </View>
      </TouchableOpacity>
    </View>
</BottomSheetModal>
  );
};


    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: COLORS.white,
          paddingHorizontal: wp(4), // Responsive padding
        },
        header: {
          marginTop: hp(2.5), // Responsive margin
          marginBottom: hp(1.25), // Responsive margin
        },
        title: {
          fontSize: wp(5.5), // Responsive font size
          //   fontWeight: 'bold',
          color: COLORS.blackColor,
          fontFamily: fonts.bold
        },
     
        txtInput: {
            backgroundColor: COLORS.white,
            marginTop: wp(3),
            borderColor: COLORS.lightGray,
            borderWidth: wp(0.3),
            borderRadius: wp(10)
          },
        friendContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: hp(1.25), // Responsive padding
        //   borderBottomWidth: 1,
        //   borderBottomColor: COLORS.lightGray,
        },
        avatar: {
          width: wp(10), // Responsive width
          height: wp(10), // Responsive height
          borderRadius: wp(5), // Responsive border radius
          marginRight: wp(4), // Responsive margin
        },
        friendInfo: {
          flex: 1,
        },
        friendName: {
          fontSize: wp(4), // Responsive font size
          color: COLORS.blackColor,
          fontFamily: fonts.regular,
        },
        followerCount: {
          fontSize: wp(3.5), // Responsive font size
          color: COLORS.darkGray,
        //   fontFamily: fonts.medium,

        },
        buyButton: {
            backgroundColor: COLORS.primary,
            paddingVertical: hp('2%'),
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: wp('5%'),
            borderRadius: wp('3%'),
            marginBottom: hp('3%'),
            width: wp(70),
            alignSelf: 'center',
            flexDirection: 'row',
            position: 'absolute',
            bottom: hp('2%'),
          },
          buyButtonText: {
            color: COLORS.white,
            fontSize: wp('4%'),
            fontFamily: fonts.medium,
          },
          ButtonArrowLogo: { position: 'absolute', right: 10, bottom: 15 },
      });
      

export default InviteFriends;
