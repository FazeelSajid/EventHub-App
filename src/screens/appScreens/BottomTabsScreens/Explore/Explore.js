import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, ScrollView, View, FlatList} from 'react-native';
import LocationCard from './Components/LocationCard';
import Badge from '../../../../components/Badge';
import CustomButton from '../../../../components/customButton';
import HorizontalListHeading from './Components/HorizontalListHeading';
import EventCard from './Components/EventCard';
import InviteCard from './Components/InviteCard';
import FilterBottomSheet from './Components/FilterBottomSheet';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {AppStyles, ComponentsStyle} from '../../../../utils/Styles';
import {BookmarkedEvents, EventsCategories, events} from '../../../../utils/Data';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../../constants/colors/COLORS';
import PopUp from '../../../../components/PopUp';
import useApp from '../../../../redux-toolkit/StateHooks/useApp';


const Explore = ({navigation}) => {
  const bottomSheetRef = useRef(null);
  const {
    Bookmarks, 
    addBookmarks,
    removeBookmarks
  } = useApp() 
  const [showPopUp, setShowPopUp] = useState(false);
  const [showRemovePopUp, setShowRemovePopUp] = useState(false);
  const [PopUpMesage, setPopUpMesage] = useState();
  const [popUpHeading, setPopUpHeading] = useState()
  const [showFilter, setShowFilter] = useState(false);


  const changeFavorite = (item) => {
    const existingItem = Bookmarks.find((event) => event.id === item.id);
  
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

  
  const handleApplyFilter = () => {
    bottomSheetRef.current?.dismiss();
    setShowPopUp(true);
    setPopUpHeading('Filter Applied');
    setPopUpMesage(`Filter applied successfully`);
    setTimeout(() => {
      setShowPopUp(false);
        }, 3000);
  };
  
  const checkIfFavorite = (id, favArray) => {
    return favArray && favArray?.some(fav => fav.id === id);
  };

  const renderBadge = ({item}) => {
    return <Badge svg={item.icon} bgColor={item.color} text={item.title} />;
  };

  const renderEventCard = ({item, index}) => (
    <EventCard event={item} key={index} togglFav={changeFavorite} isFav={checkIfFavorite(item.id, Bookmarks)} />
  );

  const renderHorizontalList = (title, screen) => (
    <>
      <HorizontalListHeading
        containerStyle={ComponentsStyle.HorizontalListHeadingContainer}
        rightHeading={title}
        leftHeading={'See All'}
        rightHeadingStyle={ComponentsStyle.headingTextStyle}
        leftHeadingStyle={ComponentsStyle.seeAllTextStyle}
        leftOnpress={() => navigation.navigate('SeeAll', {screen})}
      />
      <FlatList
        contentContainerStyle={[
          AppStyles.rowContainer,
          {paddingHorizontal: wp(3)},
        ]}
        horizontal
        data={events}
        renderItem={renderEventCard}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );

  return (
    <BottomSheetModalProvider>
      <ScrollView style={AppStyles.mainContainer}>
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
        <LocationCard bottomSheetRef={bottomSheetRef} setShowFilter={setShowFilter} />

        <FlatList
          data={EventsCategories}
          renderItem={renderBadge}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flexDirection: 'row', alignItems: 'center'}}
          style={{position: 'absolute', top: wp(35)}}
        />

        {renderHorizontalList('Upcoming Events', 'Upcoming')}
        <InviteCard />
        {renderHorizontalList('Nearby You', 'NearBy')}
      </ScrollView>

       
       
      <FilterBottomSheet bottomSheetRef={bottomSheetRef} handleApplyFilter={handleApplyFilter} />
       
       
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    borderRadius: wp(10),
    backgroundColor: COLORS.white,
  },
});

export default Explore;
