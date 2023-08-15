import {configureStore} from "@reduxjs/toolkit";
import reducerSlice from "./reducers/reducerSlice";

const store = configureStore({
    reducer: {
        reducerSlice,
    }
})

export default store;