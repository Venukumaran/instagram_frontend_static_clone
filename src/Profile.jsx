import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    profile_pic: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/profile")
      .then((res) => {
        setProfile(res.data);
        setFormData({
          username: res.data.username,
          profile_pic: res.data.profile_pic,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost:3001/profile", {
        ...profile,
        username: formData.username,
        profile_pic: formData.profile_pic,
      })
      .then((res) => {
        setProfile(res.data);
        alert("Profile updated successfully!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      {profile ? (
        <div className="d-flex flex-column align-items-center">
          {/* Profile Picture and Username */}
          <div className="d-flex flex-column align-items-center">
            <img
              src={formData.profile_pic}
              alt="profile"
              className="rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <h3 className="mt-3">{formData.username}</h3>
            <p>
              Followers:{" "}
              {profile.followers ? profile.followers.length : 0}
            </p>
          </div>

          {/* Editable Fields */}
          <div className="mt-4 w-50">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={formData.username}
              name="username"
              className="form-control mb-3"
              onChange={handleChange}
            />
            <label className="form-label">Profile Picture URL</label>
            <input
              type="text"
              value={formData.profile_pic}
              name="profile_pic"
              className="form-control mb-3"
              onChange={handleChange}
            />
          </div>

          {/* Update Button */}
          <div className="mt-3">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      ) : (
        <h5 className="text-center">LOADING...</h5>
      )}
    </div>
  );
}

export default Profile;
