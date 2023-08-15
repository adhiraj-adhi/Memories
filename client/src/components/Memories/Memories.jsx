import VerticalCard from "../Memories/Memory/VerticalCard";
import "./styles.css";

const Memories = (props) => {

    return (
        <div className="memories_container">
            <h3 className="memories_heading"> Memories </h3>
            <div className="memories_sort">
                <div className="text_filter">
                    <input type="text" placeholder="Enter keyword to search..." className="text_sort" />
                    <button className="text_sort_btn"> Search </button>
                </div>
                <select className="filters">
                    <option> Most Popular </option>
                    <option> Newest First </option>
                    <option> Oldest First </option>
                </select>
            </div>
            <div className="memories_sub_container">
                {
                    props.posts.map(post => {
                        const { id, author, title, description, hashtags, likes, postImgPath } = post;
                        // const sliceddescription = description.length < 50 ? description : description.slice(0, 50) + "...";
                        const sliceddescription = description.slice(0, 50) + "...";
                        // console.log(data);
                        return (
                            <div className="memories" key={id}>
                                <VerticalCard id={id} author={author} title={title} description={sliceddescription} hashtags={hashtags} likes={likes} src={`http://localhost:3001/postsImg/${postImgPath}`} />
                            </div>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Memories;