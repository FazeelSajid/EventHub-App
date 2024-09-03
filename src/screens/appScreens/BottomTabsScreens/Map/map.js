import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AppStyles} from '../../../../utils/Styles';
import {COLORS} from '../../../../constants/colors/COLORS';
import CustomButton from '../../../../components/customButton';
import Badge from '../../../../components/Badge';
import SearchCard from '../../../../components/SearchCard';
import {fonts} from '../../../../assets/fonts/fonts';
import Gps from '../../../../assets/svgs/BlueGps.svg';
import {events, MapEventsCategories} from '../../../../utils/Data';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import useApp from '../../../../redux-toolkit/StateHooks/useApp';
import PopUp from '../../../../components/PopUp';


const Map = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [location, setLocation] = useState();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const {Bookmarks, addBookmarks, removeBookmarks} = useApp();

  const [PopUpMesage, setPopUpMesage] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showRemovePopUp, setShowRemovePopUp] = useState(false);

  const renderBadge = ({item, index}) => {
    // console.log(item);

    return (
      <Badge
        svg={item.icon}
        key={index}
        bgColor={item.color}
        text={item.title}
        textColor={{color: COLORS.blackColor, fontSize: wp(4)}}
      />
    );
  };
  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const newData = events.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredEvents(newData);
    } else {
      setFilteredEvents([]);
    }
  };

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        console.log(position);

        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  };

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

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (result === RESULTS.GRANTED) {
        getLocation();
      }
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getLocation();
      }
    }
  };

  return (
    <View style={AppStyles.mainContainer}>
      <MapView
        initialRegion={{
          latitude: location?.latitude ? location?.latitude : 37.7747,
          longitude: location?.longitude ? location?.longitude : -122.4191,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{flex: 1}}>
        {events.map(event => (
          <Marker
            key={event.id}
            coordinate={event.coordinate}
            // onPress={() => handleMarkerPress(event)} 
            >
            {/* <View style={styles.markerContainer}> */}
              {/* <View style={styles.markerIconContainer}> */}
                {event.category.icon}
              {/* </View> */}
              <View style={styles.pointer} />
            {/* </View> */}
          </Marker>
        ))}
      </MapView>

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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <CustomButton
          icon={'chevron-left'}
          iconSize={wp(8)}
          iconColor={COLORS.blackTxtColor}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchBar}
            placeholder="Find food or restaurant..."
            value={searchText}
            onChangeText={text => handleSearch(text)}
            placeholderTextColor={COLORS.darkGray}
          />
          {filteredEvents.length > 0 && (
            <View style={styles.dropdown}>
              <FlatList
                data={filteredEvents}
                // keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('EventDetails', {event: item})}>
                    <Text style={styles.itemText}>{item.title}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <CustomButton
          svg={<Gps />}
          containerStyle={styles.gpsButton}
          onPress={requestLocationPermission}
        />
      </View>

{filteredEvents.length === 0 && (
    <FlatList
    data={MapEventsCategories}
    renderItem={renderBadge}
    keyExtractor={(item, index) => index.toString()}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{flexDirection: 'row', alignItems: 'center'}}
    style={{position: 'absolute', top: wp(23)}}
  />
)}
      

      <FlatList
        data={filteredEvents.length > 0 ? filteredEvents : events}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        style={styles.eventList}
        renderItem={({item}) => (
          <View
            style={{width: wp(90)}}
            key={({item, index}) => index.toString()}>
            <SearchCard
              event={item}
              map={true}
              containerStyle={{marginLeft: wp(3)}}
              toggleFav={changeFavorite}
              isFavorite={checkIfFavorite(item.id, Bookmarks)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    width: '90%',
    backgroundColor: 'transparent',
    top: hp(3),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: wp(2),
    paddingVertical: wp(1),
    paddingHorizontal: wp(3),
  },
  searchBar: {
    height: hp(5),
    color: COLORS.blackTxtColor,
    width: '100%',
  },
  dropdown: {
    position: 'absolute',
    top: hp(5),
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderWidth: wp(0.3),
    borderColor: COLORS.lightGrayColor,
    borderRadius: wp(2),
    zIndex: 1,
    maxHeight: hp(20),
  },
  item: {
    padding: wp(3),
    borderBottomWidth: wp(0.3),
    borderBottomColor: COLORS.lightGrayColor,
  },
  itemText: {
    fontSize: wp(3.5),
    fontFamily: fonts.regular,
    color: COLORS.blackTxtColor,
  },
  gpsButton: {
    marginLeft: wp(3),
    backgroundColor: COLORS.white,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
  },
  eventList: {
    position: 'absolute',
    bottom: hp(3),
    left: 0,
    right: 0,
  },
  markerContainer: {
    // alignItems: 'center',
  },
  markerIconContainer: {
    backgroundColor: COLORS.white,
    borderRadius: wp(2),
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(12),
    height: wp(12),
  },
  pointer: {
    width: wp(2),
    height: wp(3),
    backgroundColor: COLORS.white,
    transform: [{rotate: '45deg'}],
    marginTop: -wp(1.5),
    borderRadius: wp(1),
  },
});
