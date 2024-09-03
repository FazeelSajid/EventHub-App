import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../../../../constants/colors/COLORS';

const ToggleSwitch = ({ options, onSelect }) => {
  const [selected, setSelected] = useState(options[0].value);

  const handleSelect = (value) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.button,
            selected === option.value && styles.selectedButton,
          ]}
          onPress={() => handleSelect(option.value)}
        >
          <Text
            style={[
              styles.buttonText,
              selected === option.value && styles.selectedText,
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: wp('5%'), // Make it rounded
    padding: wp('1%'),
    alignSelf: 'center',
    marginTop: hp(1.5)
  },
  button: {
    flex: 1,
    paddingVertical: hp('1%'),
    alignItems: 'center',
    borderRadius: wp('5%'),
  },
  selectedButton: {
    backgroundColor: '#ffffff', // White background for the selected option
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.2%') },
    shadowOpacity: 0.2,
    shadowRadius: wp('1%'),
    elevation: 2, // Adds a subtle shadow for depth
  },
  buttonText: {
    fontSize: wp('3.5%'),
    color: '#8e8e8e', // Grey color for unselected text
  },
  selectedText: {
    color: COLORS.primary
  },
});

export default ToggleSwitch;
