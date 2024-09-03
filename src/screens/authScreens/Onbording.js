import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Authstyles} from '../../utils/Styles';
import {Images} from '../../assets/Images/Images';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {COLORS} from '../../constants/colors/COLORS';
import CustomButton from '../../components/customButton';
import Swiper from 'react-native-swiper';
import {fonts} from '../../assets/fonts/fonts';

const Onboarding = ({navigation}) => {
  const [selectedPage, setSelectedPage] = useState(0);

  const pages = [
    {
      image: Images.onbordingDevice,
      heading: 'Explore Upcoming and Nearby Events',
      subHeading:
        'Discover exciting events near you and stay updated on upcoming happenings.',
    },
    {
      image: Images.onbordingCalender,
      heading: 'We Have Modern Events Calendar Feature',
      subHeading:
        'Easily manage and explore events with our advanced calendar features.',
    },
    {
      image: Images.onbordingMap,
      heading: 'To Look Up More Events or Activities Nearby By Map',
      subHeading:
        'Navigate and find local events or activities nearby with map.',
    },
  ];

  // useEffect(() => {
  //   // This effect will run every time selectedPage is updated
  //   console.log('Page changed to:', selectedPage);
  //   // You can perform any side effects here, like analytics, fetching data, etc.
  // }, [selectedPage]);

  const handleNavigation = route => {
    navigation.navigate(route);
  };

  const handleSkip = () => {
    handleNavigation('SignIn');
  };

  const handleNext = () => {
    if (selectedPage < pages.length - 1) {
      setSelectedPage(selectedPage + 1);
    } else {
      handleNavigation('SignIn');
    }
  };

  return (
    <View style={Authstyles.mainContainer}>
      <Swiper
        loop={false}
        onIndexChanged={index => setSelectedPage(index)}
        showsPagination={false}
        index={selectedPage}>
        {pages.map((page, index) => (
          <View key={index}>
            <Image source={page.image} style={Authstyles.OnbordingImage} />
          </View>
        ))}
      </Swiper>

      {pages[selectedPage] && (
        <View style={Authstyles.OnbordingContentContainer}>
          <Text style={Authstyles.OnbordingHeadingTextStyle}>
            {pages[selectedPage].heading}
          </Text>
          <Text
            style={[Authstyles.OnbordingHeadingTextStyle, styles.subHeading]}>
            {pages[selectedPage].subHeading}
          </Text>
          <View style={Authstyles.OnbordingButtonContainer}>
            {selectedPage !== pages.length - 1 && (
              <CustomButton
                text="Skip"
                textStyle={styles.skipButton}
                onPress={handleSkip}
              />
            )}

            <View style={styles.pagination}>
              {pages.map((_, index) => {
                const isCurrent = selectedPage === index;
                return (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      {
                        width: isCurrent ? wp(5) : wp(2.5),
                        backgroundColor: isCurrent ? COLORS.white : '#ffffff50',
                        borderColor: isCurrent ? COLORS.white : '#ffffff50',
                      },
                    ]}
                  />
                );
              })}
            </View>

            <View style={{flex: 1}}>
              <CustomButton
                text={
                  selectedPage === pages.length - 1 ? 'Get Started' : 'Next'
                }
                textStyle={styles.nextButton}
                onPress={handleNext}
                containerStyle={{alignSelf: 'flex-end'}}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  subHeading: {
    paddingVertical: wp(5),
    fontSize: wp(4),
    fontFamily: 'AirbnbCereal_Light',
  },
  nextButton: {
    color: COLORS.white,
    fontSize: wp(4),
    fontFamily: fonts.regular,
  },
  skipButton: {
    color: COLORS.white,
    fontSize: wp(4),
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    left: wp(30),
  },
  dot: {
    height: wp(2.5),
    borderRadius: wp(1),
    marginHorizontal: wp(1),
  },
});
