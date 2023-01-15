import "./post.css";
import { Link } from "react-router-dom";
//PF + post.photo
export default function Post({ post }) {
  const PF = "http://localhost:8800/blog/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F678%2F997%2Foriginal%2Fmountain-landscape-at-sunset.jpg&f=1&nofb=1&ipt=26259e86f7d26919a2791ae9533e9b4da2e6efb1fc02649abdc73cd52c741800&ipo=images"} alt="" />} 
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
