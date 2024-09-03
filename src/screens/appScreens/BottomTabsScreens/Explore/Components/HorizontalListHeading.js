import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppStyles } from '../../../../../utils/Styles'
import CustomButton from '../../../../../components/customButton'

const HorizontalListHeading = ({ containerStyle, rightHeading, leftHeading, rightHeadingStyle, leftHeadingStyle, leftOnpress }) => {
  return (
    <View style={containerStyle} >
    <Text style={rightHeadingStyle}>{rightHeading}</Text>
    <CustomButton text={leftHeading} textStyle={leftHeadingStyle} onPress={leftOnpress} />
    </View>
  )
}

export default HorizontalListHeading

const styles = StyleSheet.create({})