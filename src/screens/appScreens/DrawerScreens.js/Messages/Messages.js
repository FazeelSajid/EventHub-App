import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../../../constants/colors/COLORS';
import CustomHeader from '../../../../components/CustomHeader';
import {AppStyles} from '../../../../utils/Styles';
import Svg from '../../../../assets/svgs/svg';
import ThreeDots from '../../../../assets/svgs/threeDots.svg';
import ArrowLeft from '../../../../assets/svgs/arrowLeft.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import database from '@react-native-firebase/database';
import {fonts} from '../../../../assets/fonts/fonts';
import {FlatList} from 'react-native-gesture-handler';
import TxtInput from '../../../../components/TxtInput';
import SearchBlue from '../../../../assets/svgs/searchBlue.svg';

const Messages = ({navigation}) => {
  const [allusers, setAllUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);


  const [senderId, setSenderId] = useState(10);
  const [senderName, setSenderName] = useState('Fazeel'); 

  const unReadMsgPress = ( item) => {
    const usersRef = database().ref(`/users/${senderId}/${item.id}`);
    usersRef.update({ exist: true });
    navigation.navigate('Chat', {organizer: {
      id: item.id,
      name: item.name,
      img: item.avatar,
    }});
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const newData = allusers.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase()),
      );
      setSearchUsers(newData)
    }
    //  else{
    //   setAllUsers([])
    // }
  };

  useEffect(() => {
    const usersRef = database().ref(`/users/${senderId}`);

    const handleData = snapshot => {
      const usersData = snapshot.val();
      if (usersData) {
        // const usersArray = Object.keys(usersData).map(key => ({
        //   id: key,
        //   ...usersData[key],
        // }));

        const usersArray = Object.keys(usersData)
          .map(key => ({
            id: key,
            ...usersData[key],
          }))
          .filter(user => user.id !== '0');
        console.log('Users Array:', usersArray); // Add this line to debug
        setAllUsers(usersArray); // Update state with the users array
      } else {
        setAllUsers([]); // Clear users array if no data is found
      }
    };

    usersRef.on('value', handleData);

    return () => {
      usersRef.off('value', handleData);
    };
  }, []);

  const truncateString = (str, num) => {

    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  const ListItem = ({item}) => {
    // console.log(allusers);
    

    if (!item.exist) {
      return (
        // <Swipeable renderRightActions={() => renderRightActions(item)}>
          <TouchableOpacity
          onPress={() => unReadMsgPress(item)}
            style={[styles.listItem, { backgroundColor:  `${COLORS.primary2}20`, justifyContent: 'space-between', paddingHorizontal: wp(2), borderRadius: wp(2) }]}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={{ uri: item.avatar }} style={styles.image} />
              <View
                style={{
                  marginLeft: wp(3),
                }}>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={[styles.itemText, { color: COLORS.darkGray }]}>
                  {truncateString(item.lastMessage.text, 20)}
                </Text>
              </View>
            </View>
            <Text style={styles.unreadListItemTextStyle}>
              Waiting for reply
            </Text>
          </TouchableOpacity>
        // </Swipeable>
      );
    } else {
      if (item['unreadMessages']?.length > 0) {
         
        return(
          // <Swipeable renderRightActions={() => renderRightActions(item)}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Chat', {organizer: {
                id: item.id,
                name: item.name,
                img: item.avatar,
              }});
            }}
            style={[styles.listItem, {backgroundColor: '#F5BF031F', borderRadius: wp(2)}]}>
            <View>
              <Image source={{ uri: item.avatar }} style={styles.image} />
            </View>
            <View
              style={{
                marginLeft: wp(3),
                // borderBottomColor: COLORS.lightGrayColor,
                // borderBottomWidth: wp(0.2),
                paddingBottom: hp(1),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: wp(70),
                }}>
                <Text style={[styles.itemText, { fontFamily: fonts.medium }]}>
                  {item.name}
                </Text>
                <Text style={[styles.itemText, { color: COLORS.darkGray }]}>
                  {item.lastMessage.createdAt}
                </Text>
              </View>
              <View style={{ flexDirection: 'row',justifyContent: 'space-between' }}>
              <Text style={[styles.itemText, { color: COLORS.darkGray }]}>
              {truncateString(item.lastMessage.text, 30)}
              </Text>
              <Text style={[styles.itemText, { backgroundColor: COLORS.primary, paddingHorizontal: wp('1.5%'), color: COLORS.blackTxtColor,paddingVertical: wp(0.3), borderRadius: wp(2.5), borderColor: COLORS.primary, borderWidth: wp(0.1)  }]} >
                {item['unreadMessages']?.length}
              </Text>
              </View>
            </View>
          </TouchableOpacity>

        )
      } else {
    return (
      // <Swipeable renderRightActions={() => renderRightActions(item)}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Chat', {
            organizer: {
              id: item.id,
              name: item.name,
              image: item.avatar,
            },
          });
        }}
        style={styles.listItem}>
        {/* <View> */}
          <Image source={{uri: item.avatar}} style={styles.image} />
        {/* </View> */}
        <View
          style={{
            marginLeft: wp(3),
            borderBottomColor: COLORS.lightGray,
            borderBottomWidth: wp(0.2),
            paddingBottom: hp(2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: wp(70),
            }}>
            <Text style={[styles.itemText, {fontFamily: fonts.medium}]}>
              {item.name}
            </Text>
            <Text style={[styles.itemText, {color: COLORS.darkGray}]}>
              {item.lastMessage.createdAt}
            </Text>
          </View>
          <Text style={[styles.itemText, {color: COLORS.darkGray}]}>
            {item.lastMessage.text}
          </Text>
        </View>
      </TouchableOpacity>
      // </Swipeable>
    );
    }

    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        // leftSvg={<ArrowLeft width={wp(6)} height={hp(3)} />}

        leftOnpress={() => navigation.goBack()}
        heading={'Messages'}
        headingStyle={[AppStyles.headingTextStyle, {color: COLORS.white}]}
        containerStyle={styles.headerContainerStyle}
        // secondRightSvg={<ThreeDots width={wp(6)} height={wp(6)} />}
        secondBtnContainerStyle={{
          justifyContent: 'flex-end',
          flexGrow: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      />
       <TxtInput placeholder={'Search'} onChangeText={handleSearch} placeholderTextColor={COLORS.darkGray} containerStyle={[AppStyles.txtInput, styles.txtInput]} leftSvg={<SearchBlue/>}  />

      <FlatList
        data={searchUsers.length > 0 ?searchUsers : allusers}
        renderItem={({item}) => {
          return <ListItem item={item} />;
        }}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainerStyle: {
    // justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: wp(10),
    paddingBottom: wp(5),
    marginBottom: wp(3),
    backgroundColor: COLORS.primary,
    paddingHorizontal: wp(4),

  },
  txtInput: {
    backgroundColor: COLORS.white,
    // marginTop: wp(3),
    borderColor: COLORS.lightGray,
    borderWidth: wp(0.3),
    borderRadius: wp(2)
  },
  listItem: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingLeft: wp(8),
    alignItems: 'center',
    // paddingRight: wp(8),
    // marginVertical: wp(1),
    paddingVertical: wp(2),
    // borderBottomColor: COLORS.blackColor,
    // borderBottomWidth: wp(2),
    // backgroundColor: 'green'
  },
  unreadListItemTextStyle: {
    padding: wp(1),
    marginLeft: wp(3),
    fontSize: wp(2.5),
    color: COLORS.blackColor,
    backgroundColor: COLORS.primary,
    borderRadius: wp(1),
    paddingHorizontal: wp(2),
  },
  image: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(10),
    // backgroundColor: '#F5BF03',
  },
  itemText: {
    marginTop: hp('1%'),
    fontFamily: fonts.regular,
    fontSize: wp(3.2),
    color: COLORS.blackColor,
  },
});
