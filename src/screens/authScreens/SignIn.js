import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Authstyles} from '../../utils/Styles';
import {COLORS} from '../../constants/colors/COLORS';
import Logo from '../../assets/svgs/logo.svg';
import Mail from '../../assets/svgs/message.svg';
import Lock from '../../assets/svgs/Lock.svg';
import ButtonArrow from '../../assets/svgs/buttonArrow.svg';
import Google from '../../assets/svgs/google.svg';
import Facebook from '../../assets/svgs/fb.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TxtInput from '../../components/TxtInput';
import {Switch} from 'react-native-paper';
import CustomButton from '../../components/customButton';
import {fonts} from '../../assets/fonts/fonts';
import useAuth from '../../redux-toolkit/StateHooks/useAuth';

const SignIn = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { setAuthState, authState} = useAuth()
  console.log(authState);
  

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };
  return (
    <View style={[Authstyles.mainContainer, {paddingHorizontal: wp(8)}]}>
      <View style={Authstyles.logoContainer}>
        <Logo width={wp(20)} height={wp(18)} />
        <Text style={Authstyles.logoText}>EventHub</Text>
      </View>
      <View style={{flex: 3.8}}>
        <Text style={Authstyles.SignHeading}>Sign In</Text>
        <TxtInput
          containerStyle={Authstyles.TextInput}
          placeholder={'abc@email.com'}
          placeholderTextColor={COLORS.mediumGray}
          svg={<Mail width={wp(6)} height={wp(5)} />}
          // error={   <Text style={styles.errorText}>{'test'}</Text>}
        />
        <TxtInput
          containerStyle={Authstyles.TextInput}
          placeholder={'Your Password'}
          placeholderTextColor={COLORS.mediumGray}
          svg={<Lock width={wp(6)} height={wp(5)} />}
          secureTextEntry={true}
        />
        <View style={Authstyles.rowContainer}>
          <View style={Authstyles.rowContainer}>
            <Switch
              trackColor={{false: '#767577', true: '#5669FF'}}
              onValueChange={toggleSwitch}
              value={isEnabled}
              thumbColor={isEnabled ? COLORS.white : COLORS.lightGray}
            />
            <Text style={Authstyles.forgetPassText}>Remember Me</Text>
          </View>

          <CustomButton
            text={'Forgot Password?'}
            textStyle={[Authstyles.forgetPassText, styles.forgetPassText]}
            onPress={() => navigation.navigate('ForgetPassword',{screen: 'forget'})}
          />
        </View>

        <TouchableOpacity
          style={[
            Authstyles.ButtonContainer,
            {
              flexDirection: 'row',
            },
          ]}
          onPress={()=>setAuthState({isAuthenticated:true})}>
          <Text style={Authstyles.ButtonText}>Sign In</Text>
          <View style={Authstyles.ButtonArrowLogo}>
            <ButtonArrow width={wp(8)} height={wp(7)} />
          </View>
        </TouchableOpacity>

        <Text style={Authstyles.ORtext}>OR</Text>

        <CustomButton
          text={`Login In with Google`}
          textStyle={[
            Authstyles.continueWithText,
            {color: COLORS.blackTxtColor, marginLeft: wp(4)},
          ]}
          svg={<Google width={wp(6)} height={wp(5)} />}
          containerStyle={[
            Authstyles.ButtonContainer,
            {backgroundColor: COLORS.white, marginBottom: wp(0)},
          ]}
        />
        <CustomButton
          text={`Login In with Facebook`}
          textStyle={[
            Authstyles.continueWithText,
            {color: COLORS.blackTxtColor, marginLeft: wp(4)},
          ]}
          svg={<Facebook width={wp(6)} height={wp(5)} />}
          containerStyle={[
            Authstyles.ButtonContainer,
            {backgroundColor: COLORS.white, marginBottom: wp(7)},
          ]}
        />
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Text style={[Authstyles.forgetPassText]}>
            Don't have an account?
          </Text>
          <CustomButton
            text={'Sign Up'}
            textStyle={Authstyles.dontHaveAccText}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  forgetPassText: {
    color: COLORS.primary,
    fontFamily:fonts.medium
  },
});
