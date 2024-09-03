import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../../../../constants/colors/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Map from '../../../../../assets/svgs/map.svg';
import FilledBookmark from '../../../../../assets/svgs/FilledBookmark.svg';
import Bookmark from '../../../../../assets/svgs/bookmark.svg';
import { ComponentsStyle } from '../../../../../utils/Styles';
import { useNavigation } from '@react-navigation/native';
import { events } from '../../../../../utils/Data';


const EventCard = ({event, togglFav, isFav}) => {


  const navigation = useNavigation()
  return (
    <TouchableOpacity style={ComponentsStyle.eventCardContainer} onPress={()=>navigation.navigate('EventDetails', {event: event})} >
      <Image source={event.image} style={ComponentsStyle.eventCardImage} />
      <View
        style={ComponentsStyle.eventCarddateNBookmarkContainer}>
        <View style={ComponentsStyle.eventCardDateContainer}>
          <Text style={ComponentsStyle.eventCardDateDay}>{event.dat.day}</Text>
          <Text style={ComponentsStyle.eventCardDateMonth}>{event.dat.month}</Text>
        </View>
        <TouchableOpacity onPress={()=> togglFav(event)}  style={[ComponentsStyle.eventCardDateContainer, {height: hp(4)}]}>
          {isFav ? <FilledBookmark width={wp(4)} height={hp(2)} />: <Bookmark width={wp(4)} height={hp(2)} /> }
        </TouchableOpacity>
      </View>

      <View style={ComponentsStyle.eventCardInfoContainer}>
        <Text style={ComponentsStyle.eventCardEventTitle} numberOfLines={1} ellipsizeMode='tail' >{event.title}</Text>

        <View style={[ComponentsStyle.eventCardAttendeesContainer]}>
          {event.attendees.map((attendee, index) => (
            <View style={[ComponentsStyle.eventCardAttendeeImage, {zIndex: index}]} key={index}>
                {attendee.image}
            </View>
            
            // <Image
            //   key={index}
            //   source={{uri: attendee.image}}
            //   style={[ComponentsStyle.eventCardAttendeeImage, {zIndex: index}]}
            // />
          ))}
          <Text
            style={
              ComponentsStyle.eventCardAttendeeCount
            }>{`+ ${event.attendees.length} Going`}</Text>
        </View>

        <View style={ComponentsStyle.eventCardLocationContainer}>
          {/* <Icon name="map-marker" size={wp('3.5%')} color={COLORS.mediumGray} /> */}
          <Map width={wp(5)} />
          <Text style={ComponentsStyle.eventCardLocationText}>{event.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  
  
  
  
  
 

});
