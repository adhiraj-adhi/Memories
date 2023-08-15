import { useDispatch,useSelector } from "react-redux";
import axiosInstance from "../../../axiosSetup";
import { setViewForm, setPosts } from "../../../reducers/reducerSlice";
import {RxDotFilled} from "react-icons/rx";
import {AiFillLike, AiFillDelete} from "react-icons/ai";
import {FaEdit, FaShare} from "react-icons/fa";

import "./styles.css"
import "./horizonStyles.css";

const HorizontalCard = (props) => {
    const viewForm = useSelector(state => state.reducerSlice.viewForm);
    const user = useSelector(state => state.reducerSlice.user);
    const posts = useSelector(state => state.reducerSlice.posts);
    
    const dispatch = useDispatch();

    const likesBtn = async (id) => {
        try {
            dispatch(setPosts(posts.map(post => post.id === id ? { ...post, likes: post.likes === 0 ? post.likes + 1 : post.likes - 1 } : post)))
            const response = await axiosInstance.patch(`/user/likePost/${id}`, {} ,{ headers: { 'Authorization': `Bearer ${user.token}` } });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="memory_container horizon_memory_container">
            <div className="memory_img horizon_memory_img">
                <img src={props.src} alt="img" />
            </div>
            <div className="memory_details horizon_memory_details">
                <p className="memory_author"> <span>{props.author}</span> <RxDotFilled /> <span>2 years ago</span> </p>
                <h4 className="memory_title"> {props.title} </h4>
                <p className="about_memory"> {props.description} </p>
                <p className="memory_hashtags">{props.hashtag}</p>
                <div className="memory_btn">
                    <div className="like_And_share">
                    <p className="like_btn" onClick={() => { user === null ? dispatch(setViewForm(!viewForm)) : likesBtn(props.id) }}> <AiFillLike /> ({props.likes}) </p>
                        {/* <p className="share_btn"> <FaShare /> </p> */}
                    </div>
                    {/*<div className="delete_And_customize">*/}
                    {/*    <p className="edit_btn"> <FaEdit /> </p>*/}
                    {/*    <p className="delete_btn"> <AiFillDelete /> </p>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default HorizontalCard;