import React, {useEffect} from 'react'
import SpecificPost from '../components/SpecificPost/SpecificPost'
import VerticalCard from "../components/Memories/Memory/VerticalCard"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecificPost } from '../reducers/reducerSlice'

const Post = () => {
  const {isLoading, specificPost, specificAuthorPost} = useSelector(state => state.reducerSlice);
  // const specificPost = useSelector(state => state.reducerSlice.specificPost);
  // const specificAuthorPost = (state => state.reducerSlice.specificAuthorPost)

  const { postId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecificPost(postId));
  }, [])

  if (isLoading) {
    return <h3> Loading ... </h3>
  }

  return (
    <div className='specific_post_container'>
      <div className='post_container'>
        <SpecificPost />
      </div>
      <div className='same_author_popular_posts_container'>
        <h4 className='same_author_popular_posts_heading'> Popular Posts Of {specificAuthorPost.length > 0 ? specificAuthorPost[0].author : "Author"} </h4>
        <div className='same_author_popular_posts_sub_container' style={specificAuthorPost.length == 1 ? {width : "33%"} : specificAuthorPost == 2 ? {width : "66%"} : {width : "100%"}}>
          {
            specificAuthorPost.map(spost => {
              const sliceddescription = spost.description.slice(0, 50) + "...";
              return <VerticalCard key={spost.id} id={spost._id} author={spost.author} title={spost.title} description={sliceddescription} hashtags={spost.hashtags} likes={spost.likes.length} src={`http://localhost:3001/postsImg/${spost.postImgPath}`} createdAt={spost.createdAt} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Post