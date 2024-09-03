import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../constants/colors/COLORS';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Map from '../assets/svgs/map.svg';
import { ComponentsStyle } from '../utils/Styles';
import { useNavigation } from '@react-navigation/native';
import FilledBookmark from '../assets/svgs/FilledBookmark.svg';
import Bookmark from '../assets/svgs/bookmark.svg';


const SearchCard = ({ event , map, containerStyle, showLocation, toggleFav, isFavorite }) => {
  // console.log(event.image);
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('EventDetails', {event: event})} style={[ComponentsStyle.searchCardContainer, containerStyle]}>
      <Image source={event.image} style={ComponentsStyle.searchCardEventImage} />
      
      <View style={ComponentsStyle.searchCardTextContainer}>
        <View style={styles.rowContainer} >
        <Text style={[ComponentsStyle.searchCardDateText,   ]}  >{event.eventCardDate}</Text>
        <TouchableOpacity onPress={()=> toggleFav(event)} >
         {isFavorite ? <FilledBookmark width={wp(4.5)} height={hp(2.2)} /> : <Bookmark/>} 
        </TouchableOpacity>
        </View>
        <Text style={[ComponentsStyle.searchCardEventTitle, ]}>{event.title}</Text>
        
        {showLocation &&
        <View style={ComponentsStyle.searchCardLocationContainer}>
          <Map width={wp(4)} />
          <Text style={ComponentsStyle.searchCardLocationText}>{event.location}</Text>
        </View>}
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
