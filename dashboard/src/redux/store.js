import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../views/auth/authReducer";
// Persist configuration for the auth reducer
import prizesReducer from '../views/prizes/PrizesRedux' // import the prizes
import puzzlesReducer from '../views/puzzles/PuzzlesRedux' // import the puzzles

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
// const combinedReducer = combineReducers({
//   auth: authReducer,
//   subscription: authSimulationReducer,
// });
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    prizes: prizesReducer, // add the prizes here
    puzzles: puzzlesReducer, // add the puzzles here


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export persistor to be used in the app
export const persistor = persistStore(store);
