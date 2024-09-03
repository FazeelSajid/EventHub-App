import {ScrollView, StyleSheet, View, Text}  from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {AppStyles} from '../../../../utils/Styles';
import CustomHeader from '../../../../components/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ArrowLeft from '../../../../assets/svgs/arrowLeft.svg';
import SearchBlack from '../../../../assets/svgs/search.svg';
import EmptyEvent from '../../../../assets/svgs/emptyEvent.svg';
import ThreeDots from '../../../../assets/svgs/threeDots.svg';
import SearchCard from '../../../../components/SearchCard';
import {events} from '../../../../utils/Data';
import PopUp from '../../../../components/PopUp';
import { COLORS } from '../../../../constants/colors/COLORS';
import useApp from '../../../../redux-toolkit/StateHooks/useApp';
const Bookmarks = ({navigation, route}) => {
  const {Bookmarks, addBookmarks, removeBookmarks } = useApp();
  const Array = Bookmarks
  const [PopUpMesage, setPopUpMesage] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showRemovePopUp, setShowRemovePopUp] = useState(false);




  const changeFavorite = (item) => {
    const existingItem = Bookmarks.find((event) => event.id === item.id);
  
    if (existingItem) {
      // If the item already exists, remove it and toggle the isFavorite property
      removeBookmarks(item.id);
      setShowPopUp(true);
      setPopUpMesage(`${existingItem.title} removed from your Bookmark`);
    } else {
      // If the item doesn't exist, add it and set it as a favorite
      addBookmarks({ ...item, isFavorite: true });
      setShowRemovePopUp(true);
      setPopUpMesage(`${item.title} added to your Bookmark`);
    }
  
    // Hide the popup after 3 seconds
    setTimeout(() => {
      setShowPopUp(false);
      setShowRemovePopUp(false);
    }, 3000);
  };

  const checkIfFavorite = (id, favArray) => {
    return favArray && favArray?.some(fav => fav.id === id);
  };


  return (
    <View style={AppStyles.searchMainContainer}>
      {showPopUp && (
          <PopUp
            color={COLORS.primary}
            heading={'Bookmark Added'}
            message={PopUpMesage}
          />
        )}
      {showRemovePopUp && (
          <PopUp
            color={COLORS.primary}
            heading={'Bookmark Removed'}
            message={PopUpMesage}
          />
        )}
      {Array.length === 0 ? (
        <CustomHeader
        leftSvg={<ArrowLeft width={wp(6)} height={hp(3)} />}
        leftOnpress={() => navigation.goBack()}
        heading={'Bookmarks'}
        headingStyle={AppStyles.headingTextStyle}
        containerStyle={styles.headerContainerStyle}
        secondRightSvg={<ThreeDots width={wp(6)} height={wp(6)} />}
        secondBtnContainerStyle={{
          justifyContent: 'flex-end',
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      />
      ) : (
        <CustomHeader
        leftSvg={<ArrowLeft width={wp(6)} height={hp(3)} />}
        leftOnpress={() => navigation.goBack()}
        heading={'Bookmarks'}
        headingStyle={AppStyles.headingTextStyle}
        containerStyle={styles.headerContainerStyle}
        rightSvg={<SearchBlack width={wp(6)} height={wp(8)} />}
        rightOnPress={()=> navigation.navigate('Search')}
        secondRightSvg={<ThreeDots width={wp(6)} height={wp(6)} />}
        secondBtnContainerStyle={{
          justifyContent: 'flex-end',
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      />
      )}
      {/* <ToggleSwitch
        options={[
          {label: 'UPCOMING', value: 'upcoming'},
          {label: 'PAST EVENTS', value: 'past'},
        ]}
        onSelect={handleSelect}
      /> */}
      {Array.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <EmptyEvent />
          <Text
            style={[
              AppStyles.headingTextStyle,
              {textAlign: 'center', width: '100%', marginVertical: hp('4%'), marginLeft: wp(0),},
            ]}>
            You Don't Have Bookmarks Yet
          </Text>
        </View>
      ) : (
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
          {Array?.map((item, index) => (
            <SearchCard key={index} event={item} showLocation={true} toggleFav={changeFavorite} isFavorite={checkIfFavorite(item.id, Bookmarks)} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  headerContainerStyle: {
    // justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: wp(10),
    marginBottom: wp(3),
  },
});
