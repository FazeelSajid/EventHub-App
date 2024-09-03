import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../../constants/colors/COLORS';
import CustomHeader from '../../../../components/CustomHeader';
import {fonts} from '../../../../assets/fonts/fonts';
import CustomButton from '../../../../components/customButton';
import {EventsCategories} from '../../../../utils/Data';
import EditIcon from '../../../../assets/svgs/editIcon.svg';
import { AppStyles } from '../../../../utils/Styles';
import ArrowLeft from '../../../../assets/svgs/arrowLeft.svg';

const MyProfile = ({navigation}) => {
  

  return (
    <ScrollView style={styles.container}>
      <CustomHeader
        leftSvg={<ArrowLeft widht={wp(10)} height={hp(3)} />}
        leftOnpress={() => navigation.goBack()}
        heading="Profile"
        headingStyle={AppStyles.headingTextStyle}
        containerStyle={styles.headerContainerStyle}
      />
      <View style={styles.profileContainer}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/men/3.jpg'}} // Replace with actual image URL
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>Ashfak Sayem</Text>
        <View style={styles.followInfo}>
          <View>
            <Text style={styles.followHeding}>350</Text>
            <Text style={styles.followText}>Following</Text>
          </View>
          <View
            style={{
              height: hp(5),
              backgroundColor: COLORS.darkGray,
              width: wp(0.3),
            }}
          />
          <View>
            <Text style={styles.followHeding}>346</Text>
            <Text style={styles.followText}>Followers</Text>
          </View>
        </View>
        <CustomButton
          text={'Edit Profile'}
          containerStyle={styles.editButton}
          textStyle={styles.editButtonText}
          onPress={() => navigation.navigate('EditProfile')}
          svg={<EditIcon />}
        />
        <Text style={styles.aboutHeading}>About Me</Text>
        <Text style={styles.aboutText}>
          Enjoy your favorite dish and a lovely your friends and family and have
          a great time. Food from local food trucks will be available for
          purchase.<Text style={styles.readMoreText}>Read More</Text>
        </Text>

        <View style={styles.interestContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              flexGrow: 1,
              width: '100%',
              alignItems: 'center',
            }}>
            <Text style={styles.interestHeader}>Interest</Text>
          </View>
          <View style={styles.interests}>
            {EventsCategories.map((item, index) => (
              <View
                key={index}
                style={[styles.interestItem, {backgroundColor: item.color}]}>
                <Text style={styles.interestText}>{item.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: wp(7),
    paddingLeft: wp(5)
    // marginBottom: wp(2),
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
  nameText: {
    fontSize: hp('3%'),
    marginBottom: hp('3%'),
    color: COLORS.blackTxtColor,
    fontFamily: fonts.bold,
  },
  followInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('50%'),
    marginBottom: hp('3%'),
  },
  followText: {
    fontSize: hp('2%'),
    color: COLORS.mediumGray,
    textAlign: 'center',
    fontFamily: fonts.medium,
    marginTop: hp('0.8%'),
  },
  followHeding: {
    fontSize: hp('2%'),
    color: COLORS.blackTxtColor,
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
  editButton: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('8%'),
    marginBottom: hp('3%'),
  },
  editButtonText: {
    fontSize: hp('2%'),
    color: COLORS.primary,
    fontFamily: fonts.regular,
    marginLeft: wp(2),
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
  aboutText: {
    fontSize: hp('2%'),
    color: COLORS.blackTxtColor,
    paddingHorizontal: wp('7%'),
    textAlign: 'left',
    fontFamily: fonts.regular,
    marginBottom: hp('2%'),
    lineHeight: hp(3.3),
  },
  readMoreText: {
    color: '#1E90FF',
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    marginBottom: hp('3%'),
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
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestItem: {
    // backgroundColor: '#EEE',
    borderRadius: 20,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    marginRight: wp('2%'),
    marginBottom: hp('1%'),
  },
  interestText: {
    fontSize: hp('1.8%'),
    color: COLORS.white,
  },
});

export default MyProfile;
