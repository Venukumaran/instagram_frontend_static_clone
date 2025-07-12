import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function Viewstory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const storyId = Number(id);
  const [story, setStory] = useState(null);

  useEffect(() => {
    if (storyId < 1 || storyId > 4) {
      navigate('/'); 
      return;
    }

    fetch(`http://localhost:3001/stories/${storyId}`)
      .then(res => {
        if (!res.ok) throw new Error("Story not found");
        return res.json();
      })
      .then(data => setStory(data))
      .catch(err => {
        console.error(err);
        navigate('/');
      });
  }, [id]);

  if (!story) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f5f5f5'
    }}>
      <div style={{
        width: '375px',
        height: '667px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
          <img
            src={story.user.profile_pic}
            alt="user"
            style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10 }}
          />
          <span>{story.user.username}</span>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to={storyId === 1 ? '/' : `/stories/${storyId - 1}`}>
            <i className="bi bi-arrow-left-square-fill" style={{ fontSize: 30 }}></i>
          </Link>

          <img
            src={story.story_image}
            alt="story"
            style={{
              maxWidth: '80%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '12px'
            }}
          />

          <Link to={storyId === 4 ? '/' : `/stories/${storyId + 1}`}>
            <i className="bi bi-arrow-right-square-fill" style={{ fontSize: 30 }}></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Viewstory;
