import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AiFillLike } from "react-icons/ai"
import { setViewForm } from '../../reducers/reducerSlice'
import axiosInstance from '../../axiosSetup'
import { setSpecificPost } from '../../reducers/reducerSlice'
// import { getSpecificPost } from '../../reducers/reducerSlice'
import "./styles.css"

const SpecificPost = () => {
    const user = useSelector(state => state.reducerSlice.user);
    const viewForm = useSelector(state => state.reducerSlice.viewForm);
    // const setUserPost = useSelector(state => state.reducerSlice.setUserPost);
    const dispatch = useDispatch();
    const specificPost = useSelector(state => state.reducerSlice.specificPost);
    const d = new Date(specificPost.createdAt);
    const createdAt = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();


    const likesBtn = async (id) => {
        try {
            // dispatch(setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes === 0 ? post.likes + 1 : post.likes - 1 } : post)))
            dispatch(setSpecificPost(...specificPost, specificPost.likes ? specificPost.likes -1 : specificPost.likes+1))
            const response = await axiosInstance.patch(`/user/likePost/${id}`, {}, { headers: { 'Authorization': `Bearer ${user.token}` } });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='specific_post_sub_container'>
            <h3 className='desc_heading'> Description </h3>
            <div className='post_details_container'>
                <div className='post_details_desc'>
                    {/* <p className='description'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, nostrum facere illum expedita possimus perspiciatis consectetur nisi repellendus sunt aperiam illo ut nemo adipisci sed recusandae esse minima pariatur qui earum et est accusantium. Accusamus, nobis alias quidem perferendis minima dolorum a commodi quas optio debitis aspernatur, illum voluptatibus? Quis consequatur, fugit officiis nostrum similique, autem, error recusandae blanditiis hic architecto rem ab eaque? Commodi dolores illum necessitatibus voluptatem mollitia beatae nihil atque sed sit, fuga numquam doloribus eum blanditiis eligendi architecto quas ipsam, cumque deserunt labore odio veniam eveniet fugit. Voluptate iusto fugiat tempore adipisci nulla maxime iure quidem? Alias atque autem eum dicta maiores perspiciatis cupiditate laudantium cumque, sit mollitia fugit commodi vel in possimus veritatis nam? Rerum fuga eum odio delectus voluptates quam repudiandae, in vero quidem temporibus, dolor quae. Illum nam dolore est ab laborum, culpa nesciunt fugit doloremque similique dolor in placeat quia deserunt dolorum consequuntur magni amet earum? Facilis fuga inventore, veniam quas ratione voluptatibus corrupti repellat corporis? Doloribus, tenetur illo doloremque voluptatum sequi enim eligendi adipisci. Tenetur atque est consequatur consectetur dignissimos aspernatur nostrum. Voluptatem eos at, consequuntur impedit cum error ex, minima et commodi sapiente eveniet fuga natus numquam enim perferendis nostrum! </p> */}
                    <p className='description'> {specificPost.description} </p>
                    <button className='aifilllikebtn' onClick={() => { user === null ? dispatch(setViewForm(!viewForm)) : likesBtn(specificPost.id) }}><AiFillLike />({specificPost.likes})</button>
                    <div>
                        <p> <b> Created By : </b> {specificPost.author}</p>
                        <p> <b> Post Date : </b> {createdAt}</p>
                    </div>
                </div>
                <div className='post_details_img'>
                    <img src={`http://localhost:3001/postsImg/${specificPost.postImgPath}`} alt='postImg' />
                    {/* <img src='https://i2.wp.com/techbeasts.com/wp-content/uploads/2016/01/green_mountain_nature_wallpaper_hd.jpg' alt='postImg' /> */}
                </div>
            </div>
        </div>
    )
}


export default SpecificPost