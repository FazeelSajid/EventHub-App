import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from '../Drawer/Drawer';
import BottomTabs from '../BottomTabs.js/BottomTabs';
import Search from '../../screens/appScreens/AppStack/Search/Search';
import EventDetailsScreen from '../../screens/appScreens/AppStack/EventDetailsScreen/EventDetailsScreen';
import Notification from '../../screens/appScreens/AppStack/NotificationsScreen/Notification';
import EditProfile from '../../screens/appScreens/AppStack/EditProfile/EditProfile';
import UserProfile from '../../screens/appScreens/AppStack/userProfile/UserProfile';
import Chat from '../../screens/appScreens/AppStack/Chat/Chat';
import { Calendar } from 'react-native-calendars';
import Calender from '../../screens/appScreens/DrawerScreens.js/Calender/Calender';
import ChangePassword from '../../screens/appScreens/DrawerScreens.js/Settings/ChangePassword/ChangePassword';
import Feedback from '../../screens/appScreens/DrawerScreens.js/Settings/Feedback/Feedback';
import PrivacyPolicy from '../../screens/appScreens/DrawerScreens.js/Settings/PrivcayPolicy/PrivacyPolicy';
import FAQS from '../../screens/appScreens/DrawerScreens.js/Settings/FAQS/FAQs';
import SeeAll from '../../screens/appScreens/AppStack/SeeAll.js/SeeAll';
import AudioCall from '../../screens/appScreens/AppStack/AudioCall/AudioCall';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Drawer'
      >
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      {/* <Stack.Screen name='BottomTabs' component={BottomTabs} /> */}
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SeeAll" component={SeeAll} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="audioCall" component={AudioCall} />
      <Stack.Screen name="FAQS" component={FAQS} />
    </Stack.Navigator>
  );
};

export default AppStack;
