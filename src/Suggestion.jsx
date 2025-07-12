import React, { useEffect, useState } from "react";
import axios from "axios";

function Suggestion() {
  const [profile, setProfile] = useState(null);
  const [suggest, setSuggest] = useState([]);

  useEffect(() => {
    // Fetch profile
    axios.get("http://localhost:3001/profile").then((res) => {
      setProfile(res.data);
    });

    // Fetch suggestions
    axios.get("http://localhost:3001/suggestion").then((res) => {
      // Add 'followed' flag based on profile followers
      axios.get("http://localhost:3001/profile").then((profileRes) => {
        const followers = profileRes.data.followers || [];
        const updatedSuggestions = res.data.map((s) => ({
          ...s,
          followed: followers.some((f) => f.id === s.id),
        }));
        setSuggest(updatedSuggestions);
      });
    });
  }, []);

  const toggleFollow = async (id) => {
    if (!profile) return;

    const userToToggle = suggest.find((s) => s.id === id);
    if (!userToToggle) return;

    let updatedFollowers = profile.followers ? [...profile.followers] : [];

    if (userToToggle.followed) {
      // Unfollow: remove follower
      updatedFollowers = updatedFollowers.filter((f) => f.id !== id);
    } else {
      // Follow: add follower
      updatedFollowers.push({
        id: userToToggle.id,
        username: userToToggle.username,
        profile_pic: userToToggle.profile_pic,
      });
    }

    try {
      // Update profile followers on backend
      const res = await axios.put("http://localhost:3001/profile", {
        ...profile,
        followers: updatedFollowers,
      });
      setProfile(res.data);

      // Update suggestion UI
      setSuggest((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, followed: !s.followed } : s
        )
      );
    } catch (error) {
      console.error("Error updating followers:", error);
    }
  };

  return (
    <div className="w-75 m-4">
      <h5>Suggestions For You</h5>
      {suggest.length === 0 ? (
        <div>Loading suggestions...</div>
      ) : (
        suggest.map((s) => (
          <div key={s.id} className="d-flex align-items-center mb-2">
            <img
              src={s.profile_pic}
              alt={s.username}
              className="rounded-circle"
              style={{ width: 45, height: 45, objectFit: "cover" }}
            />
            <h6 className="ms-2 mb-0">{s.username}</h6>
            <button
              className={`btn btn-sm ms-auto ${
                s.followed ? "btn-outline-secondary" : "btn-primary"
              }`}
              onClick={() => toggleFollow(s.id)}
            >
              {s.followed ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Suggestion;
