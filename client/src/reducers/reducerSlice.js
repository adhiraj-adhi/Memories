import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    viewForm: false,
    user : localStorage.getItem("memories") ? JSON.parse(localStorage.getItem("memories")) : null,
    posts: [],
    userPost: [],
    updatePostData : "", // this one is for filling the fields in form when user clicks on edit a memory
}

export const reducerSlice = createSlice({
    name: "reducerSlice",
    initialState,
    reducers: {
        setViewForm : (state, action) => {
            state.viewForm = action.payload
        },
        setUser : (state, action) => {
            state.user = action.payload
        },
        setPosts : (state, action) => {
            state.posts = action.payload
        },
        setUserPost: (state, action) => {
            state.userPost = action.payload
        },
        setUpdatePostData: (state, action) => {
            state.updatePostData = action.payload
        }
    }
})

export const { setViewForm, setUser, setPosts, setUserPost, setUpdatePostData } = reducerSlice.actions;

export default reducerSlice.reducer;