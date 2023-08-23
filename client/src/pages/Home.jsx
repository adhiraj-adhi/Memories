import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, setPosts } from '../reducers/reducerSlice';
import axiosInstance from '../axiosSetup';
// import Form from '../components/AuthForms/Form';
import Hero from "../components/Hero/Hero";
import Memories from '../components/Memories/Memories';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const user = useSelector(state => state.reducerSlice.user);
  const isLoading = useSelector(state => state.reducerSlice.isLoading);
  const posts = useSelector(state => state.reducerSlice.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts(user));
  }, [])

  if(isLoading){
    return <h3> Loading ...</h3>
  }

  return (
    <>
      {/* {viewForm && <Form />} */}
      <Hero data1={posts[posts.length - 1]} data2={posts[posts.length - 2]} data3={posts[posts.length - 3]} />
      <Memories posts={posts} />
      <Footer />
    </>
  )
}

export default Home