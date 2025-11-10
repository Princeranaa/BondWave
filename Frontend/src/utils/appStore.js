import {configureStore} from '@reduxjs/toolkit'
import  useReducer  from './userSlice.js';
import feedReducer from './feedSlice.js'
import conectionReducer from './conectionSlice.js'

const appStore = configureStore({
    reducer: {
        user: useReducer,
        feed: feedReducer,
        connections: conectionReducer
    }
})

export default appStore;