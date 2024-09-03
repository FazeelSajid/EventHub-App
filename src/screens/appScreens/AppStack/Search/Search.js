import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AppStyles } from '../../../../utils/Styles';
import CustomHeader from '../../../../components/CustomHeader';
import { COLORS } from '../../../../constants/colors/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ArrowLeft from '../../../../assets/svgs/arrowLeft.svg';
import SearchSvg from '../../../../assets/svgs/searchBlue.svg';
import Filter from '../../../../assets/svgs/filter.svg';
import ThreeDots from '../../../../assets/svgs/threeDots.svg';
import TxtInput from '../../../../components/TxtInput';
import SearchCard from '../../../../components/SearchCard';
import { events } from '../../../../utils/Data';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import FilterBottomSheet from '../../BottomTabsScreens/Explore/Components/FilterBottomSheet';
import useApp from '../../../../redux-toolkit/StateHooks/useApp';
import PopUp from '../../../../components/PopUp';


const Search = ({ navigation }) => {
  const [Array] = useState(events);
  const bottomSheetRef = useRef(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showRemovePopUp, setShowRemovePopUp] = useState(false);
  const [PopUpMesage, setPopUpMesage] = useState();
  const [popUpHeading, setPopUpHeading] = useState()

  const {Bookmarks, addBookmarks, removeBookmarks} = useApp();


  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const changeFavorite = item => {
    const existingItem = Bookmarks.find(event => event.id === item.id);

    if (existingItem) {
      // If the item already exists, remove it and toggle the isFavorite property
      removeBookmarks(item.id);
      setShowRemovePopUp(true);
      setPopUpHeading('Bookmark Removed')
      setPopUpMesage(`${existingItem.title} removed from your Bookmark`);
    } else {
      // If the item doesn't exist, add it and set it as a favorite
      addBookmarks({ ...item, isFavorite: true });
      setShowPopUp(true);
      setPopUpMesage(`${item.title} added to your Bookmark`);
      setPopUpHeading('Bookmark Added')
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
  const handleApplyFilter = () => {
    bottomSheetRef.current?.dismiss();
    setShowPopUp(true);
    setPopUpHeading('Filter Applied');
    setPopUpMesage(`Filter applied successfully`);
    setTimeout(() => {
      setShowPopUp(false);
        }, 3000);
  };
  return (
    // <BottomSheetModalProvider>

    <View style={AppStyles.searchMainContainer}>
       {showPopUp && (
          <PopUp
            color={COLORS.green}
            heading={popUpHeading}
            message={PopUpMesage}
          />
        )}
      {showRemovePopUp && (
          <PopUp
            color={COLORS.redishColor}
            heading={popUpHeading}
            message={PopUpMesage}
          />
        )}
      <CustomHeader
        leftSvg={<ArrowLeft widht={wp(10)} height={hp(3)} />}
        leftOnpress={() => navigation.goBack()}
        heading="Search"
        headingStyle={AppStyles.headingTextStyle}
        containerStyle={styles.headerContainerStyle}
      />

      <TxtInput
        containerStyle={[AppStyles.txtInput, styles.txtInput]}
        placeholder={'| Search...'}
        inputStyle={{ fontSize: wp(5), flex: 1 }}
        placeholderTextColor={COLORS.mediumGray}
        svg={<SearchSvg width={wp(6)} height={wp(8)} />}
        leftSvg={<Filter width={wp(7)} height={wp(6)} />}
        btnText={'Filters'}
        leftBtnStyle={AppStyles.txtInputFilterBtnStyle}
        leftBtnPress={handlePresentModalPress}
      />

      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        {Array?.map((item, index) => (
          <SearchCard key={index} event={item}  toggleFav={changeFavorite} isFavorite={checkIfFavorite(item.id, Bookmarks)}/>
        ))}
      </ScrollView>

    
          <FilterBottomSheet bottomSheetRef={bottomSheetRef} handleApplyFilter={handleApplyFilter}  />
    
    </View>
   

  );
};

export default Search;

const styles = StyleSheet.create({
  headerContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: wp(10),
    // marginBottom: wp(2),
  },
  txtInput: {
    backgroundColor: COLORS.white,
    marginTop: wp(3),
  },
  bottomSheetBackground: {
    borderRadius: wp(10),
    backgroundColor: COLORS.white,
  },
});
