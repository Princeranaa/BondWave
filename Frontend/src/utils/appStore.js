import {configureStore} from '@reduxjs/toolkit'
import  useReducer  from './userSlice.js';
import feedReducer from './feedSlice.js'
import conectionReducer from './conectionSlice.js'
import requestReducer from './requestSlice.js'


const appStore = configureStore({
    reducer: {
        user: useReducer,
        feed: feedReducer,
        connections: conectionReducer,
        requests: requestReducer

    }
})

export default appStore;