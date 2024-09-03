import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../../constants/colors/COLORS';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import User from '../../assets/svgs/user.svg';
import Message from '../../assets/svgs/XmessageNotification.svg';
import Calender from '../../assets/svgs/calendar.svg';
import Bookmark from '../../assets/svgs/bookmark.svg';
import Mail from '../../assets/svgs/mail.svg';
import Settings from '../../assets/svgs/settings.svg';
import Help from '../../assets/svgs/help.svg';
import SignOut from '../../assets/svgs/signOut.svg';
import Upgrade from '../../assets/svgs/upgrade.svg';
import {Images} from '../../assets/Images/Images';
import CustomButton from '../../components/customButton';
import {fonts} from '../../assets/fonts/fonts';
import PopUpModal from '../../components/PopUpModal';
import useAuth from '../../redux-toolkit/StateHooks/useAuth';
import Svg from '../../assets/svgs/svg';
import Warning from '../../assets/svgs/warning.svg';
import LogOut from '../../assets/svgs/logout.svg';

const CustomDrawerComp = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState('Home');
  const { setAuthState, authState} = useAuth()

  const screens = {
    Message: {
      screen: 'Messages',
      title: 'Message',
      icon: <Message width={wp('7%')} height={wp('7%')} />,
    },
    Calendar: {
      screen: 'Calender',
      title: 'Calendar',
      icon: <Calender width={wp('5%')} height={wp('5%')} />,
    },
    Bookmark: {
      screen: 'Bookmark',
      title: 'Bookmark',
      icon: <Bookmark width={wp('5%')} height={wp('5%')} />,
    },
    Contact: {
      screen: 'Contact',
      title: 'Contact Us',
      icon: <Mail width={wp('5%')} height={wp('5%')} />,
    },
    Setting: {
      screen: 'Setting',
      title: 'Settings',
      icon: <Settings width={wp('5%')} height={wp('5%')} />,
    },
    Help: {
      screen: 'Help',
      title: 'Help & FAQs',
      icon: <Help width={wp('5%')} height={wp('5%')} />,
    },
    SignOut: {
      screen: 'SignOut',
      title: 'Sign Out',
      icon: <SignOut width={wp('5%')} height={wp('5%')} />,
    },
  };

  const handlePress = key => {
    setSelectedItem(key);
    navigation.navigate(screens[key].screen);
  };

  const [LogOutPopUp, setLogOutPopUp] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Image source={Images.profilePic} style={styles.profileImage} />
        <Text style={styles.profileName}>Ashfak Sayem</Text>
      </View>

      <View style={styles.menuContainer}>
        {Object.keys(screens).map(key => (
          <TouchableOpacity
            key={key}
            style={[
              styles.menuItem,
              selectedItem === key && styles.selectedMenuItem,
            ]}
            onPress={() => handlePress(key)}>
            {screens[key].icon}
            <Text
              style={[
                styles.menuItemText,
                selectedItem === key && styles.selectedMenuItemText,
              ]}>
              {screens[key].title}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <CustomButton
            svg={<LogOut width={wp(7)} height={wp(7)} />}
            text={'Logout'}
            containerStyle={styles.btn}
            textStyle={styles.btnText}
            onPress={() => setLogOutPopUp(true)}
            pressedRadius={wp(3)}
          />
        </View>
      </View>
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
    </View>
  );
};

export default CustomDrawerComp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingVertical: wp('6%'),
    backgroundColor: COLORS.white,
  },
  profileContainer: {
    // alignItems: 'center',
    marginBottom: hp('4%'),
    marginHorizontal: wp(3),
  },
  profileImage: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('10%'),
    marginBottom: hp('1.25%'),
  },
  profileName: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: COLORS.blackTxtColor,
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('2%'),
  },
  selectedMenuItem: {
    backgroundColor: `${COLORS.primary}30`,
    borderRadius: wp('2.5%'),
  },
  menuItemText: {
    fontSize: wp('4%'),
    marginLeft: wp('4%'),
    color: COLORS.blackTxtColor,
  },
  selectedMenuItemText: {
    color: COLORS.primary,
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
