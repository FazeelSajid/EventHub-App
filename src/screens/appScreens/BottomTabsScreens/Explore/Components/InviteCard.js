import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../../../constants/colors/COLORS';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Images } from '../../../../../assets/Images/Images';
import { fonts } from '../../../../../assets/fonts/fonts';

const InviteCard = ({ onPressInvite }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Invite your friends</Text>
        <Text style={styles.subtitleText}>Get $20 for ticket</Text>
        <TouchableOpacity style={styles.inviteButton} onPress={onPressInvite}>
          <Text style={styles.inviteButtonText}>INVITE</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{backgroundColor: 'green'
        
      }} > */}

      <Image 
        source={Images.Invite} 
        style={styles.image} 
        resizeMode="contain"
      />
      {/* </View> */}
    </View>
  );
};

export default InviteCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: `${COLORS.logoColor}50`, // Use a color from your constants
    padding: wp('4%'), // Responsive padding
    borderRadius: wp('6%'), // Responsive border radius
    width: wp('90%'), // Responsive width
    alignSelf: 'center', // Center the card horizontally
    marginTop: hp('2%'), // Responsive vertical margin
    overflow: 'hidden'
  },
  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: wp('5%'), // Responsive font size
    fontFamily: fonts.medium,
    color: COLORS.blackTxtColor, // Use a color from your constants
  },
  subtitleText: {
    fontSize: wp('4%'), // Responsive font size
    color: COLORS.blackLogoColor, // Use a color from your constants
    marginVertical: hp('0.5%'), // Responsive vertical margin
    fontFamily: fonts.regular
  },
  inviteButton: {
    backgroundColor: COLORS.logoColor, // Use a color from your constants
    paddingVertical: hp('1%'), // Responsive padding
    paddingHorizontal: wp('5%'), // Responsive padding
    borderRadius: wp('2%'), // Responsive border radius
    marginTop: hp('1%'), // Responsive margin top
    width: wp(25)
  },
  inviteButtonText: {
    fontSize: wp('3.5%'), // Responsive font size
    color: COLORS.white,
    fontFamily: fonts.regular
  },
  image: {
    width: wp('59.3%'), // Responsive width
    height: hp('19.5%'), // Responsive height
    marginLeft: wp('4%'), // Responsive margin
    position: 'absolute',
    top: 0,
    right: 0
},
});
