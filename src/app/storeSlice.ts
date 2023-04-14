import { configureStore } from "@reduxjs/toolkit"
import accountSlice from "./futures/accountSlice";


const store = configureStore({
    reducer: {
        account: accountSlice
    }
});



export default store;
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch