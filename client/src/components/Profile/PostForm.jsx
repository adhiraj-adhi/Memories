import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../axiosSetup";
import "./postFormStyles.css";
import { setUpdatePostData } from "../../reducers/reducerSlice";

const PostForm = () => {
    const user = useSelector(state => state.reducerSlice.user)
    const updatePostData = useSelector(state => state.reducerSlice.updatePostData)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [allowImgUpdate, setAllowImgUpdate] = useState(false);
    const [postData, setPostData] = useState(updatePostData ?  {
        author: updatePostData.author,
        title: updatePostData.title,
        description: updatePostData.description,
        hashtags: updatePostData.hashtags,
        image: ""
    } : {
        author: "",
        title: "",
        description: "",
        hashtags: "",
        image: ""
    })

    function collectData(e) {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    }
    function handleImage(e){
        setPostData({...postData, image: e.target.files[0]});
    }

    async function submitHandler(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('author', postData.author);
        formData.append('title', postData.title);
        formData.append('description', postData.description);
        formData.append('hashtags', postData.hashtags);
        formData.append('image', postData.image);
        console.log("image: ",postData.image);
        // console.log("FormData: ",formData);
        try {
            if (!updatePostData) {
                const response = await axiosInstance.post("/user/createPost", formData, { headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("memories")).token } })
                console.log(response.data);
                navigate("/")
            }
            if (updatePostData) {
                console.log(postData);
                try {
                    if(!allowImgUpdate){
                        const response = await axiosInstance.patch(`/user/editPost/${updatePostData.id}`, postData, { headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("memories")).token } })
                    } else {
                        const response = await axiosInstance.patch(`/user/editPost/${updatePostData.id}`, formData, { headers: { 'Authorization': `Bearer ${user.token}`}})
                    }
                } catch (error) {
                    console.log(error);
                }
                dispatch(setUpdatePostData(""));
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={submitHandler} encType="multipart/form-data">
            <h3 className="post_form_heading"> {updatePostData ? "Update Post" : "Create Post"} </h3>
            <input type="text"
                placeholder="Author name"
                required
                name="author"
                value={postData.author}
                onChange={collectData}
            /> <br />
            <input type="text"
                placeholder="Title of post"
                required
                name="title"
                value={postData.title}
                onChange={collectData}
            /> <br />
            <textarea
                placeholder="Post description"
                required
                name="description"
                rows="3"
                value={postData.description}
                onChange={collectData}
            /> <br />
            <input type="text"
                placeholder="Hashtags"
                required
                name="hashtags"
                value={postData.hashtags}
                onChange={collectData}
            /> <br />
            {updatePostData && <p onClick={() => setAllowImgUpdate(!allowImgUpdate)} className="allowImgUpdate"> {allowImgUpdate ? "Continue without image update" : "Click to edit image"} </p>}
            {updatePostData ? (allowImgUpdate && <input type="file" accept=".png, .jpg, .jpeg" name="image" onChange={handleImage} required />) : <input type="file" accept=".png, .jpg, .jpeg" name="image" onChange={handleImage} required />}
             <br/>
            {updatePostData ? <input type="submit" value="Update" /> : <input type="submit" value="Create" />}
        </form>
    )
}

export default PostForm;