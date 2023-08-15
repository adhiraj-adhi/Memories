import React, { useEffect } from 'react'
import axiosInstance from '../axiosSetup';
import ProfileCompo from "../components/Profile/ProfileCompo"
import { useDispatch, useSelector } from 'react-redux';
import { setUserPost } from '../reducers/reducerSlice';

const Profile = () => {
  const userPost = useSelector(state => state.reducerSlice.userPost);
  const dispatch = useDispatch();

  const getUserPost = async () => {
    try {
      const response = await axiosInstance.get("/user/getUserPost", {headers: {'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem("memories")).token}});
      dispatch(setUserPost(response.data.data))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserPost()
  }, [])

  return (
    <>
      {userPost.length >= 0 && <ProfileCompo />}
    </>
  )
}

export default Profile