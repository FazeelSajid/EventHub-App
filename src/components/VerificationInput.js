import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors/COLORS';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const VerificationInput = ({ numberOfInputs = 4, onChange, containerStyle, inputStyle }) => {

    const [inputValues, setInputValue] = useState(Array(numberOfInputs).fill(''));
    const inputs = useRef([]);
    const [focusedIndex, setFocusedIndex] = useState(null); // Change state to track the index

    const handleOnChange = (value, index) => {
        const values = [...inputValues];
        values[index] = value;
        setInputValue(values);
        onChange(values.join(''));

        if (value && index < numberOfInputs - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKey = (key, index) => {
        if (key === 'Backspace' && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {inputValues.map((item, index) => {
                return (
                    <TextInput
                        key={index}
                        style={[
                            styles.input,
                            focusedIndex === index && styles.focused, // Apply focused style based on index
                        ]}
                        value={item}
                        onChangeText={(value) => handleOnChange(value, index)}
                        maxLength={1}
                        keyboardType='number-pad'
                        ref={(input) => inputs.current[index] = input}
                        onFocus={() => setFocusedIndex(index)} // Set the focused index
                        onBlur={() => setFocusedIndex(null)} // Clear the focused index
                        onKeyPress={({ nativeEvent: { key } }) => handleKey(key, index)}
                        selectionColor={COLORS.primary}
                        placeholder='-'
                        placeholderTextColor={COLORS.mediumGray}
                    />
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        width: wp('12%'),
        height: hp('6%'),
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        textAlign: 'center',
        fontSize: wp('5.5%'),
        borderRadius: wp('3%'),
        backgroundColor: COLORS.white,
        color: COLORS.blackTxtColor,
    },
    focused: {
        borderColor: COLORS.primary,
    },
});

export default VerificationInput;
