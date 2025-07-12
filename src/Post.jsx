import React, { useEffect, useState } from 'react';

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="d-flex justify-content-center">
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div className="my-4 border p-3 rounded" key={post.id}>
              
              <div className="d-flex align-items-center mb-2">
                <img
                  className="img rounded-circle"
                  src={post.user.profile_pic}
                  alt="insta dp"
                />
                <h6 className="ms-2 mt-2">{post.user.username}</h6>
              </div>

              {/* Post Image */}
              <img className="post" src={post.image} alt="post" />

              {/* Icons */}
              <div className="mt-2 mb-1">
                <i className="bi bi-heart me-3 fs-5"></i>
                <i className="bi bi-chat me-3 fs-5"></i>
                <i className="bi bi-send fs-5"></i>
              </div>

              {/* Likes */}
              <div className="fw-bold">{post.likes} likes</div>

              {/* Caption */}
              <div>
                <p className="mb-1">
                  <strong>{post.user.username}</strong> {post.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Post;
