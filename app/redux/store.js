import { rootReducer } from "./reducer";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cart','favourite']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk))

export const persistor = persistStore(store);