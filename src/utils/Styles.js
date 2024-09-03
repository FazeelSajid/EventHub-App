import {COLORS} from '../constants/colors/COLORS';
import {fonts} from '../assets/fonts/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Authstyles = {
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    // justifyContent: 'center',
    // paddingHorizontal : wp(10),
    // alignItems: 'center',
  },
  OnbordingContentContainer: {
    backgroundColor: COLORS.primary,
    flexGrow: 0.05,
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
    paddingHorizontal: wp(10),
    paddingVertical: wp(10),
  },
  OnbordingHeadingTextStyle: {
    color: COLORS.white,
    fontFamily: 'AirbnbCereal_Bold',
    fontSize: wp(6),
    textAlign: 'center',
  },
  OnbordingButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    position: 'relative',
  },
  OnbordingImage: {
    height: hp(70),
    width: wp(100),
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp(8),
  },
  logoText: {
    fontFamily: fonts.medium,
    fontSize: wp(9),
    color: COLORS.blackLogoColor,
    marginLeft: wp(5),
    marginTop: hp(1),
  },
  SignHeading: {
    fontFamily: fonts.medium,
    fontSize: wp(6.5),
    // fontWeight: '700' ,
    color: COLORS.blackLogoColor,
    marginBottom: wp(4),
  },
  ButtonArrowLogo: {position: 'absolute', right: 10, bottom: 15},
  ORtext: {
    fontFamily: fonts.medium,
    fontSize: wp(4),
    // fontWeight: '700' ,
    color: COLORS.mediumGray,
    marginBottom: wp(4),
    marginVertical: wp(4),
    alignSelf: 'center',
    textAlign: 'center',
  },
  forgetPassheading: {
    fontFamily: fonts.medium,
    fontSize: wp('6%'),
    color: COLORS.blackTxtColor,
    // textAlign: 'center',
    marginTop: hp('1%'),
    // marginBottom: hp('3%'),
    marginLeft: hp(0.8),
  },
  forgetPassSubHeading: {
    fontFamily: fonts.regular,
    marginBottom: hp(4),
    color: COLORS.blackTxtColor,
    paddingHorizontal: wp(6),
    fontSize: wp(4.5),
    // fontWeight: '700' ,
    marginVertical: wp(4),
    // alignSelf: 'center',
    textAlign: 'left',
    lineHeight: hp(3.5),
    // backgroundColor: 'green',
    width: wp(85)
  },
  TextInput: {
    borderColor: COLORS.lightGray,
    borderWidth: wp(0.3),
    marginBottom: wp(4),
  },
  rowContainer: {
    flexDirection: 'row',
    // marginBottom: wp(5),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgetPassText: {
    color: COLORS.blackTxtColor,
    fontFamily: fonts.regular,
    fontSize: wp(3.5),
  },
  ButtonText: {
    fontFamily: fonts.medium,
    fontSize: wp(5),
    color: COLORS.white,
  },
  continueWithText: {
    fontFamily: fonts.regular,
    fontSize: wp(4),
    color: COLORS.white,
  },
  ButtonContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: wp(4),
    paddingHorizontal: wp(10),
    borderRadius: wp(4),
    marginVertical: wp(5),
    width: wp(70),
    alignSelf: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
    elevation: 5,
  },
  dontHaveAccText: {
    color: COLORS.primary,
    fontFamily: fonts.medium,
    fontSize: wp(4),
  },
  forgetPassMainContainer: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('4%'),
    backgroundColor: COLORS.white,
  },
  resendCode: {color: COLORS.blackTxtColor, fontFamily: fonts.regular},
  resendCodeContainer: {marginTop: 20, alignItems: 'center'},
};

export const AppStyles = {
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    // position: 'relative',
    // justifyContent: 'center',
    // paddingHorizontal : wp(10),
    // alignItems: 'center',
  },
  searchMainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exploreHeaderContainer: {
    backgroundColor: COLORS.primary2,
    paddingHorizontal: wp(3),
    height: hp(20),
    borderBottomStartRadius: wp('10%'),
    borderBottomEndRadius: wp('10%'),
    position: 'relative',
    paddingTop: wp('2%'),
  },
  exploreHeaderLocationCard: {
    marginVertical: wp(4),
  },
  locationCardRightSvg: {
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(3.5),
    borderRadius: wp(7),
  },
  locationHeading: {color: COLORS.lightGray, fontFamily: fonts.regular, fontSize: wp(3.5)},
  locationTextStyle: {color: 'white', fontFamily: fonts.medium},
  txtInput: {
    backgroundColor: COLORS.primary2,
    color: COLORS.white,
    // width: wp(100),
    paddingRight: wp(7),
  },
  txtInputFilterBtnStyle: {
    backgroundColor: COLORS.primary,
    paddingVertical: wp(1.5),
    paddingHorizontal: wp(2),
    borderRadius: wp(8),
    flexDirection: 'row',
  },
  locationCardSeacrhContainer: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  locationCardFilterBtnText: {
    fontSize: wp(3.5),
    fontFamily: fonts.regular,
    color: COLORS.white,
    marginLeft: wp(1),
  },
  LocationCardSearchBtn: {flexDirection: 'row', alignItems: 'center', flex: 1},
  headingTextStyle: {
    color: COLORS.blackTxtColor,
    fontFamily: fonts.medium,
    fontSize: wp(6),
    alignSelf: 'flex-start',
    marginLeft: wp(3),
  },
  // filterBottomSheet
  filterBottomSheetContentContainer: {
    padding: wp('5%'),
  },
  filterBottomSheetHeader: {
    fontSize: wp('6%'),
    marginBottom: hp('2%'),
    color: COLORS.blackTxtColor,
    fontFamily: fonts.medium
  },
  filterBottomSheetCategoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
  filterBottomSheetCategoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('9%'),
    backgroundColor: '#E0E0E0',
  },
  filterBottomSheetCategoryText: {
    fontSize: wp('3.5%'),
    color: COLORS.blackTxtColor,
    fontFamily: fonts.regular,
    marginTop: hp('1%'),
  },
  filterBottomSheetFilterSection: {
    // marginBottom: hp('%'),
  },
  filterBottomSheetFilterLabel: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
    marginBottom: hp('1%'),
    marginTop: hp('4%'),
    color: COLORS.blackTxtColor,
    fontFamily: fonts.medium
  },
  filterBottomSheetTimeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1.5%'),
  },
  filterBottomSheetTimeButton: {
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('6.5%'),
    borderRadius: wp('2%'),
    borderWidth:wp(0.3),
    borderColor: COLORS.lightGray,
  },
  filterBottomSheetTimeButtonText:{
    fontSize: wp('3.5%'),
    color: COLORS.darkGray,
    fontFamily: fonts.regular,
  },
  filterBottomSheetCalendarButton: {
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3.5%'),
    borderRadius: wp('2%'),
    borderWidth:wp(0.3),
    borderColor: COLORS.lightGray,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(65)

  },
  filterBottomSheetLocationInput: {
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    borderWidth:wp(0.3),
    borderColor: COLORS.lightGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterBottomSheetPriceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterBottomSheetButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: hp('%'),
  },
  filterBottomSheetResetButton: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('3%'),
    borderWidth:wp(0.3),
    borderColor: COLORS.lightGray,
    alignItems: 'center',
    flex:1

  },
  filterBottomSheetApplyButton: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    borderRadius: wp('3%'),
    backgroundColor: COLORS.primary ,
    alignItems: 'center',
    marginLeft: wp(5),
    flex:2
  },
  filterBottomSheetResetButtonText: {
    fontSize: wp('4%'),
    color: COLORS.blackTxtColor,
    fontFamily: fonts.medium

  },
  filterBottomSheetApplyButtonText: {
    fontSize: wp('4%'),
    color: COLORS.white,
    fontFamily: fonts.medium
  },
  eventEmptyText:{
    fontSize: wp('4.5%'),
    color: COLORS.darkGray,
    fontFamily: fonts.regular,
    width: wp(80),
    textAlign: 'center',
  },
};
export const ComponentsStyle = {
  badgeContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    marginRight: wp('2%'),
    marginBottom: hp('1%'),
    alignItems:'center',
  },
  badgeTxtColor: {
    color: COLORS.white,
    fontFamily: fonts.regular,
    fontSize: wp(4.4),
    marginLeft: wp(2)
  },
  eventCardContainer: {
    width: wp('50%'), // Adjust as needed
    borderRadius: wp('3.75%'), // 15px equivalent
    backgroundColor: COLORS.white,
    shadowColor: COLORS.blackTxtColor,
    shadowOpacity: 0.1,
    shadowRadius: wp('1.25%'), // 5px equivalent
    shadowOffset: {width: 0, height: hp('0.25%')}, // 2px equivalent
    elevation: 3,
    margin: wp('2.5%'), // 10px equivalent
    overflow: 'hidden',
  },
  eventCardImage: {
    width: '100%',
    height: hp('16%'), // 100px equivalent
  },
  eventCarddateNBookmarkContainer: {
    position: 'absolute',
    top: hp('1.25%'),
    left: wp('2.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('46%'),
  },
  eventCardDateContainer: {
    // 10px equivalent
    backgroundColor: `${COLORS.white}80`,
    borderRadius: wp('2.5%'), // 10px equivalent
    paddingVertical: hp('0.625%'), // 5px equivalent
    paddingHorizontal: wp('2.5%'), // 10px equivalent
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventCardDateDay: {
    fontSize: wp('4%'), // 16px equivalent
    color: COLORS.redishColor,
    fontWeight: 'bold',
  },
  eventCardDateMonth: {
    fontSize: wp('3%'), // 12px equivalent
    color: COLORS.redishColor,
  },
  eventCardInfoContainer: {
    padding: wp('2.5%'), // 10px equivalent
  },
  eventCardEventTitle: {
    fontSize: wp('4%'), // 16px equivalent
    fontWeight: 'bold',
    color: COLORS.blackTxtColor,
    marginVertical: hp('0.625%'), // 5px equivalent
  },
  eventCardAttendeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.625%'), // 5px equivalent
    marginBottom: hp('2%'), // 5px equivalent
  },
  eventCardAttendeeImage: {
    width: wp('6%'), // 24px equivalent
    height: wp('6%'), // 24px equivalent
    // borderRadius: wp('3%'), // 12px equivalent
    marginLeft: -wp('2%'), // -8px equivalent
    // borderWidth: wp('0.5%'), // 2px equivalent
    // borderColor: COLORS.white,
  },
  eventCardAttendeeCount: {
    fontSize: wp('3%'), // 12px equivalent
    color: COLORS.primary,
    marginLeft: wp('2.5%'), // 10px equivalent
  },
  eventCardLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.625%'), // 5px equivalent
  },
  eventCardLocationText: {
    fontSize: wp('3%'), // 12px equivalent
    color: COLORS.mediumGray,
    marginLeft: wp('1.25%'), // 5px equivalent
  },
  HorizontalListHeadingContainer: [
    AppStyles.rowContainer,
    {
      paddingHorizontal: wp(4),
      alignItems: 'center',
      marginTop: wp(7),
      marginBottom: wp(3),
    },
  ],
  headingTextStyle: {
    color: COLORS.blackTxtColor,
    fontFamily: fonts.medium,
    // fontWeight: '',
    fontSize: wp(4.7),
    // marginBottom: wp(4),
    // marginTop: wp(9),
  },
  seeAllTextStyle: {
    color: COLORS.mediumGray,
    fontFamily: fonts.medium,
    fontSize: wp(3.5),
    // marginTop: wp(5),
  },
  searchCardContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: wp(2),
    padding: wp(3),
    alignItems: 'center',
    marginBottom: hp(2),
    // Shadow for iOS
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    // Elevation for Android
    elevation: 6,
  },
  searchCardEventImage: {
    width: wp(20),
    height: wp(23),
    borderRadius: wp(2),
    marginRight: wp(3),
  },
  searchCardTextContainer: {
    flex: 1,
  },
  searchCardDateText: {
    color: COLORS.primary,
    fontSize: wp(3.7),
    marginBottom: wp(1),
    fontFamily: fonts.medium,
  },
  searchCardEventTitle: {
    fontSize: wp(4.5),
    fontFamily: fonts.medium,
    marginBottom: wp(1),
    color: COLORS.blackTxtColor,
  },
  searchCardLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchCardLocationText: {
    color: COLORS.darkGray,
    fontSize: wp(3.5),
    marginLeft: wp(1),
  },
};
