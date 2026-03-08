
// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import jobsReducer from './jobsSlice';
// import { userDataSlice } from './userData';
// import { AsyncStorage } from 'expo-sqlite/kv-store';

// const reducers = combineReducers({
//   userData: userDataSlice,
//   jobs: jobsReducer
// });

// const persistConfig = {
//   key: "root",
//   storage: AsyncStorage,
//   whitelist: ["userData","jobs"],
// };

// const store = configureStore({
//   reducer: {
//     userData: userDataSlice,
//     jobs: jobsReducer
//   }
// });



// export type RootState = ReturnType<typeof store.getState>;
// export default store;
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { AsyncStorage } from "expo-sqlite/kv-store";

import jobsReducer from "./jobsSlice";
import userDataReducer from "./userData";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  userData: userDataReducer,
  jobs: jobsReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userData", "jobs"], // jo persist karna hai
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;