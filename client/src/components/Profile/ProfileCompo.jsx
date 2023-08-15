import { useSelector } from "react-redux";
import VerticalCard from "../Memories/Memory/VerticalCard";
import PostForm from "./PostForm";
import "./styles.css";
const ProfileCompo = () => {
    const user = useSelector(state => state.reducerSlice.user);
    const userPost = useSelector(state => state.reducerSlice.userPost);
    return (
        <div className="profile_container">
            <div className="profile_sub_Container">
                <div className="profile_details">
                    <div className="profile_picture">
                        <img src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947_1280.jpg" alt="profile_image" />
                    </div>
                    <div className="profile_userinfo">
                        <p style={{fontSize: "0.96rem"}}> {user.name} </p>
                        <p style={{fontSize: "0.9rem"}}> {user.email} </p>
                        <p style={{fontSize: "0.9rem"}}> You have total of {userPost.length} memories </p>
                        <p style={{fontSize: "0.9rem"}}> Total Like Counts on your memories : 100 </p>
                    </div>
                </div>
                <div className="post_form" id="post_form_id">
                    <PostForm />
                </div>
            </div>
            <h3 className="user_memories"> Your Memories </h3>
            <div className="profile_memories memories_sub_container">
                {
                    userPost.map(item => {
                        // console.log("ITEM",item);
                        const {author, title, description,postImgPath, hashtags, likes} = item;
                        const imagePath = `http://localhost:3001/postsImg/${postImgPath}`
                        // const sliceddescription = description.length < 50 ? description : description.slice(0, 50) + "...";
                        const sliceddescription = description.slice(0, 50) + "...";
                        return (
                            <div className="memories" key={item.id}>
                                <VerticalCard id={item.id} author={author} title={title} description={sliceddescription} hashtags={hashtags} likes={likes} enableFunctinality={true} src={imagePath} />
                            </div>      
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProfileCompo;