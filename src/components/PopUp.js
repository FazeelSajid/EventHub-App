import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors/COLORS';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { fonts } from '../assets/fonts/fonts';

const PopUp = ({heading, message, color}) => {
  return (
    <View style={styles.popUp}>
    <View style={[styles.color, {backgroundColor: color}]} />
    <View style={styles.innerContainer} >
      <Text style={[styles.heading, {  color: color,}]} >{heading}</Text>
      <Text style={[styles.text, {}]} >{message}</Text>
    </View>
  </View>
  )
}

export default PopUp

const styles = StyleSheet.create({
    popUp: {
      position: 'absolute',
      top: hp('3.3%'),
      left: wp('5%'),
      right: wp('5%'),
      // backgroundColor: '#d4edda',
      // borderRadius: wp('2%'),
      // alignItems: 'center',
      zIndex: 1,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        // flex:1,
        borderRadius: wp('2.5%'),
        overflow: 'hidden',
        elevation: 10,
      },
      color: {
        // height: hp('7.3%'),
        width: wp('2.2%'),
        // flexGrow:1
      },
      innerContainer:{
        paddingHorizontal: wp('3%'),
        justifyContent: 'center',
        paddingVertical: wp(3)

        
        // paddingVertical: hp('4%'),
      },
      heading: {
        fontFamily: 'Lexend',
      
        fontWeight: '700',
        marginBottom: wp('0.7')
      },
      text:{
        fontFamily: fonts.medium,
        fontSize: wp('3.5%'),
        color: COLORS.blackTxtColor,
      }
})