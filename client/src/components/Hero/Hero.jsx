import "./styles.css"
import VerticalCard from "../Memories/Memory/VerticalCard";
import HorizontalCard from "../Memories/Memory/HorizontalCard";

const Hero = ({ data1, data2, data3 }) => {
    console.log(data1);
    const lastPost = data1 ? { ...data1, description: data1.description.slice(0, 75) + "..." } : { author: "", title: "", description: "", hashtag: "", likes: 0 };
    const secondLastPost = data2 ? { ...data2, description: data2.description.slice(0, 50) + "..." } : { author: "", title: "", description: "", hashtag: "", likes: 0 };
    const thirdLastPost = data3 ? { ...data3, description: data3.description.slice(0, 50) + "..." } : { author: "", title: "", description: "", hashtag: "", likes: 0 };
    return (
        <div className="hero-container">
            <h1 className="hero-container-heading"> Memories, Stories And More... </h1>
            <p className="hero-container-para"> Register, share your experiences with the world, and engage in conversation about others' experiences. </p>

            <div className="popular_memories">
                <h3 className="popular_memories_heading"> Most Recent memories </h3>
                <div className="popular_memories_container">
                    <div className="vertical_container">
                        <VerticalCard id={lastPost.id} author={lastPost.author} title={lastPost.title} description={lastPost.description} hashtags={lastPost.hashtags} likes={lastPost.likes} src={`http://localhost:3001/postsImg/${lastPost.postImgPath}`} createdAt={lastPost.createdAt} />
                    </div>
                    <div className="horizontal_container">
                        {secondLastPost.author !== "" && <HorizontalCard id={secondLastPost.id} author={secondLastPost.author} title={secondLastPost.title} description={secondLastPost.description} hashtags={secondLastPost.hashtags} likes={secondLastPost.likes} src={`http://localhost:3001/postsImg/${secondLastPost.postImgPath}`} createdAt={secondLastPost.createdAt} />}
                        {thirdLastPost.author !== "" && <HorizontalCard id={thirdLastPost.id} author={thirdLastPost.author} title={thirdLastPost.title} description={thirdLastPost.description} hashtags={thirdLastPost.hashtags} likes={thirdLastPost.likes} src={`http://localhost:3001/postsImg/${thirdLastPost.postImgPath}`} createdAt={thirdLastPost.createdAt} />}
                        {/* {secondLastPost.author !== "" && <HorizontalCard id={secondLastPost.id} author={secondLastPost.author} title={secondLastPost.title} description={secondLastPost.description} hashtags={secondLastPost.hashtags} likes={secondLastPost.likes} image="https://wallpaperaccess.com/full/1626324.jpg" />}
                        {thirdLastPost.author !== "" && <HorizontalCard id={thirdLastPost.id} author={thirdLastPost.author} title={thirdLastPost.title} description={thirdLastPost.description} hashtags={thirdLastPost.hashtags} likes={thirdLastPost.likes} image="https://10wallpaper.com/wallpaper/1366x768/1611/Mi_China-Virtual_Reality_VR_HD_wallpaper_1366x768.jpg" />} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;