import { configureStore } from "@reduxjs/toolkit";
import { raspsReducer } from "./slices/rasps";
import { authReducer } from "./slices/auth";

const store = configureStore({
  reducer: {
    rasps: raspsReducer,
    auth: authReducer,
  },
});

export default store;
