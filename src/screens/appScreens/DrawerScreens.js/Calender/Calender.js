import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import { COLORS } from '../../../../constants/colors/COLORS';
import CustomHeader from '../../../../components/CustomHeader';
import ThreeDots from '../../../../assets/svgs/threeDots.svg';
import ArrowLeft from '../../../../assets/svgs/arrowLeft.svg';
import { AppStyles } from '../../../../utils/Styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../../../assets/fonts/fonts';
import { Images } from '../../../../assets/Images/Images';
// Configure the calendar locale if needed
LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';
const events = [
  {
    id: '1',
    title: 'Gala Music Festival',
    time: '10:00 am - 12:30 pm',
    color: ['#ff9a9e', '#fecfef'],
    image: Images.upcomingEvent2,
  },
  {
    id: '2',
    title: "Women's Leadership",
    time: '10:00 am - 12:30 pm',
    color: ['#a18cd1', '#fbc2eb'],
    image: Images.upcomingEvent1,
  },
];

const Calendr = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  return (
    <View style={styles.container}>
        <CustomHeader
        leftSvg={<ArrowLeft width={wp(6)} height={hp(3)} />}
        leftOnpress={() => navigation.goBack()}
        heading={'Calendar'}
        headingStyle={AppStyles.headingTextStyle}
        containerStyle={styles.headerContainerStyle}
        secondRightSvg={<ThreeDots width={wp(6)} height={wp(6)} />}
        secondBtnContainerStyle={{
          justifyContent: 'flex-end',
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      />
      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: COLORS.primary },
          '2024-09-25': { marked: true, dotColor: COLORS.white, selected: true, selectedColor: 'tomato'},
          '2024-09-20': { marked: true, dotColor: COLORS.white, selected: true,  selectedColor: 'green' },
          '2024-09-10': { marked: true, dotColor: COLORS.white, selected: true,  selectedColor: COLORS.primary2 },
        }}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: COLORS.primary,
          selectedDayTextColor: '#ffffff',
          todayTextColor: COLORS.logoColor,
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          arrowColor: 'orange',
          monthTextColor: 'black',
          indicatorColor: 'blue',
        }}
        
      />
      <View style={{flexDirection: 'row', alignItems:'center', marginBottom: hp(2),}}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Mar</Text>
        <Text style={styles.dayText}>15</Text>
      </View>
        <Text style={styles.fullDateText}>MON, 15TH MARCH, 2021</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <FlatList
          data={events}
          renderItem={({ item }) => (
            <LinearGradient colors={item.color} style={styles.eventCard}>
              <View style={styles.eventContent}>
                <Image source={item.image} style={styles.eventImage} />
                <View>
                  <Text style={styles.timeText}>{item.time}</Text>
                  <Text style={styles.titleText}>{item.title}</Text>
                </View>
              </View>
            </LinearGradient>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: wp(5),
    backgroundColor: COLORS.white,
  },
  headerContainerStyle: {
    // justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: wp(5),
    marginBottom: wp(3),
  },
  dateContainer: {
    alignItems: 'center',
    backgroundColor: '#e0e7ff',
    borderRadius: 10,
    paddingVertical: hp(0.6),
    paddingHorizontal: 15,
    marginRight: wp(2)
  },
  dateText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  dayText: {
    color: COLORS.primary,
    fontSize: 24,
    fontFamily: fonts.bold
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  fullDateText: {
    color: '#333',
    fontSize: 16,
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  eventCard: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  eventContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  timeText: {
    color: COLORS.white,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  titleText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: fonts.bold,

  },
});

export default Calendr;
