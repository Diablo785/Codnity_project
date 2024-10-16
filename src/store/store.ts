// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define the shape of your RootState based on the reducers
export interface RootState {
  search: ReturnType<typeof searchReducer>;
}

// Persist configuration
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  search: searchReducer,
});

// Persist reducer setup
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Set up the persistor
export const persistor = persistStore(store);

// Export types for RootState and AppDispatch
export type AppDispatch = typeof store.dispatch;

export default store;
