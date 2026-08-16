import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "../features/memberSlice";


export const store = configureStore({
  reducer: {
    member: memberSlice,
  },
});