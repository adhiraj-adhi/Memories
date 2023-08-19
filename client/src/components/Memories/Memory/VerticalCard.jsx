// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxDotFilled } from "react-icons/rx";
import { AiFillLike, AiFillDelete } from "react-icons/ai";
import { FaShare, FaEdit } from "react-icons/fa";

import { setPosts, setUpdatePostData, setUserPost, setViewForm } from "../../../reducers/reducerSlice";
import axiosInstance from "../../../axiosSetup";
import "./styles.css"
import { useEffect } from "react";

const VerticalCard = (props) => {
    // const navigate = useNavigate();
    const viewForm = useSelector(state => state.reducerSlice.viewForm);
    const user = useSelector(state => state.reducerSlice.user);
    const posts = useSelector(state => state.reducerSlice.posts);
    const userPost = useSelector(state => state.reducerSlice.userPost);
    const dispatch = useDispatch();

    const getAPost = async (id) => {
        try {
            const response = await axiosInstance.get(`/user/getAPost/${id}`, { headers: { 'Authorization': `Bearer ${user.token}` } })
            dispatch(setUpdatePostData(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    const deletePost = async (id) => {
        if (window.confirm("Do you want to delete this post?")) {
            const response = await axiosInstance.delete(`/user/deletePost/${id}`, { headers: { 'Authorization': `Bearer ${user.token}` } })
            dispatch(setUserPost(userPost.filter(post => post.id !== id)))
            console.log(response);
        } else {
            console.log("Cancelled");
        }
    }


    const likesBtn = async (id) => {
        console.log(id);
        try {
            dispatch(setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes === 0 ? post.likes + 1 : post.likes - 1 } : post)))
            dispatch(setUserPost(userPost.map(post => post.id === id ? { ...post, likes: post.likes === 0 ? post.likes + 1 : post.likes - 1 } : post)))
            const response = await axiosInstance.patch(`/user/likePost/${id}`, {}, { headers: { 'Authorization': `Bearer ${user.token}` } });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const date1 = new Date();
    const date2 = new Date(props.createdAt)
    console.log(date2);
    const diffTime = ((Math.abs(date1.getTime() - date2.getTime())));
    const diffTimeSeconds = parseInt(diffTime / 1000);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffTimeSeconds);
    console.log(diffDays + " days");
    let postCreationTime;
    if (diffDays < 1 && (diffTimeSeconds / (86400)) < 24) {     // 60* 60 * 24 = 86400 and 60* 24 = 1440
        if (diffTimeSeconds < 60) {
            postCreationTime = diffTimeSeconds + " seconds ago";
        } else if (diffTimeSeconds > 60 && diffTimeSeconds < 3600) {
            postCreationTime = Math.floor(((diffTimeSeconds / 3600) * 60)) + " minutes ago"
        } else {
            postCreationTime = Math.floor((diffTimeSeconds / (86400) * 24)) + " hours ago"
        }
    } else {
        if (diffDays === 1) {
            postCreationTime = diffDays + " day ago"
        } else if (diffDays > 1 && diffDays < 365) {
            postCreationTime = diffDays + " days ago"
        } else {
            if (diffDays >= 365 && diffDays < 730) {
                postCreationTime = diffDays + " year ago"
            } else {
                postCreationTime = diffDays / 365 + " years ago"
            }
        }
    }




    return (
        <div className="memory_container">
            <div className="memory_img">
                <img src={props.src} alt="img" />
            </div>
            <div className="memory_details">
                <p className="memory_author"> <span> {props.author} </span> <RxDotFilled /> <span>{postCreationTime}</span> </p>
                <h4 className="memory_title"> {props.title} </h4>
                <p className="about_memory"> {props.description} </p>
                <p className="memory_hashtags">{props.hashtags}</p>
                <div className="memory_btn">
                    <div className="like_And_share">
                        <p className="like_btn" onClick={() => { user === null ? dispatch(setViewForm(!viewForm)) : likesBtn(props.id) }}> <AiFillLike /> ({props.likes}) </p>
                        {/* <p className="share_btn"> <FaShare /> </p> */}
                    </div>
                    {
                        props.enableFunctinality && <div className="delete_And_customize">
                            <p className="edit_btn" onClick={() => getAPost(props.id)}> <a href="#post_form_id"><FaEdit /></a> </p>
                            <p className="delete_btn" onClick={() => deletePost(props.id)}> <AiFillDelete /> </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default VerticalCard;