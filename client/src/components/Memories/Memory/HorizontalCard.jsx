import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../../axiosSetup";
import { setViewForm, setPosts } from "../../../reducers/reducerSlice";
import { RxDotFilled } from "react-icons/rx";
import { AiFillLike, AiFillDelete } from "react-icons/ai";
import { FaEdit, FaShare } from "react-icons/fa";

import "./styles.css"
import "./horizonStyles.css";

const HorizontalCard = (props) => {
    const viewForm = useSelector(state => state.reducerSlice.viewForm);
    const user = useSelector(state => state.reducerSlice.user);
    const posts = useSelector(state => state.reducerSlice.posts);
    const [likeToggle, setLikeToggle] = useState(props.hasUserLiked);

    const dispatch = useDispatch();

    const likesBtn = async (id) => {
        try {
            dispatch(setPosts(posts.map(post => post.id === id ? { ...post,  likes: likeToggle? post.likes-1 : post.likes+1 } : post)))
            // dispatch(setUserPost(userPost.map(post => post.id === id ? { ...post, likes: likeToggle? post.likes-1 : post.likes+1 } : post)))
            setLikeToggle(!likeToggle);
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
    const diffTimeSeconds = parseInt(diffTime/1000);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffTimeSeconds);
    // console.log(diffDays + " days");
    let postCreationTime;
    if(diffDays<1 && (diffTimeSeconds/(86400)) < 24){     // 60* 60 * 24 = 86400 and 60* 24 = 1440
        if(diffTimeSeconds<60){
            postCreationTime = diffTimeSeconds + " seconds ago";
        } else if(diffTimeSeconds > 60 && diffTimeSeconds < 3600){
            postCreationTime = Math.floor(((diffTimeSeconds/3600)*60)) + " minutes ago"
        } else{
            postCreationTime = Math.floor((diffTimeSeconds/(86400)*24)) + " hours ago"
        }
    } else {
        if(diffDays===1){
            postCreationTime = diffDays + " day ago"
        } else if(diffDays > 1 && diffDays <365){
            postCreationTime = diffDays + " days ago"
        } else {
            if(diffDays >= 365 && diffDays < 730){
                postCreationTime = diffDays + " year ago"
            } else {
                postCreationTime = diffDays/365 + " years ago"
            }
        }
    }

    return (
        <div className="memory_container horizon_memory_container">
            <div className="memory_img horizon_memory_img">
                <img src={props.src} alt="img" />
            </div>
            <div className="memory_details horizon_memory_details">
                <p className="memory_author"> <span>{props.author}</span> <RxDotFilled /> <span>{postCreationTime}</span> </p>
                <h4 className="memory_title"> <Link to={`post/${props.id}`}> {props.title} </Link> </h4>
                <p className="about_memory"> {props.description} </p>
                <p className="memory_hashtags">{props.hashtag}</p>
                <div className="memory_btn">
                    <div className="like_And_share">
                        <p className="like_btn" onClick={() => { user === null ? dispatch(setViewForm(!viewForm)) : likesBtn(props.id) }}> <AiFillLike /> ({props.likes}) </p>
                        {/* <p className="share_btn"> <FaShare /> </p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HorizontalCard;