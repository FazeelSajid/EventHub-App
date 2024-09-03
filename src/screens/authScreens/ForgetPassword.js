import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../constants/colors/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../components/CustomHeader';
import {fonts} from '../../assets/fonts/fonts';
import TxtInput from '../../components/TxtInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../components/customButton';
import VerificationInput from '../../components/VerificationInput';
import PopUp from '../../components/PopUp';
import {Authstyles} from '../../utils/Styles';
import Mail from '../../assets/svgs/message.svg';
import Lock from '../../assets/svgs/Lock.svg';
import ButtonArrow from '../../assets/svgs/buttonArrow.svg';
import ArrowLeft from '../../assets/svgs/arrowLeft.svg';


// import useAuth from '../../../hooks/useAuth';
const emailValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const resetValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ForgetPassword = ({route, navigation}) => {
  const {screen} = route.params;
  console.log(screen);
  
  const [verificationCode, setVerificationCode] = useState('');
  const [resetPassSuccess, setResetPassSuccess] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [otpPopUp, setOtpPopUp] = useState(false);
  const [wrongOtpPopUp, setWrongOtpPopUp] = useState(false);
  const [countdown, setCountdown] = useState(20); // Initial countdown time
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  // const {forgetPass, forgetPassState, resetPass, resetPassState} = useAuth();


  useEffect(() => {
    if (screen === 'verification') {
      
      if (countdown > 0) {
        const timer = setInterval(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearInterval(timer);
      } else {
        setIsResendEnabled(true);
      }
    }
  }, [countdown]);

  const handleResendCode = () => {
    setIsResendEnabled(false);
    setCountdown(20);
    // Trigger resend code functionality here
  };
  const handleVerificationCodeChange = code => {
    setVerificationCode(code);

    // console.log(verificationCode);
  };

  const emailCallBack = status => {
    if (status === 'succeeded') {
      setOtpPopUp(true);
      setTimeout(() => {
        setOtpPopUp(false);
        navigation.replace('forgetPass', {screen: 'verification'});
      }, 4000);
    } else if (status === 'failed') {
      setErrorPopUp(true);
      setTimeout(() => {
        setErrorPopUp(false);
      }, 3000);
    }
  };
  const resetPassCallBack = status => {
    if (status === 'succeeded') {
      setResetPassSuccess(true);
      setTimeout(() => {
        setResetPassSuccess(false);
        navigation.navigate('signin');
      }, 4000);
    }
  };

  const handleEmailSubmit = values => {
    // forgetPass(values, emailCallBack);
    console.log(values, 'emailSubmit');
    navigation.replace('ForgetPassword', {screen: 'verification'});
  };

  const handleResetSubmit = values => {
    navigation.navigate('SignIn')
    console.log(values, 'emailSubmit');
  };

  // console.log(forgetPassState);
  // console.log(userEmail);
  // console.log(forgetPassState, 'forgetPass');

  return (
    <KeyboardAvoidingView style={Authstyles.forgetPassMainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {otpPopUp && (
          <PopUp
            color={'#04C200'}
            heading={'Success'}
            // message={forgetPassState.success}
          />
        )}
        {errorPopUp && (
          <PopUp
            color={'red'}
            heading={'Failed'}
            // message={forgetPassState.error}
          />
        )}
        {wrongOtpPopUp && (
          <PopUp
            color={'red'}
            heading={'Failed'}
            message={'Incorrect Otp Code'}
          />
        )}
        {resetPassSuccess && (
          <PopUp
            color={'#04C200'}
            heading={'Success'}
            // message={resetPassState.success}
          />
        )}
        <CustomHeader
          leftSvg={<ArrowLeft/>}
          iconSize={wp('10%')}
          leftIconColor={COLORS.blackTxtColor}
          leftOnpress={() =>
            screen === 'verification'
              ? navigation.navigate('ForgetPassword', {screen: 'forget'})
              : screen === 'reset' ? navigation.navigate('ForgetPassword', {screen: 'verification'}) : navigation.goBack()
          }
        />

        <Text style={Authstyles.forgetPassheading}>
          {screen === 'forget'
            ? 'Recover your account with your email address'
            : screen === 'verification'
            ? 'Verification'
            : 'Reset Password'}
        </Text>
        <Text
          style={[
            Authstyles.forgetPassSubHeading,
            // screen === 'forget'
            //   ? {fontFamily: fonts.regular, marginBottom: hp(7),color: COLORS.blackTxtColor, paddingHorizontal: wp(6) }
            //   : screen === 'verification'
            //   ? {fontFamily: fonts.regular, color: COLORS.blackTxtColor, paddingHorizontal: wp(6) }
            //   : {fontFamily: fonts.regular, marginBottom: hp(7), },
          ]}>
          {screen === 'forget'
            ? 'We will send you a code to connect to your account'
            : screen === 'verification'
            ? 'We’ve send you the verification code on +1 2620 0323 7631'
            : 'Enter your new password'}
        </Text>

        {screen === 'forget' ? (
          <Formik
            initialValues={{email: 'fazeel.sajid89@gmail.com'}}
            validationSchema={emailValidationSchema}
            onSubmit={handleEmailSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TxtInput
                  containerStyle={Authstyles.TextInput}
                  placeholder={'abc@email.com'}
                  placeholderTextColor={COLORS.mediumGray}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  svg={<Mail width={wp(6)} height={wp(5)} />}
                  error={
                    touched.email &&
                    errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )
                  }
                />

                <TouchableOpacity
                  style={[
                    Authstyles.ButtonContainer,
                    {
                      flexDirection: 'row',
                    },
                  ]}
                  onPress={handleSubmit}
                  >
                  <Text style={Authstyles.ButtonText}>Confirm</Text>
                  <View style={Authstyles.ButtonArrowLogo}>
                    <ButtonArrow width={wp(8)} height={wp(7)} />
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        ) : screen === 'verification' ? (
          <>
            <View style={{paddingHorizontal: wp('8%'),}}>
              <VerificationInput
                numberOfInputs={4}
                onChange={handleVerificationCodeChange}
                inputStyle={styles.input}
              />
            </View>

            <TouchableOpacity
                  style={[
                    Authstyles.ButtonContainer,
                    {
                      flexDirection: 'row',
                    },
                  ]}
                  onPress={() => {
                    if (true) {
                      navigation.replace('ForgetPassword', {screen: 'reset'});
                    } else {
                      setWrongOtpPopUp(true);
                      setTimeout(() => {
                        setWrongOtpPopUp(false);
                      }, 4000);
                    }
                  }}
                  >
                  <Text style={Authstyles.ButtonText}>Continue</Text>
                  <View style={Authstyles.ButtonArrowLogo}>
                    <ButtonArrow width={wp(8)} height={wp(7)} />
                  </View>
                </TouchableOpacity>

                <View style={Authstyles.resendCodeContainer}>
        {isResendEnabled ? (
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={{ color: COLORS.primary,  fontFamily:fonts.medium }}>Re-send code</Text>
          </TouchableOpacity>
        ) : (
          <Text style={Authstyles.resendCode}>Re-send code in <Text style={{color: COLORS.primary, fontFamily:fonts.medium}} >0:{countdown}s</Text></Text>
        )}
      </View>

          </>
        ) : (
          <Formik
            initialValues={{ password: '',
              confirmPassword: ''}}
            validationSchema={resetValidationSchema}
            onSubmit={handleResetSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <TxtInput
                  containerStyle={Authstyles.TextInput}
                  placeholder={'New Password'}
                  placeholderTextColor={COLORS.mediumGray}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  svg={<Lock width={wp(6)} height={wp(5)} />}
                  error={
                    touched.password &&
                    errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )
                  }
                  secureTextEntry={true}
                />
                <TxtInput
                  containerStyle={Authstyles.TextInput}
                  placeholder={'Confirm Password'}
                  placeholderTextColor={COLORS.mediumGray}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  svg={<Lock width={wp(6)} height={wp(5)} />}
                  error={
                    touched.confirmPassword &&
                    errors.confirmPassword && (
                      <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                    )
                  }
                  secureTextEntry={true}
                />

                <TouchableOpacity
                  style={[
                    Authstyles.ButtonContainer,
                    {
                      flexDirection: 'row',
                    },
                  ]}
                  onPress={handleSubmit}
                  >
                  <Text style={Authstyles.ButtonText}>Confirm</Text>
                  <View style={Authstyles.ButtonArrowLogo}>
                    <ButtonArrow width={wp(8)} height={wp(7)} />
                  </View>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp('6%'),
    paddingTop: hp('4%'),
    backgroundColor: COLORS.blackColor,
  },
  heading: {
    fontFamily: fonts.medium,
    fontSize: wp('6%'),
    color: COLORS.blackTxtColor,
    // textAlign: 'center',
    marginTop: hp('1%'),
    // marginBottom: hp('3%'),
    marginLeft: hp(2.2)
  },
  btn: {
    paddingVertical: wp('3%'),
  },
  btnText: {
    fontFamily: fonts.regular,
  },
  errorText: {
    color: 'red',
    fontSize: wp(3.5),
    // marginTop: 5,
  },
  input: {
    borderColor: COLORS.lightGray,
    borderWidth: 2,
  },
  successContainer: {},
  successText: {
    fontSize: wp('4%'),
    color: '#155724',
    fontWeight: 'bold',
  },
  successMessage: {
    fontSize: wp('3.5%'),
    color: '#155724',
    textAlign: 'center',
    marginTop: hp('1%'),
  },
});
