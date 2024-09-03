import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../statesSlices/authSlice";
import BookmarksSlice from "../statesSlices/BookmarksSlice";

const store = configureStore({
    reducer: {
        authSlice:authSlice,
        BookmarksSlice:BookmarksSlice
    }
})

export default store;