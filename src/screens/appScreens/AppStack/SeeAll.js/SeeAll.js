import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppStyles} from '../../../../utils/Styles';
import CustomHeader from '../../../../components/CustomHeader';
import {COLORS} from '../../../../constants/colors/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ArrowLeft from '../../../../assets/svgs/arrowLeft.svg';
import SearchBlack from '../../../../assets/svgs/search.svg';
import Filter from '../../../../assets/svgs/filter.svg';
import EmptyEvent from '../../../../assets/svgs/emptyEvent.svg';
import ThreeDots from '../../../../assets/svgs/threeDots.svg';
import SearchCard from '../../../../components/SearchCard';
import {events} from '../../../../utils/Data';
import ToggleSwitch from '../../AppStack/Search/Components/ToggleSwitch';
import {Text} from 'react-native-paper';
import {fonts} from '../../../../assets/fonts/fonts';
import useApp from '../../../../redux-toolkit/StateHooks/useApp';
import PopUp from '../../../../components/PopUp';

const SeeAll = ({navigation, route}) => {
  const [Array, setArray] = useState(events);
  // const [screenName, setScreenName] = useState(route.params?.screen || 'Events');
  const screenName= route.params?.screen
  console.log(screenName);
  

  const {Bookmarks, addBookmarks, removeBookmarks} = useApp();

  const [PopUpMesage, setPopUpMesage] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showRemovePopUp, setShowRemovePopUp] = useState(false);

  const changeFavorite = item => {
    const existingItem = Bookmarks.find(event => event.id === item.id);

    if (existingItem) {
      // If the item already exists, remove it and toggle the isFavorite property
      removeBookmarks(item.id);
      setShowRemovePopUp(true);
      setPopUpMesage(`${existingItem.title} removed from your Bookmark`);
    } else {
      // If the item doesn't exist, add it and set it as a favorite
      addBookmarks({...item, isFavorite: true});
      setShowPopUp(true);
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
          color={COLORS.green}
          heading={'Bookmark Added'}
          message={PopUpMesage}
        />
      )}
      {showRemovePopUp && (
        <PopUp
          color={COLORS.redishColor}
          heading={'Bookmark Removed'}
          message={PopUpMesage}
        />
      )}
      {Array.length === 0 ? (
        <CustomHeader
          leftSvg={<ArrowLeft width={wp(6)} height={hp(3)} />}
          leftOnpress={() => navigation.goBack()}
          heading={screenName}
          headingStyle={AppStyles.headingTextStyle}
          containerStyle={styles.headerContainerStyle}
          
        />
      ) : (
         <CustomHeader
        leftSvg={<ArrowLeft width={wp(6)} height={hp(3)} />}
        leftOnpress={() => navigation.goBack()}
        heading={screenName}
        headingStyle={AppStyles.headingTextStyle}
        containerStyle={styles.headerContainerStyle}
        secondRightSvg={<SearchBlack width={wp(6)} height={wp(6)} />}
        secondBtnContainerStyle={{
          justifyContent: 'flex-end',
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        secondRightOnPress={()=> navigation.navigate('Search')}
      />
      
      
      )}
      {Array.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <EmptyEvent />
          <Text
            style={[
              AppStyles.headingTextStyle,
              {textAlign: 'center', width: '100%', marginVertical: hp('4%')},
            ]}>
                {screenName === 'Upcoming'? 'No Upcoming Events' : 'No NearBy Events'}
   
          </Text>
        </View>
      ) : (
        <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
          {Array?.map((item, index) => (
            <SearchCard
              key={index}
              event={item}
              showLocation={true}
              toggleFav={changeFavorite}
              isFavorite={checkIfFavorite(item.id, Bookmarks)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
  headerContainerStyle: {
    // justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: wp(10),
    marginBottom: wp(3),
  },
});
