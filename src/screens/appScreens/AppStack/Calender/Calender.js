import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        customHeaderTitle = {<View style={{width: 10, height: 10, backgroundColor: 'green'}} ></View>}


        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          '2021-03-16': { marked: true, dotColor: 'red' },
          '2021-03-20': { marked: true, dotColor: 'green' },
        }}
        renderArrow={(direction) => (
          <Icon
            name={direction === 'left' ? 'chevron-back' : 'chevron-forward'}
            size={24}
            color="red" // Change the color of the arrow icons
          />
        )}
        customHeader = {<View style={{width: 10, height: 10, backgroundColor: 'green'}} ></View>}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: 'black', // Change the color of weekday text
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: 'red',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          arrowColor: 'orange',
          monthTextColor: 'black',
          indicatorColor: 'blue',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
           textSectionTitleDisabledColor: 'red'
        }}
        // theme={{
        //   textSectionTitleDisabledColor: 'red'
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
});

export default MyCalendar;
