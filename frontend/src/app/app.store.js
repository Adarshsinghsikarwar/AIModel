import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chat/state/chat.slice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
