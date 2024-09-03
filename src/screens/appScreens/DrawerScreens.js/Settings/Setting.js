import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../../../components/CustomHeader';
import { COLORS } from '../../../../constants/colors/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from '../../../../assets/fonts/fonts'; 
import Premium from '../../../../assets/svgs/premium.svg';
import Password from '../../../../assets/svgs/LockFilled.svg';
import Feedback from '../../../../assets/svgs/feedback.svg';
import FAQS from '../../../../assets/svgs/faqs.svg';
import Privacy from '../../../../assets/svgs/privacy.svg';
import Support from '../../../../assets/svgs/support.svg';
import Warning from '../../../../assets/svgs/warning.svg';
import LogOut from '../../../../assets/svgs/logout.svg';
import PopUpModal from '../../../../components/PopUpModal';
import CustomButton from '../../../../components/customButton';
import useAuth from '../../../../redux-toolkit/StateHooks/useAuth';

const Setting = ({navigation}) => {
  const [ContactPopUp, setContactPopUp] = useState(false);
  const [LogOutPopUp, setLogOutPopUp] = useState(false);
  const { setAuthState, authState} = useAuth()


  const options = [
    {
      title: 'Change Password',
      svg: <Password width={wp(7)} height={wp(7)} />,
      navigateTo: 'ChangePassword',
    },
    {
      title: 'Give Feedback',
      svg: <Feedback width={wp(7)} height={wp(7)} />,
      navigateTo: 'Feedback',
    },
    {
      title: 'Privacy Policy',
      svg: <Privacy width={wp(7)} height={wp(7)} />,
      navigateTo: 'PrivacyPolicy',
    },
    {
      title: 'FAQS',
      svg: <FAQS width={wp(7)} height={wp(7)} />,
      navigateTo: 'FAQS',
    },
  ];

  const navigateTo = screen => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <CustomHeader
        headingStyle={styles.heading}
        heading={'Settings'}
        left={'chevron-left'}
        leftIconColor={COLORS.blackTxtColor}
        iconSize={wp(8)}
        leftOnpress={()=> navigation.goBack()}
      />
      <View style={{marginTop: wp(10)}}>
        {options.map((option, index) => (
          <CustomButton
            svg={option.svg}
            text={option.title}
            key={index}
            containerStyle={styles.optionContainer}
            textStyle={{
              color: COLORS.blackTxtColor,
              fontSize: wp(4),
              marginLeft: wp(4),
              fontFamily: fonts.regular
            }}
            onPress={() => option.navigateTo && navigateTo(option.navigateTo)}
          />
        ))}
        <CustomButton
          svg={<Support width={wp(7)} height={wp(7)} />}
          text={'Contact Support'}
          // key={index}
          containerStyle={styles.optionContainer}
          textStyle={{
            color: COLORS.blackTxtColor,
            fontSize: wp(4),
            marginLeft: wp(4),
          }}
          onPress={() => setContactPopUp(true)}
        />
      </View>
      <PopUpModal
        visible={ContactPopUp}
        svg={<Support width={wp('20%')} height={hp('10%')} />}
        btn1Press={() => {
          setContactPopUp(false);
        }}
        message="If you require support, please feel free to reach out to us at [support@eventhub.com]."
        btn1Txt="Ok"
        btn1style={{backgroundColor: COLORS.primary}}
        
        textStyle={{
          marginBottom: hp(5),
          marginTop: hp(2),
          textAlign: 'center',
          fontFamily: fonts.regular,
          fontSize: wp(3.6),
          color: COLORS.blackTxtColor
        }}
        btn2TxtStyle={{color: COLORS.primary}}
        heading={'Contact Support'}
        btnsContainer={{paddingHorizontal: wp(3)}}
      />
      <PopUpModal
        visible={LogOutPopUp}
        svg={<Warning width={wp('20%')} height={hp('10%')} />}

        btn1Press={() => {
          setLogOutPopUp(false);
        }}
        btn2Press={()=> {
          setAuthState({isAuthenticated:false})
        }}
        // message="Logout"
        btn1Txt="Cancel"
        btn1style={{borderColor: COLORS.primary, borderWidth: wp(0.2)}}
        btn1TxtStyle={{color: COLORS.primary}}
        textStyle={{
          // marginBottom: hp(5),
          // marginTop: hp(2),
          textAlign: 'center',
          fontFamily: fonts.regular,
          // fontSize: wp(3.6),
          color: COLORS.blackTxtColor
        }}
        message={'Are you sure you want to Logout'}
        btn2TxtStyle={{color: COLORS.white}}
        btn2style={{backgroundColor: COLORS.primary, marginLeft: wp(3)}}
        btn2Txt={'Logout'}
        heading={'Logout'}
        btnsContainer={{
          flexDirection: 'row',
          // paddingHorizontal: wp(20),
          // marginTop: wp(8),
          // alignItems: 'center',
          justifyContent: 'center'
        }}
      />

<View style={{flex:1, justifyContent: 'flex-end'}} >
        <CustomButton
        svg={<LogOut width={wp(7)} height={wp(7)} />}
        text={'Logout'}
        containerStyle={styles.btn}
        textStyle={styles.btnText}
        onPress={()=> setLogOutPopUp(true)}
        pressedRadius={wp(3)}
      />
        </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: hp('4'),
    paddingHorizontal: wp('6%'),
  },
  heading: {
    fontFamily: fonts.medium,
    color: COLORS.blackTxtColor,
  },
  optionContainer: {
    borderWidth: wp('0.2%'),
    borderColor: COLORS.lightGrayColor,
    marginVertical: wp('2.6%'),
    borderRadius: wp(2),
    padding: wp(3.8),
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // paddingVertical: wp('100%'),
  },
  btn: {
    // flex: 1,
    // alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    paddingVertical: wp(3),
    marginBottom: wp(10),
    // justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    fontSize: wp(5),
    color: COLORS.white,
    fontFamily: fonts.medium,
    // fontWeight: 'bold',
    // textAlign: 'center',
    marginLeft: wp(2)
  },
});
