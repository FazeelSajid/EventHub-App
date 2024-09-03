import {Image, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { COLORS } from '../../../../../constants/colors/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../../../components/customButton';
import { fonts } from '../../../../../assets/fonts/fonts';


const ChatHeader = ({
  right,
  heading,
  left,
  iconSize,
  leftOnpress,
  rightOnPress,
  headingColor,
  leftIconColor,
  rightIconColor,
  rightText,
  rightTextStyle,
  img,
  isOnline,
  name,
  onNamePress
}) => {
  return (
    <View style={styles.container}>
            

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <CustomButton
          icon={left}
          iconSize={iconSize}
          iconColor={leftIconColor}
          onPress={leftOnpress}
          style={styles.iconBtn}
        />
        <Image source={{uri: img || 'https://randomuser.me/api/portraits/men/33.jpg'}} style={styles.img} />
        <TouchableOpacity onPress={onNamePress} style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.status}>Offline</Text>
        </TouchableOpacity>
      </View>

        <CustomButton
          icon={'phone'}
          iconSize={wp(7)}
          iconColor={COLORS.white}
          onPress={rightOnPress}
          text={rightText}
          textStyle={rightTextStyle}
          containerStyle={{marginRight: wp(5) }}
          
        />
      {/* <View style={styles.callContainer}>
        <CustomButton
           icon={'video'}
           iconSize={wp(7)}
           iconColor={COLORS.primary}
          onPress={rightOnPress}
          text={rightText}
          textStyle={rightTextStyle}
          

        />
      </View> */}
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(2.5),
    backgroundColor: COLORS.primary
  },
  heading: {
    color: COLORS.primary,
    fontSize: hp(3),
    fontWeight: '600',
    lineHeight: wp(6),
  },
  img: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('7%'),
    marginHorizontal: wp(2)
  },
  nameContainer: {
    paddingLeft: wp(2),
  },
  name: {
    color: COLORS.white,
    fontSize: hp(2.2),
    fontFamily: fonts.medium,
  },
  status: {
    color: COLORS.white,
    fontSize: hp(1.7),
    fontFamily: fonts.regular,
  },
  iconBtn: {
    paddingHorizontal: wp(3),
  },
  callContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp(18),
    marginRight : wp(5)
  },
});
