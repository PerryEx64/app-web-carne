import { configureStore } from "@reduxjs/toolkit"
import  countsReducer  from "../futures/counts/countsSlice";


const store = configureStore({
    reducer: {
        counts: countsReducer
    }
});



export default store;