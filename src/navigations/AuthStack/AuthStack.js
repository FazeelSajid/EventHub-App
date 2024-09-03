import ForgetPassword from '../../screens/authScreens/ForgetPassword';
import Onbording from '../../screens/authScreens/Onbording';
import SignIn from '../../screens/authScreens/SignIn';
import SignUp from '../../screens/authScreens/SignUp';
import Verification from '../../screens/authScreens/Verification';
import AppStack from '../AppStack/AppStack';
import DrawerNavigator from '../Drawer/Drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


const AuthStack = () => {
  return (
   <Stack.Navigator initialRouteName='Onbording' screenOptions={{headerShown:false}}>
    <Stack.Screen name='Onbording' component={Onbording} />
    <Stack.Screen name='SignIn' component={SignIn} />
    <Stack.Screen name='SignUp' component={SignUp} />
    <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
    <Stack.Screen name='Verification' component={Verification} />
    {/* <Stack.Screen name='AppStack' component={AppStack} /> */}
   </Stack.Navigator>
  )
}

export default AuthStack
