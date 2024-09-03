import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS } from '../../../../../constants/colors/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from '../../../../../assets/fonts/fonts';
import CustomHeader from '../../../../../components/CustomHeader';
import TxtInput from '../../../../../components/TxtInput';
import CustomButton from '../../../../../components/customButton';
import { Authstyles } from '../../../../../utils/Styles';
import Logo from '../../../../../assets/svgs/logo.svg';
import ArrowLeft from '../../../../../assets/svgs/arrowLeft.svg';
const Feedback = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader
        leftSvg={<ArrowLeft/>}
        leftIconColor={COLORS.blackTxtColor}
        iconSize={wp(8)}
        leftOnpress={() => navigation.goBack()}
      />
     <View style={[Authstyles.logoContainer, {marginTop: hp(0)}]}>
        <Logo width={wp(20)} height={wp(18)} />
        <Text style={Authstyles.logoText}>EventHub</Text>
      </View>

<View style={styles.inputContainer} >
  <Text style={styles.heading}>What do you think of Flirt Waves?</Text>
  <TxtInput containerStyle={styles.TxtInput} multiline={true} placeholder={'Add message'} placeholderTextColor={COLORS.darkGray} />
</View>

<View style={{flex:1, justifyContent: 'flex-end'}} >
        <CustomButton
        text={'Submit'}
        containerStyle={styles.btn}
        textStyle={styles.btnText}
        pressedRadius={wp(3)}
        // onPress={handleSubmit}
      />
        </View>
  
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: hp('4%'),
    paddingHorizontal: wp('6%'),
  },
  TxtInput: {
    borderColor: COLORS.lightGrayColor,
    borderWidth: wp(0.3),
    height: wp(30),
    // marginTop: wp(15),
  },
  heading: {
    fontSize: wp(4),
    color: COLORS.primary,
    fontFamily: fonts.medium,
    // marginVertical: wp(3),
    // textAlign: '/',
    marginBottom: wp(3.5),
    // marginTop: wp(0),
    // marginHorizontal: wp(7),
  },
  inputContainer:{
    marginBottom: hp(20),
  },
  btn: {
    // flex: 1,
    // alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    paddingVertical: wp(3),
    marginBottom: wp(20)
    // justifyContent: 'flex-end'
  },
  btnText: {
    fontSize: wp(5),
    color: COLORS.white,
    fontFamily: fonts.medium,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
});
