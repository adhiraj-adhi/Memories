import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../reducers/reducerSlice';
import axiosInstance from '../axiosSetup';
import Form from '../components/AuthForms/Form';
import Hero from "../components/Hero/Hero";
import Memories from '../components/Memories/Memories';

const Home = () => {
  const viewForm = useSelector(state => state.reducerSlice.viewForm);
  const posts = useSelector(state => state.reducerSlice.posts);
  const dispatch = useDispatch();

  const fetchPost = async () => {
    try {
      const response = await axiosInstance.get("/");
      dispatch(setPosts(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPost();
  }, [])

  if(posts.length !== 0){
    console.log(posts);
  }

  return (
    <>
      {viewForm && <Form />}
      {
        posts.length > 0 && <Hero data1={posts[posts.length - 1]} data2={posts[posts.length - 2]} data3={posts[posts.length - 3]} />
      }
      {
        posts.length > 0 && <Memories posts={posts} />
      }
    </>
  )
}

export default Home