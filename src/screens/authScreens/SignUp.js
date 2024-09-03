import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Authstyles } from '../../utils/Styles';
import { COLORS } from '../../constants/colors/COLORS';
import Mail from '../../assets/svgs/message.svg';
import Lock from '../../assets/svgs/Lock.svg';
import SignInButton from '../../assets/svgs/SignInButton.svg';
import Google from '../../assets/svgs/google.svg';
import Facebook from '../../assets/svgs/fb.svg';
import User from '../../assets/svgs/user.svg';
import Arrow from '../../assets/svgs/arrowLeft.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TxtInput from '../../components/TxtInput';
import { Switch } from 'react-native-paper';
import CustomButton from '../../components/customButton';
import CustomHeader from '../../components/CustomHeader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../redux-toolkit/StateHooks/useAuth';

const SignUp = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { setAuthState, authState} = useAuth()


  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  const SignUpSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required'),
      // .min(3, 'Full name must be at least 3 characters long'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/,
      'Password must be strong. It should contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  return (
    <Formik
      initialValues={{ fullName: '', email: '', password: '', confirmPassword: '' }}
      validationSchema={SignUpSchema}
      onSubmit={(values) => {
        console.log('Form data:', values);
        navigation.navigate('SignIn')
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={[Authstyles.mainContainer, { paddingHorizontal: wp(4) }]}>
          <CustomHeader
            leftSvg={<Arrow/>}
            leftIconColor={COLORS.blackTxtColor}
            leftOnpress={() => navigation.goBack()}
          />
          <View style={{ paddingHorizontal: wp(4), marginTop: hp(2) }}>
            <Text style={Authstyles.SignHeading}>Sign Up</Text>
            <TxtInput
              containerStyle={[Authstyles.TextInput, touched.fullName && errors.fullName && {marginBottom: wp(0)} ]}
              placeholder={'Full name'}
              placeholderTextColor={COLORS.mediumGray}
              svg={<User width={wp(6)} height={wp(5)} />}
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              error={touched.fullName && errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}
            />
            <TxtInput
              containerStyle={[Authstyles.TextInput, touched.email && errors.email && {marginBottom: wp(0)} ]}
              placeholder={'abc@email.com'}
              placeholderTextColor={COLORS.mediumGray}
              svg={<Mail width={wp(6)} height={wp(5)} />}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            />
            <TxtInput
              containerStyle={[Authstyles.TextInput, touched.password && errors.password && {marginBottom: wp(0)} ]}
              placeholder={'Your Password'}
              placeholderTextColor={COLORS.mediumGray}
              svg={<Lock width={wp(6)} height={wp(5)} />}
              secureTextEntry={true}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            />
            <TxtInput
              containerStyle={[Authstyles.TextInput, touched.confirmPassword && errors.confirmPassword && {marginBottom: wp(0)} ]}
              placeholder={'Confirm Password'}
              placeholderTextColor={COLORS.mediumGray}
              svg={<Lock width={wp(6)} height={wp(5)} />}
              secureTextEntry={true}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              error={touched.confirmPassword && errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
            />
            {/* <View style={Authstyles.rowContainer}>
              <View style={Authstyles.rowContainer}>
                <Switch
                  trackColor={{ false: '#767577', true: '#5669FF' }}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                  thumbColor={isEnabled ? COLORS.white : COLORS.lightGray}
                />
                <Text style={Authstyles.forgetPassText}>Remember Me</Text>
              </View>
            </View> */}

            <TouchableOpacity
              style={[
                Authstyles.ButtonContainer,
                {
                  flexDirection: 'row',
                },
              ]}
              onPress={handleSubmit}
            >
              <Text style={Authstyles.ButtonText}>SIGN UP</Text>
              <View style={Authstyles.ButtonArrowLogo}>
                <SignInButton width={wp(8)} height={wp(7)} />
              </View>
            </TouchableOpacity>

            <Text style={Authstyles.ORtext}>OR</Text>

            <CustomButton
              text={`Sign Up with Google`}
              textStyle={[
                Authstyles.continueWithText,
                styles.continueWith,
              ]}
              svg={<Google width={wp(6)} height={wp(5)} />}
              containerStyle={[
                Authstyles.ButtonContainer,
                { backgroundColor: COLORS.white, marginBottom: wp(0) },
              ]}
            />
            <CustomButton
              text={`Sign Up with Facebook`}
              textStyle={[
                Authstyles.continueWithText,
               styles.continueWith
              ]}
              svg={<Facebook width={wp(6)} height={wp(5)} />}
              containerStyle={[
                Authstyles.ButtonContainer,
                { backgroundColor: COLORS.white, marginBottom: wp(7) },
              ]}
            />
            <View style={{ flexDirection: 'row', alignSelf: 'center' }} >

              <Text style={[Authstyles.forgetPassText]}>
                Already have an account?{' '}
              </Text>
              <CustomButton text={'Signin'} textStyle={Authstyles.dontHaveAccText} onPress={() => navigation.navigate('SignIn')} />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: hp(1),
  },
  continueWith: { color: COLORS.blackTxtColor, marginLeft: wp(4) },
});
