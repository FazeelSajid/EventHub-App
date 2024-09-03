import { createSlice } from '@reduxjs/toolkit';
import { Images } from '../../assets/Images/Images';
import MapMusic from '../../assets/svgs/MapMusic.svg';
import MapFood from '../../assets/svgs/mapFood.svg';
import MapFootball from "../../assets/svgs/MapFootball.svg";
import MapArt from "../../assets/svgs/MapArt.svg";
import Svg from '../../assets/svgs/svg';
import Attendee1 from "../../assets/svgs/attendee1.svg";
import Attendee2 from "../../assets/svgs/attendee2.svg";
import Attendee3 from "../../assets/svgs/attendee3.svg";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

// Initial state as defined in your AuthContext
const initialState = [];

// Redux slice
const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    // Action to add or update a bookmark
    addBookmark: (state, action) => {
      console.log(action.payload, "bookmarksSlice");
      console.log(state);      
      state.push(action.payload)
    },

    // Action to remove a bookmark based on an identifier (e.g., id or title)
    removeBookmark: (state, action) => {
      const identifier = action.payload;
      return state.filter(
        bookmark => bookmark.id !== identifier && bookmark.title !== identifier
      );
    },

    // Action to reset the state to initial values
    resetBookmarks: () => initialState,
  },
});

export const { addBookmark, removeBookmark } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;