import axios from "axios";
import { useEffect, useState } from "react";

const PostsForm = ({ user }) => {
  const [userId, setUser] = useState(user.id);
  const [posts, setPosts] = useState([]);
  const [postTilte, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const handleSendPost = async (e) => {
    e.preventDefault();

    const data = {
      title: postTilte,
      body: postBody,
      author_id: Number(userId),
    };

    console.log(user);

    const response = await axios.post("http://127.0.0.1:8000/posts/", data);

    console.log(response);
  };

  const getPosts = async () => {
    const response = await axios.get("http://127.0.0.1:8000/posts/");

    if (response) {
      setPosts(response.data);
    }
  };

  useEffect(() => {}, [posts]);

  return (
    <>
      <div className="forms">
        <button className="button" onClick={getPosts}>
          Get Posts
        </button>
        <form className="post-form">
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            value={postTilte}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <label htmlFor="postBody">Post Body:</label>
          <input
            type="text"
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          <button onClick={handleSendPost}>Send Post</button>
        </form>
        {posts.length > 0 && (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                Title: {post.title}
                <br />
                Body: {post.body}
                <br />
                Author: {post.author.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default PostsForm;
