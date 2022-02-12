import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./index";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',  
    version: 0, //New version 0, default or previous version -1  
    storage: storage,  
    debug: true, 
    stateReconciler: autoMergeLevel2,
    // timeout: null
    // whitelist: ['navigation']
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(thunk, logger));
export const persistor = persistStore(store);

// export default store;