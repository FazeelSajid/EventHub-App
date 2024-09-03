import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const CustomDoubleIconButton = ({containerStyle, text,textStyle, leftSvg, rightSvg, onPress}) => {
  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}>
      {leftSvg}
      <Text style={textStyle}>
        {text}
      </Text>
      {rightSvg}
    </TouchableOpacity>
  );
};

export default CustomDoubleIconButton;

const styles = StyleSheet.create({});
