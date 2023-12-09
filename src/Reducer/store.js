
import membershipSlice  from "./MembershipSlice/membershipSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'; 
import { combineReducers } from "redux";
const persistConfig = {
  key: "root", // This is the key used to store the data in storage
  storage // Use the storage type you imported (e.g., localStorage, AsyncStorage, etc.)
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
     membershipState: membershipSlice
}));

const store = configureStore({
  reducer: {
    membershipState:membershipSlice
  },
})

export default store;

export const persistor = persistStore(store);