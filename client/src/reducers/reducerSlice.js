import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosSetup";

let initialState = {
    viewForm: false,
    user: localStorage.getItem("memories") ? JSON.parse(localStorage.getItem("memories")) : null,
    posts: [],
    userPost: [],
    updatePostData: "", // this one is for filling the fields in form when user clicks on edit a memory
    specificPost: "",
    specificAuthorPost: [],
    isLoading: false,
    isError: false,
    errorMessage: "" // for error pages
}

export const getAllPosts = createAsyncThunk("/reducerSlice/posts", async (userArg) => {
    const userToken = userArg !== null && userArg.token
    try {
        const response = await axiosInstance.get("/", { headers: {userToken}});
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const getSpecificPost = createAsyncThunk("reducerSlice/specificPost", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/${id}`);
        console.log(response.data);
        return response;
    } catch (error) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data.err);
    }
})

export const reducerSlice = createSlice({
    name: "reducerSlice",
    initialState,
    reducers: {
        setViewForm: (state, action) => {
            state.viewForm = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setPosts: (state, action) => {
            state.posts = action.payload
        },
        setUserPost: (state, action) => {
            state.userPost = action.payload
        },
        setUpdatePostData: (state, action) => {
            state.updatePostData = action.payload
        },
        setSpecificPost: (state, action) => {
            state.specificPost = action.payload
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        }
    },
    extraReducers: {
        [getAllPosts.pending]: (state) => {
            state.isLoading = true
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.isLoading = false
            state.posts = action.payload;
        },
        [getAllPosts.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true
        },

        [getSpecificPost.pending]: (state) => {
            state.isLoading = true
        },
        [getSpecificPost.fulfilled]: (state, action) => {
            state.isLoading = false
            state.specificPost = action.payload.data.data;
            state.specificAuthorPost = action.payload.data.posts;
        },
        [getSpecificPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.setErrorMessage = action.payload
        },
    }
})

export const { setViewForm, setUser, setPosts, setUserPost, setUpdatePostData, setSpecificPost, setErrorMessage } = reducerSlice.actions;

export default reducerSlice.reducer;