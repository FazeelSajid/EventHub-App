import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useCallback } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../../../constants/colors/COLORS';
import Loader from '../../../../../components/loader';
import {AppStyles} from '../../../../../utils/Styles';
import {fonts} from '../../../../../assets/fonts/fonts';
import Drawer from '../../../../../assets/svgs/Drawer.svg';
import Notification from '../../../../../assets/svgs/notification.svg';
import Search from '../../../../../assets/svgs/SearchWhite.svg';
import Filter from '../../../../../assets/svgs/filter.svg';
import TxtInput from '../../../../../components/TxtInput';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../../../components/customButton';
// import LoaderKit from 'react-native-loader-kit';

const LocationCard = ({
  text1,
  leftOnpress,
  leftIcon,
  text2 = 'New York, USA',
  txt1style,
  txt2style,
  rightIcon,
  containerStyle,
  rigntOnpress,
  rightSvg,
  leftSvg,
  bottomSheetRef,
  setShowFilter
}) => {
  const navigation = useNavigation();
  

  const handlePresentModalPress = useCallback(() => {
    setShowFilter(true)
    bottomSheetRef.current?.present();
  }, []);
  return (
    <View style={AppStyles.exploreHeaderContainer}>
      <View
        style={[
          AppStyles.rowContainer,
          AppStyles.exploreHeaderLocationCard,
        ]}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.openDrawer()}>
          <Drawer width={wp('5%')} height={hp('4%')} />
          {leftIcon && (
            <Icon name={leftIcon} size={wp('7%')} color={COLORS.white} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={{marginVertical: hp(0.7)}}>
          <Text style={AppStyles.locationHeading}>
            {'Currnet Location'}
          </Text>
          {text2 ? (
            <Text style={AppStyles.locationTextStyle}>
              {'New Yourk, USA'}
            </Text>
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Loader />
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={AppStyles.locationCardRightSvg}
          onPress={()=>navigation.navigate('Notification')}>
          <Notification width={wp('5%')} height={hp('4%')} />
          {rightIcon && (
            <Icon name={rightIcon} size={wp('7%')} color={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>

      <View style={AppStyles.locationCardSeacrhContainer} >
        <TouchableOpacity style={AppStyles.LocationCardSearchBtn}   onPress={()=> navigation.navigate('Search',{screen:'search'})}>
        <Search width={wp(6)} height={wp(5)} />
        <Text style={{color: COLORS.mediumGray, fontSize: wp(5),}} >
        | Search...
        </Text>
        </TouchableOpacity>
        <CustomButton
            svg={<Filter width={wp(7)} height={wp(6)} />}
            text={'Filters'}
            textStyle={AppStyles.locationCardFilterBtnText}
            containerStyle={AppStyles.txtInputFilterBtnStyle}
            onPress={handlePresentModalPress}
          />

      </View>

      {/* <TxtInput
        containerStyle={[AppStyles.txtInput, { width:wp(95)}]}
        placeholder={'| Search...'}
        inputStyle={{fontSize: wp(5)}}
        placeholderTextColor={COLORS.mediumGray}
        svg={<Search width={wp(6)} height={wp(5)} />}
        leftSvg={<Filter width={wp(7)} height={wp(6)} />}
        btnText={'Filters'}
        leftBtnStyle={AppStyles.txtInputFilterBtnStyle}
        onPress={()=> navigation.navigate('Search',{screen:'search'})}
      /> */}
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    justifyContent: 'center',
    paddingHorizontal: wp(3),
    borderRadius: wp('2%'),
    
  },
});
