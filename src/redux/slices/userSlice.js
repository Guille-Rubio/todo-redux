import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload;
            return { ...state, user: user }//TODO test it works
        },

    }
})


export const { setUser } = userSlice.actions;
export default userSlice.reducer;