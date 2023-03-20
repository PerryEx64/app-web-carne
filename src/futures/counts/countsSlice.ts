import {createSlice} from "@reduxjs/toolkit"

export const countsSlice = createSlice({
    name: "counts",
    initialState: {},
    reducers: {
        addUserData: (state, action) => {
            
            state.value = action.payload;
        }
    }
});

export const { addUserData } = countsSlice.actions;
export default countsSlice.reducer;