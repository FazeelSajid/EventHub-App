import { createDrawerNavigator } from '@react-navigation/drawer';
import MyProfile from '../../screens/appScreens/BottomTabsScreens/MyProfile/MyProfile';
import Bookmarks from '../../screens/appScreens/DrawerScreens.js/Bookmarks/Bookmarks';
import Calendr from '../../screens/appScreens/DrawerScreens.js/Calender/Calender';
import Contact from '../../screens/appScreens/DrawerScreens.js/ContactUs.js/Contact';
import Help from '../../screens/appScreens/DrawerScreens.js/Helps/Help';
import Messages from '../../screens/appScreens/DrawerScreens.js/Messages/Messages';
import Setting from '../../screens/appScreens/DrawerScreens.js/Settings/Setting';
import BottomTabs from '../BottomTabs.js/BottomTabs';
import CustomDrawerComp from './customDrawercomp';

const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerComp {...props} />} screenOptions={{
        headerShown: false
    }} >
        <Drawer.Screen name="Explor" component={BottomTabs} />
        <Drawer.Screen name="Messages" component={Messages} />
        <Drawer.Screen name="Calender" component={Calendr} />
        <Drawer.Screen name="Bookmark" component={Bookmarks} />
        <Drawer.Screen name="Contact" component={Contact} />
        <Drawer.Screen name="Setting" component={Setting} />
        <Drawer.Screen name="Help" component={Help} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
