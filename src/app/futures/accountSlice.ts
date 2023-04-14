import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/storeSlice";

// Define a type for the slice state
interface AccountState {
  dataUser: {
    email: string;
    id: number;
    iglesia: string;
    name: string;
    type: string;
  };
}

// Define the initial state using that type
const initialState: AccountState = {
  dataUser: {
    email: "",
    id: 0,
    iglesia: "",
    name: "",
    type: "",
  },
};

export const counterSlice = createSlice({
  name: "account",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDataUser: (state, action: PayloadAction<AccountState["dataUser"]>) => {
      state.dataUser = action.payload;
    },
  },
});

export const { setDataUser } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDataUser = (state: RootState) => state.account.dataUser;

export default counterSlice.reducer;
