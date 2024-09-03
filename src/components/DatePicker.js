import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Platform } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../constants/colors/COLORS';

const DatePicker = ({showDatePicker,value, onChange }) => {
 

  return (
    <View style={styles.container}>
     
{/* 
      {showDatePicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )} */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: familyColors.BACKGROUNDCOLOR,
    flex: 1,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    height: 40,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default DatePicker;
