import { configureStore } from "@reduxjs/toolkit"
import loadersReducer from "./loadersSlice.js"
import usersReducer from "./usersSlice.js"

const store =  configureStore({
    reducer: {
        loaders: loadersReducer,
        users: usersReducer
    }
})

export default store
