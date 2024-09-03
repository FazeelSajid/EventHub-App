import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/colors/COLORS'
// import { BarIndicator} from 'react-native-indicators'

const Loader = ({ color }) => {
    return (
        <ActivityIndicator
            size={"small"}
            color={color ?? COLORS.white}
        />
    )
}

export default Loader

const styles = StyleSheet.create({})