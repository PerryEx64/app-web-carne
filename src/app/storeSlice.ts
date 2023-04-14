import { configureStore } from "@reduxjs/toolkit"
import  countsReducer  from "../futures/counts/countsSlice";
import accountSlice from "./futures/accountSlice";


const store = configureStore({
    reducer: {
        counts: countsReducer,
        account: accountSlice
    }
});



export default store;
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch