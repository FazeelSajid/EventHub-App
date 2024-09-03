import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import CustomHeader from '../../../../../components/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from '../../../../../assets/fonts/fonts';
import { COLORS } from '../../../../../constants/colors/COLORS'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowLeft from '../../../../../assets/svgs/arrowLeft.svg';



const FAQItem = ({ item, isOpen, onPress }) => {
  return (
    // <View>
      <TouchableOpacity onPress={onPress} style={[isOpen ? styles.answerContainer : styles.itemContainer]}>
        <View style={{width: wp(75)}} >
        <Text style={[styles.question ,isOpen && {fontFamily: fonts.medium ,marginBottom: hp(2), width: wp(70) } ]}>{item.question}</Text>
       {isOpen && <Text style={styles.answer}>{item.answer}</Text>}
        </View>
       

        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={wp(7)} color={isOpen ? COLORS.primary :COLORS.blackTxtColor} />
      
      </TouchableOpacity>
    //   {/* {isOpen && (
    //     <View style={styles.answerContainer}>
    //       <Text style={[styles.question, {marginBottom: hp(2)}]}>{item.question}</Text>
    //       <Text style={styles.answer}>{item.answer}</Text>
    //     </View>
    //   )} */}
    // {/* </View> */}
  );
};

const FAQS = ({ navigation }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'Is this dating app free to use?',
      answer: 'Yes, our dating app offers a free version with basic features like browsing profiles and sending likes. However, we also offer a premium subscription that unlocks additional features and benefits for a more enhanced experience.',
    },
    {
      id: 2,
      question: 'Can I edit my profile information after creating it?',
      answer: 'Yes, you can edit your profile information at any time from the profile settings.',
    },
    {
      id: 3,
      question: 'What is the matching algorithm used in this dating app?',
      answer: 'Our matching algorithm uses a combination of location, interests, and preferences to suggest potential matches.',
    },
    {
      id: 4,
      question: 'How can I report inappropriate or offensive content or behavior?',
      answer: 'You can report inappropriate or offensive content by clicking on the report button available on the user\'s profile or message.',
    },
    {
      id: 5,
      question: 'Can I delete my account if I no longer want to use the app?',
      answer: 'Yes, you can delete your account from the account settings at any time.',
    },
    {
      id: 6,
      question: 'How do I contact customer support if I have a question or issue?',
      answer: 'You can contact customer support through the help section in the app or by emailing our support team.',
    },
    {
      id: 7,
      question: 'Can I use this dating app on multiple devices with the same account?',
      answer: 'Yes, you can use the app on multiple devices by logging in with the same account credentials.',
    },
  ];

  const handlePress = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        headingStyle={styles.heading}
        heading={'FAQs'}
        leftSvg={<ArrowLeft/>}
        leftIconColor={COLORS.blackTxtColor}
        iconSize={wp(8)}
        leftOnpress={() => navigation.goBack()}
      />
      <FlatList
        data={faqs}
        style={{marginTop: hp(2)}}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <FAQItem
            item={item}
            isOpen={index === openIndex}
            onPress={() => handlePress(index)}
          />
        )}
      />
    </View>
  );
};

export default FAQS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: hp('4%'),
    paddingHorizontal: wp('6%'),
  },
  heading: {
    fontFamily: fonts.medium,
    color: COLORS.blackTxtColor,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrayColor,
    // flexGrow: 1
  },
  question: {
    fontFamily: fonts.medium,
    fontSize: wp('4%'),
    color: COLORS.blackTxtColor,
    width: wp(80)
  },
  icon: {
    fontFamily: fonts.bold,
    fontSize: wp('4%'),
    color: COLORS.blackTxtColor,
  },
  answerContainer: {
    // paddingVertical: hp('2%'),
    backgroundColor: `${COLORS.primary}90`,
    padding: hp(2),
    marginTop: hp(1),
    borderRadius: wp(2),
    flexDirection: 'row',
    // width: wp(8)
    // position: 'absolute'

  },
  answer: {
    fontFamily: fonts.medium,
    fontSize: wp('3.5%'),
    color: COLORS.white,
  },
});
