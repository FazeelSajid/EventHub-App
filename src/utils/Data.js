
import { Images } from "../assets/Images/Images";
import Music from "../assets/svgs/music.svg";
import BlueMusic from "../assets/svgs/BlueMusic.svg";
import MusicGrey from "../assets/svgs/musicGray.svg";
import MapMusic from "../assets/svgs/MapMusic.svg";
import FoodGrey from "../assets/svgs/foodGray.svg"; 
import Food from "../assets/svgs/food.svg"; 
import MapFood from "../assets/svgs/mapFood.svg"; 
import GreenFood from "../assets/svgs/greenFood.svg"; 
import Football from "../assets/svgs/football.svg";
import MapFootball from "../assets/svgs/MapFootball.svg";
import RedFootball from "../assets/svgs/redFootball.svg";
import Attendee1 from "../assets/svgs/attendee1.svg";
import Attendee2 from "../assets/svgs/attendee2.svg";
import Attendee3 from "../assets/svgs/attendee3.svg";
import Art from "../assets/svgs/Art.svg";
import MapArt from "../assets/svgs/MapArt.svg";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
 import { COLORS } from "../constants/colors/COLORS";

  export const events = [
    {
      id : 1,
      image:  Images.upcomingEvent1,
      title: 'International Band Music Concert',
      eventCardDate: '1st  May- Sat -2:00 PM',
      category: {
        name: 'Art',
        icon: <MapArt width={wp(10)} height={hp(10)}/>,
      },
      dat: {
        day: '10',
        month: 'JUNE',
      },
      date: '14 December, 2021',
      time: 'Tuesday, 4:00PM - 9:00PM',
      location: '36 Guild Street London, UK',
      street: 'Gala Convention Center',
      organizer: {
        id: 1,
        name: 'Ashfak Sayem',
        image: 'https://randomuser.me/api/portraits/men/4.jpg' ,
      },
      description:
        'Enjoy your favorite dish and a lovely time with friends and family. Local food trucks will be available for provisions. Enjoy your favorite dish and a lovely time with friends and family. Local food trucks will be available for provisions.',
      ticketPrice: 120,
      attendees: [
        { image: <Attendee1/> }, // Replace with actual user image URLs
        { image: <Attendee2/> },
        { image: <Attendee3/> },
      ],
      coordinate: { latitude: 37.7749, longitude: -122.4194 },
      isFavorite: true
      },
    {
      id : 2,
      image:  Images.upcomingEvent2,
      title: 'Jo Malone London’s Mother’s Day Presents',
      eventCardDate: '1st  May- Sat -2:00 PM',
      category: {
        name: 'Food',
        icon: <MapFood width={wp(10)} height={hp(10)}/>,
      },
      dat: {
        day: '10',
        month: 'JUNE',
      },
      date: '14 December, 2021',
      time: 'Tuesday, 4:00PM - 9:00PM',
      location: '36 Guild Street London, UK',
      street: 'Gala Convention Center',
      organizer: {
        id: 2,
        name: 'Ashfak Sayem',
        image: 'https://randomuser.me/api/portraits/men/5.jpg' ,
      },
      description:
        'Enjoy your favorite dish and a lovely time with friends and family. Local food trucks will be available for provisions. Enjoy your favorite dish and a lovely time with friends and family. Local food trucks will be available for provisions.',
      ticketPrice: 120,
      attendees: [
        { image: <Attendee1/> }, // Replace with actual user image URLs
        { image: <Attendee2/> },
        { image: <Attendee3/> },
      ],
      coordinate: { latitude: 37.7752, longitude: -122.4198 },
      isFavorite: false
      },
    {
      id : 3,
      image:  Images.upcomingEvent3,
      title: 'International Band Music Concert',
      eventCardDate: '1st  May- Sat -2:00 PM',
      category: {
        name: 'Music',
        icon: <MapMusic width={wp(10)} height={hp(10)}/>,
      },
      dat: {
        day: '10',
        month: 'JUNE',
      },
      date: '14 December, 2021',
      time: 'Tuesday, 4:00PM - 9:00PM',
      location: '36 Guild Street London, UK',
      street: 'Gala Convention Center',
      organizer: {
        id: 3,
        name: 'Ashfak Sayem',
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
      },
      description:
        'Enjoy your favorite dish and a lovely time with friends and family. Local food trucks will be available for provisions. Enjoy your favorite dish and a lovely time with friends and family. Local food trucks will be available for provisions.',
      ticketPrice: 120,
      attendees: [
        { image: <Attendee1/> }, // Replace with actual user image URLs
        { image: <Attendee2/> },
        { image: <Attendee3/> },
      ],
      coordinate: { latitude: 37.7760, longitude: 122.4192 },
      isFavorite: false, //

      },
    {
      id : 4,
      image:  Images.upcomingEvent4,
      title: 'International Band Music Concert',
      eventCardDate: '1st  May- Sat -2:00 PM',
      category: {
        name: 'Food',
        icon: <MapMusic width={wp(10)} height={hp(10)}/>,
        bgcolor: '#29D697'
      },
      dat: {
        day: '10',
        month: 'JUNE',
      },
      date: '14 December, 2021',
      time: 'Tuesday, 4:00PM - 9:00PM',
      location: '36 Guild Street London, UK',
      street: 'Gala Convention Center',
      organizer: {
        id: 4,
        name: 'Ashfak Sayem',
        image: 'https://randomuser.me/api/portraits/men/7.jpg',
      },
      description:
        'Enjoy your favorite dish and a lovely time with friends and family. Local food trucks will be available for provisions. Enjoy your favorite dish and a lovely time with friends and family. Local food trucks will be available for provisions.',
      ticketPrice: 120,
      attendees: [
        { image: <Attendee1/> }, // Replace with actual user image URLs
        { image: <Attendee2/> },
        { image: <Attendee3/> },
      ],
      coordinate: { latitude: 37.7747, longitude: -122.4191 },
      isFavorite: true
      },
    {
      id : 5,
      image:  Images.upcomingEvent2,
      title: 'International Band Music Concert',
      eventCardDate: '1st  May- Sat -2:00 PM',
      category: {
        name: 'Football',
        icon: <MapFootball width={wp(10)} height={hp(10)} />,
        bgcolor: '#EE544A'
      },
      dat: {
        day: '10',
        month: 'JUNE',
      },
      date: '14 December, 2021',
      time: 'Tuesday, 4:00PM - 9:00PM',
      location: '36 Guild Street London, UK',
      street: 'Gala Convention Center',
      organizer: {
        id: 5,
        name: 'Ashfak Sayem',
        image: 'https://randomuser.me/api/portraits/men/8.jpg',
      },
      description:
        'Enjoy your favorite dish and a lovely time with friends and family. Local food trucks will be available for provisions. Enjoy your favorite dish and a lovely time with friends and family. Local food trucks will be available for provisions.',
      ticketPrice: 120,
      attendees: [
        { image: <Attendee1/> }, // Replace with actual user image URLs
        { image: <Attendee2/> },
        { image: <Attendee3/> },
      ],
      coordinate: { latitude: 37.7744, longitude: -122.4189 },
      isFavorite: false,
      },
    
]
  

export const MapEventsCategories = [
    {
      title: 'Music',
      icon: <BlueMusic width={wp(5)} height={wp(5)} fill={COLORS.primary} />,
      color: COLORS.white,
    },
    {
      title: 'Sport',
      icon: <RedFootball width={wp(5)} height={wp(5)} fill={COLORS.primary} />,
      color: COLORS.white,
    },
    {
      title: 'Food',
      icon: <GreenFood width={wp(5)} height={wp(5)} fill={COLORS.primary} />,
      color: COLORS.white,
    },
    {
      title: 'Music',
      icon: <BlueMusic width={wp(5)} height={wp(5)} fill={COLORS.primary} />,
      color: COLORS.white,
    },
  ];
export const EventsCategories = [
  {
    title: 'Gamming Online',
    icon: <Art width={wp(4)} height={wp(4)} fill={COLORS.primary} />,
    color: COLORS.primary,
  },
    {
      title: 'Music',
      icon: <Music width={wp(4)} height={wp(4)} fill={COLORS.primary} />,
      color: '#F59762',
    },
    {
      title: 'Sport',
      icon: <Football width={wp(4)} height={wp(4)} fill={COLORS.primary} />,
      color: '#F0635A',
    },
    {
      title: 'Food',
      icon: <Food width={wp(4)} height={wp(4)} fill={COLORS.primary} />,
      color: '#29D697',
    },
    {
      title: 'Art',
      icon: <Art width={wp(4)} height={wp(4)} fill={COLORS.primary} />,
      color: '#F59762',
    },
  ];
export const ProfileEventsCategories = [
  {
    title: 'Gaming Online',
    color: COLORS.primary,
  },
  {
    title: 'Concert',
    color: '#EE544A',
  },
  {
    title: 'Music',
    color: '#F59762',
  },
  {
    title: 'Art',
    color: '#7D67EE',
  },
  {
    title: 'Movie',
    color: '#29D697',
  },
  {
    title: 'Sports',
    color: '#FF6347',
  },
  {
    title: 'Travel',
    color: '#3CB371',
  },
  {
    title: 'Technology',
    color: '#4682B4',
  },
  {
    title: 'Food & Drink',
    color: '#FFD700',
  },
  {
    title: 'Fitness',
    color: '#FF4500',
  },
  {
    title: 'Photography',
    color: '#87CEEB',
  },
  {
    title: 'Books',
    color: '#8A2BE2',
  },
  {
    title: 'Dance',
    color: '#FF69B4',
  },
  {
    title: 'Theater',
    color: '#B22222',
  },
  {
    title: 'Networking',
    color: '#20B2AA',
  },
];

export const filterCategories = [
  {
    title: 'Sport',
    icon: <Football width={wp(8)} height={wp(8)} fill={COLORS.primary} />,
    color: '#F0635A',
  },
    {
      title: 'Music',
      icon: <MusicGrey width={wp(8)} height={wp(8)} fill={COLORS.primary} />,
      color: '#F59762',
    },
    {
      title: 'Art',
      icon: <Art width={wp(8)} height={wp(8)} fill={COLORS.primary} />,
      color: '#F59762',
    },
    {
      title: 'Food',
      icon: <FoodGrey width={wp(8)} height={wp(8)} fill={COLORS.primary} />,
      color: '#29D697',
    },
  ];


export  const SearchedEvents = [
    {
      image: Images.upcomingEvent1, // Replace with actual image URL
      date: '1st  May- Sat -2:00 PM',
      title: 'Jo Malone London’s Mother’s Day Presents',
    },
    {
      image: Images.upcomingEvent2, // Replace with actual image URL
      date: '1st  May- Sat -2:00 PM',
      title: 'International Band Music Event',
    },
    {
      image: Images.upcomingEvent3, // Replace with actual image URL
      date: '1st  May- Sat -2:00 PM',
      title: 'Jo Malone London’s Mother’s Day Presents',
    },
    {
      image: Images.upcomingEvent4, // Replace with actual image URL
      date: '1st  May- Sat -2:00 PM',
      title: 'Jo Malone London’s Mother’s Day Presents',
    },
    {
      image: Images.upcomingEvent1, // Replace with actual image URL
      date: '1st  May- Sat -2:00 PM',
      title: 'Jo Malone London’s Mother’s Day Presents',
    },
    {
      image: Images.upcomingEvent2, // Replace with actual image URL
      date: '1st  May- Sat -2:00 PM',
      title: 'Jo Malone London’s Mother’s Day Presents',
    },

  ]
 export const inviteFriendsData = [
    { id: 1, name: 'Alex Lee', followers: '2k', avatar: 'https://randomuser.me/api/portraits/men/33.jpg' },
    { id: 2, name: 'Michael Ulasi', followers: 56, avatar:  'https://randomuser.me/api/portraits/men/42.jpg' },
    { id: 3, name: 'Cristofer', followers: 300, avatar:  'https://randomuser.me/api/portraits/men/54.jpg' },
    { id: 4, name: 'Alex Lee', followers: '2k', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
    { id: 5, name: 'Michael Ulasi', followers: 56, avatar:  'https://randomuser.me/api/portraits/men/77.jpg' },
    { id: 6, name: 'Cristofer', followers: 300, avatar:  'https://randomuser.me/api/portraits/men/96.jpg' },
    { id: 7, name: 'Alex Lee', followers: '2k', avatar: 'https://randomuser.me/api/portraits/men/18.jpg' },
    { id: 8, name: 'Michael Ulasi', followers: 56, avatar:  'https://randomuser.me/api/portraits/men/9.jpg' },
    { id: 9, name: 'Cristofer', followers: 300, avatar:  'https://randomuser.me/api/portraits/men/10.jpg' },
    { id: 10, name: 'Alex Lee', followers: '2k', avatar: 'https://randomuser.me/api/portraits/men/11.jpg' },
    { id: 12, name: 'Michael Ulasi', followers: 56, avatar:  'https://randomuser.me/api/portraits/men/12.jpg' },
    { id: 13, name: 'Cristofer', followers: 300, avatar:  'https://randomuser.me/api/portraits/men/13.jpg' },
    { id: 14, name: 'Alex Lee', followers: '2k', avatar: 'https://randomuser.me/api/portraits/men/34.jpg' },
    { id: 15, name: 'Michael Ulasi', followers: 56, avatar:  'https://randomuser.me/api/portraits/men/12.jpg' },
    { id: 16, name: 'Cristofer', followers: 300, avatar:  'https://randomuser.me/api/portraits/men/20.jpg' },
    // Add more friends here...
  ];