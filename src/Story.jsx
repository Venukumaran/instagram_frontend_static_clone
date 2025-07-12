import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link

function Story() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/stories')
      .then((res) => res.json()) 
      .then((data) => setStories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="story-container" style={{ display: 'flex', gap: '15px', padding: '10px' }}>
      {stories.length > 0 ? (
        stories.map((story) => (
          <Link
            to={`/stories/${story.id}`} // ✅ Navigate to Viewstory page
            key={story.id}
            style={{ textAlign: 'center', textDecoration: 'none', color: 'inherit' }}
          >
            <img
              src={story.user.profile_pic}
              alt={story.user.username}
              style={{
                height: '45px',
                width: '45px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #ff8501',
              }}
            />
            <p style={{ fontSize: '14px', marginTop: '5px' }}>{story.user.username}</p>
          </Link>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Story;
