import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import stockReducer from "../features/stockSlice";

// Persist configuration for auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["currentUser", "token", "isAdmin", "isAuthenticated"], // Only persist these fields
};

// Persist configuration for stock (optional, for better UX)
const stockPersistConfig = {
  key: "stock",
  storage,
  whitelist: ["brands", "firms", "categories"], // Cache some data for faster loading
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedStockReducer = persistReducer(stockPersistConfig, stockReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    stock: persistedStockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;
