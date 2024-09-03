import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ComponentsStyle } from '../utils/Styles'

const Badge = ({svg, text,textColor,bgColor}) => {
  return (
    <TouchableOpacity style={[ComponentsStyle.badgeContainer, {backgroundColor: bgColor}]} >
      {svg}
      <Text style={[ComponentsStyle.badgeTxtColor, textColor]} >{text}</Text>
    </TouchableOpacity>
  )
}

export default Badge

const styles = StyleSheet.create({})