import {ScrollView, StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Privacy from '../../../../../assets/svgs/privacy.svg';
import ArrowLeft from '../../../../../assets/svgs/arrowLeft.svg';
import CustomButton from '../../../../../components/customButton';
import { fonts } from '../../../../../assets/fonts/fonts'; 
import CustomHeader from '../../../../../components/CustomHeader'; 
import { COLORS } from '../../../../../constants/colors/COLORS'; 

const PrivacyPolicy = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <CustomHeader
        leftSvg={<ArrowLeft/>}
        iconSize={wp('8%')}
        leftIconColor={COLORS.blackTxtColor}
        leftOnpress={() => navigation.goBack()}
      />
      <View style={styles.headingContainer}>
        <Privacy width={wp(30)} height={wp(28)} />
        <Text style={styles.heading}>Privacy Policy</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginTop: wp('4%')}}>
        <Text style={styles.policy}>
          The personal information that you are asked to provide, and the
          reasons why you are asked to provide it, will be made clear to you at
          the point we ask you to provide your personal information. If you
          contact us directly, we may receive additional information about you
          such as your name, email address, phone number, the contents of the
          message and/or attachments you may send us, and any other information
          you may choose to provide. When you register for an Account, we may
          ask for your contact information, including items such as name,
          company name, address, email address, and telephone number.{'\n'}Like any
          other website, mtechub llc uses 'cookies'. These cookies are used to
          store information including visitors' preferences, and the pages on
          the website that the visitor accessed or visited. The information is
          used to optimize the users' experience by customizing our web page
          content based on visitors' browser type and/or other information. You
          may consult this list to find the Privacy Policy for each of the
          advertising partners of mtechub llc. Third-party ad servers or ad
          networks uses technologies like cookies, JavaScript, or Web Beacons
          that are used in their respective advertisements and links that appear
          on mtechub llc, which are sent directly to users' browser. They
          automatically receive your IP address when this occurs. These
          technologies are used to measure the effectiveness of their
          advertising campaigns and/or to personalize the advertising content
          that you see on websites that you visit.{'\n'}Note that mtechub llc has no
          access to or control over these cookies that are used by third-party
          advertisers. The personal information that you are asked to provide,
          and the reasons why you are asked to provide it, will be made clear to
          you at the point we ask you to provide your personal information. If
          you contact us directly, we may receive additional information about
          you such as your name, email address, phone number, the contents of
          the message and/or attachments you may send us, and any other
          information you may choose to provide. When you register for an
          Account, we may ask for your contact information, including items such
          as name, company name, address, email address, and telephone number.
          Like any other website, mtechub llc uses 'cookies'.{'\n'}These cookies are
          used to store information including visitors' preferences, and the
          pages on the website that the visitor accessed or visited. The
          information is used to optimize the users' experience by customizing
          our web page content based on visitors' browser type and/or other
          information. You may consult this list to find the Privacy Policy for
          each of the advertising partners of mtechub llc. Third-party ad
          servers or ad networks uses technologies like cookies, JavaScript, or
          Web Beacons that are used in their respective advertisements and links
          that appear on mtechub llc, which are sent directly to users' browser.
          They automatically receive your IP address when this occurs{'.\n'}These
          technologies are used to measure the effectiveness of their
          advertising campaigns and/or to personalize the advertising content
          that you see on websites that you visit. Note that mtechub llc has no
          access to or control over these cookies that are used by third-party
          advertisers.
        </Text>
       
      </ScrollView>
      <View style={{marginTop: wp(2)}} >
          <CustomButton
            containerStyle={[styles.btn, {backgroundColor: COLORS.primary}]}
            text={'Accept'}
            textStyle={[styles.btnText, {color: COLORS.white}]}
            // onPress={()=> navigation.navigate('signup')}
            pressedRadius={wp(3)}
          />
        </View>
    </View>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('6%'),
  },
  headingContainer: {
    paddingHorizontal: wp('10%'),
    overflow: 'hidden',
    alignItems: 'center',
  },
  heading: {
    fontFamily: fonts.medium,
    fontSize: wp('6%'),
    textAlign: 'center',
    paddingTop: wp('3%'),
    color: COLORS.blackTxtColor,
  },
  policy: {
    fontFamily: fonts.regular,
    lineHeight: wp('7%'),
    color: COLORS.darkGray
  },
  btn: {
    paddingVertical: wp('4%'),
    borderRadius: wp('3%'),
    marginTop: wp('5%'),
  },
  btnText: {
    fontSize: wp(5),
    color: COLORS.white,
    fontFamily: fonts.medium,
    // fontWeight: 'bold',
    textAlign: 'center',
  },
});
