import { createSlice } from '@reduxjs/toolkit';

// Initial state as defined in your AuthContext
const initialState = {
   isAuthenticated: false,
   addEvent : false,
};

// Redux slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Action to update any state property
        setAuthStates: (state, action) => {
            // Update multiple fields using the payload object
            console.log(action.payload,  "authSlice");
            return { ...state, ...action.payload };
        },
        // Action to reset the state to initial values
        resetAuthStates: (state) => {
            return initialState;
        },
    },
});

export const { setAuthStates, resetAuthStates } = authSlice.actions;
export default authSlice.reducer;
