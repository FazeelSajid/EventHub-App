import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomHeader from '../../../../../components/CustomHeader';
import { COLORS } from '../../../../../constants/colors/COLORS'; 
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from '../../../../../assets/fonts/fonts';
import TxtInput from '../../../../../components/TxtInput';
import CustomButton from '../../../../../components/customButton';
import PopUp from '../../../../../components/PopUp';
import ArrowLeft from '../../../../../assets/svgs/arrowLeft.svg';

const ChangePassword = ({ navigation }) => {


  const [showPopUp, setShowPopup] = useState(false);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required('Old Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  return (
    <View style={styles.container}>
         {
            showPopUp && (
                <PopUp
                color={'#04C200'}
                heading={'Success'}
                message={'Reason submitted successfully!'}
              />
            )

  
        }
      <CustomHeader
        headingStyle={styles.heading}
        heading={'Change Password'}
        leftSvg={<ArrowLeft/>}
        leftIconColor={COLORS.blackTxtColor}
        iconSize={wp(8)}
        leftOnpress={() => navigation.goBack()}
      />

      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={values => {
          setTimeout(() => {
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
          navigation.navigate('Home')
            }, 1000);
          }, 2000);
        console.log('Submit Report');
          // Handle form submission
          console.log(values);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
          <View style={styles.inputsContainer}>
            <TxtInput
              value={values.oldPassword}
              onChangeText={handleChange('oldPassword')}
              onBlur={handleBlur('oldPassword')}
              containerStyle={styles.TxtInput}
              placeholder={'Old Password'}
              placeholderTextColor={COLORS.darkGray}
              secureTextEntry={true}
            />
            {touched.oldPassword && errors.oldPassword && (
              <Text style={styles.errorText}>{errors.oldPassword}</Text>
            )}
            <TxtInput
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              containerStyle={styles.TxtInput}
              placeholder={'New Password'}
              placeholderTextColor={COLORS.darkGray}
              secureTextEntry={true}
            />
            {touched.newPassword && errors.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}
            <TxtInput
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              containerStyle={styles.TxtInput}
              placeholder={'Confirm Password'}
              placeholderTextColor={COLORS.darkGray}
              secureTextEntry={true}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          
          </View>
          <View style={{flex:1, justifyContent: 'flex-end'}} >
        <CustomButton
        text={'Change Password'}
        containerStyle={styles.btn}
        textStyle={styles.btnText}
        onPress={handleSubmit}
      />
        </View>
        </>
        )}
        
      </Formik>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: hp('4%'),
    paddingHorizontal: wp('6%'),
  },
  heading: {
    fontFamily: fonts.medium,
    color: COLORS.blackTxtColor,
  },
  inputsContainer: {
    marginTop: wp(6),
  },
  TxtInput: {
    borderWidth: wp(0.2),
    borderColor: COLORS.lightGrayColor,
    marginVertical: wp(2),
    elevation: 3,
  },
  errorText: {
    color: 'red',
    fontSize: wp(3.5),
    marginBottom: wp(2),
  },
  btn: {
    // flex: 1,
    // alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    paddingVertical: wp(3),
    marginBottom: wp(20)
    // justifyContent: 'flex-end'
  },
  btnText: {
    fontSize: wp(4),
    color: COLORS.white,
    fontFamily: fonts.medium,
    textAlign: 'center',
  },
});
