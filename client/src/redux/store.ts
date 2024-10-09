import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/userSlice";
import adminReducer from "./admin/adminSlice";
import { persistReducer, persistStore } from "redux-persist";

//persist config fro local storage
const persistConfig = {
  key: "root",
  storage,
};

//combine user and admin reducers
const rootReducer = combineReducers({ user: userReducer, admin: adminReducer });

//apply persistance to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//create persistor
export const persistor = persistStore(store);

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
