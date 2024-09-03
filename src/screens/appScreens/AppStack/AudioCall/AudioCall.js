import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import CustomHeader from '../../../../components/CustomHeader';
import CustomButton from '../../../../components/customButton';
import { fonts } from '../../../../assets/fonts/fonts';
import { COLORS } from '../../../../constants/colors/COLORS';
import Volume from '../../../../assets/svgs/volume.svg';
import Mute from '../../../../assets/svgs/mute.svg';
import Call from '../../../../assets/svgs/call.svg';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

const AudioCall = ({navigation}) => {
    const [isMuted, setIsMuted] = useState(false);

  return (
    <LinearGradient colors={[COLORS.primary2, COLORS.primary]} style={styles.container}>

    <CustomHeader
        left={'chevron-left'}
        iconSize={wp(10)}
        leftIconColor={COLORS.white}
        leftOnpress={() => navigation.goBack()}
    />
    <View style={styles.imgContainer}>
        <View style={styles.imgWrapper}>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} style={styles.img} resizeMode="cover" />
        </View>
        <Text style={styles.name}>{'Ashfak Sayem'}</Text>
        <Text style={styles.name}>{'1:00:00'}</Text>
    </View>
    <View style={styles.callBtns}>
        <View>
            <CustomButton
                svg={<Volume width={wp(6)} height={wp(6)} />}
                containerStyle={[styles.iconContainer]}
                pressedRadius={wp('5%')}
                // onPress={toggleLoudSpeaker}
            />
        </View>

        <View>
            <CustomButton
                svg={<Call width={wp(10)} height={wp(10)} />}
                containerStyle={[styles.iconContainer, { borderRadius: wp(10) }]}
                onPress={() => {
                    navigation.goBack();
                }}
                pressedRadius={wp('10%')}
            />
        </View>

        <View>
            <CustomButton
                svg={<Mute width={wp(6)} height={wp(6)} />}
                containerStyle={[styles.iconContainer]}
                // onPress={toggleMute}
                pressedRadius={wp('5%')}
            />
        </View>
    </View>

    {isMuted && (
        <Modal transparent={true} animationType="fade">
            <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
            <View style={styles.overlay}>
                <View style={styles.mutedView}>
                    <Text style={styles.overlayText}>Call Muted</Text>
                </View>
                <View>
                    <View style={styles.callBtns}>
                        <View>
                            <CustomButton
                                svg={<Volume width={wp(6)} height={wp(6)} />}
                                containerStyle={[styles.iconContainer]}
                                pressedRadius={wp('5%')}
                                onPress={toggleLoudSpeaker}
                            />
                        </View>

                        <View>
                            <CustomButton
                                svg={<Call width={wp(10)} height={wp(10)} />}
                                containerStyle={[
                                    styles.iconContainer,
                                    { borderRadius: wp(10) },
                                ]}
                                onPress={() => navigation.goBack()}
                                pressedRadius={wp('10%')}
                            />
                        </View>

                        <View>
                            <CustomButton
                                svg={<Mute width={wp(6)} height={wp(6)} />}
                                containerStyle={[styles.iconContainer]}
                                onPress={toggleMute}
                                pressedRadius={wp('5%')}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )}
</LinearGradient>
  )
}

export default AudioCall

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: wp(7),
        paddingHorizontal: wp(5),
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mutedView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: wp(10),
    },
    imgWrapper: {
        overflow: 'hidden',
        borderRadius: wp(100),
        width: wp(45),
        height: wp(45),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF4D',
    },
    img: {
        width: wp(45),
        height: wp(45),
        resizeMode: 'cover',
    },
    name: {
        fontFamily: fonts.medium,
        fontSize: wp(5),
        color: COLORS.white,
        paddingTop: hp('1.5%'),
    },
    iconContainer: {
        justifyContent: 'center',
        padding: wp(2),
        backgroundColor: COLORS.white,
        borderRadius: wp('5%'),
    },
    callBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: wp(20),
        alignItems: 'center',
        paddingHorizontal: wp(20),
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: wp(5),
    },
    overlayText: {
        color: COLORS.white,
        fontSize: wp(5),
        fontFamily: fonts.regular,
    },
});
