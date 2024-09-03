import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
// import COLORS from '../../Config/Colors';
// import { Icon } from 'react-native-paper';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../constants/colors/COLORS';
import {fonts} from '../assets/fonts/fonts';
import CustomButton from './customButton';

const TxtInput = ({
  style,
  rightIcon,
  placeholder,
  rightIconSize,
  rightIconColor,
  keyboardType,
  onChangeText,
  value,
  onBlur,
  multiline,
  leftIcon,
  leftIconSize,
  leftIconColor,
  secureTextEntry,
  onFocus,
  onPress,
  error,
  placeholderTextColor,
  rightIconPress,
  rightIconContainerStyle,
  isEmoji,
  containerStyle,
  svg,
  rightIconFocusColor,
  selectableColor,
  inputStyle,
  leftSvg,
  btnText,
  leftBtnStyle,
  leftBtnPress
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const [isfocused, setFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={style}>
      <View
        style={[
          styles.searchContainer,
          containerStyle,
          isfocused && styles.focused,
        ]}>
        {rightIcon && (
          <CustomButton
            icon={rightIcon}
            iconSize={rightIconSize}
            iconColor={isfocused ? rightIconFocusColor : rightIconColor}
            onPress={rightIconPress}
            style={styles.iconBtn}
            containerStyle={rightIconContainerStyle}
          />
        )}
        {svg && svg}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          style={[styles.searchInput, inputStyle]}
          selectionColor={selectableColor ? selectableColor : COLORS.primary}
          keyboardType={keyboardType}
          onFocus={() => (onFocus ? onFocus() : setFocused(true))}
          onChangeText={onChangeText}
          value={value}
          onBlur={() => setFocused(false)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          multiline={multiline}
          onPress={onPress}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.icon}>
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color={isPasswordVisible ? COLORS.primary : COLORS.lightGray}
            />
          </TouchableOpacity>
        )}
        {leftSvg && (
          <CustomButton
            svg={leftSvg}
            text={btnText}
            textStyle={{
              fontSize: wp(3.5),
              fontFamily: fonts.regular,
              color: COLORS.white,
              marginLeft: wp(1),
            }}
            containerStyle={leftBtnStyle}
            onPress={leftBtnPress}
          />
        )}
      </View>
      {error && error}
    </View>
  );
};

export default TxtInput;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: wp('2.5%'),
    paddingHorizontal: wp('3%'),
    // marginBottom: wp('3%'),
  },
  searchInput: {
    // color: COLORS.black,
    fontFamily: fonts.regular,
    color: COLORS.blackTxtColor,
    marginLeft: wp(1),
    flex: 1,
  },
  focused: {
    borderColor: COLORS.darkGray,
    borderWidth: wp(0.3),
    // borderBlockEndColor: COLORS.logoColor1,
  },
  icon: {
    marginRight: wp(2),
  },
  iconBtn: {
    paddingHorizontal: wp(3),
  },
});
