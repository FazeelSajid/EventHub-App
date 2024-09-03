import React, { useCallback, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Explore from '../../screens/appScreens/BottomTabsScreens/Explore/Explore';
import Events from '../../screens/appScreens/BottomTabsScreens/Events/Events';
import Map from '../../screens/appScreens/BottomTabsScreens/Map/map';
import MyProfile from '../../screens/appScreens/BottomTabsScreens/MyProfile/MyProfile';
import AddEvent from '../../screens/appScreens/BottomTabsScreens/AddEvent/AddEvent';
import { COLORS } from '../../constants/colors/COLORS';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Calender from '../../assets/svgs/TabCalendar.svg';
import BlueCalendar from '../../assets/svgs/BlueCalendar.svg';
import AddEvnt from '../../assets/svgs/addBoxTab.svg';
import MapSvg from '../../assets/svgs/map.svg';
import MapTab from '../../assets/svgs/mapTab.svg';
import User from '../../assets/svgs/user.svg';
import { View, TouchableOpacity } from 'react-native';
import useAuth from '../../redux-toolkit/StateHooks/useAuth';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const { setAuthState } = useAuth();
  const bottomSheetRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.darkGray,
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: COLORS.white,
            height: hp('8%'),
            paddingBottom: hp('1%'),
            display: route.name === 'Events' ? 'none' : 'flex', // Hide tab bar on Events screen
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Events') {
              return focused ? (
                <BlueCalendar width={wp(4.5)} fill={COLORS.primary} />
              ) : (
                <Calender width={wp(5)} />
              );
            } else if (route.name === 'Explore') {
              iconName = focused ? 'compass' : 'compass-outline';
              return (
                <Icon
                  name={iconName}
                  size={wp('6%')}
                  color={focused ? COLORS.primary : COLORS.mediumGray}
                />
              );
            } else if (route.name === 'AddEvent') {
              return (
                <TouchableOpacity
                  style={styles.addEventButton}
                  onPress={() => handlePresentModalPress()}
                >
                  <AddEvnt
                    fill={COLORS.white}
                    width={wp('5%')}
                    height={hp('5%')}
                  />
                </TouchableOpacity>
              );
            } else if (route.name === 'Map') {
              return focused ? (
                <MapTab width={wp('6%')} height={hp('6%')} />
              ) : (
                <MapSvg width={wp('6%')} height={hp('6%')} />
              );
            } else {
              return focused ? (
                <User fill={COLORS.primary} width={wp('6%')} height={hp('6%')} />
              ) : (
                <User
                  fill={COLORS.mediumGray}
                  width={wp('6%')}
                  height={hp('6%')}
                />
              );
            }
          },
        })}
      >
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="Events" component={Events} />
        <Tab.Screen name="AddEvent" component={AddEvent} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Profile" component={MyProfile} />
      </Tab.Navigator>
      <AddEvent bottomSheetRef={bottomSheetRef} />
    </>
  );
};

export default BottomTabs;

const styles = {
  addEventButton: {
    width: wp('14%'),
    height: wp('14%'),
    backgroundColor: COLORS.primary,
    borderRadius: wp('8%'),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: hp('2%'),
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
};
