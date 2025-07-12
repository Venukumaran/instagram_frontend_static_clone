import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const nav=useNavigate()
  return (
    <div className='m-3 position-fixed sidebar-container'>
      <div className='d-flex flex-column gap-3'>
        <img src="assets/images.png" alt="instagram" className='logo' />
        <div> <i className="bi bi-house-door-fill"></i> Home</div>
        <div> <i className="bi bi-search"></i> Search</div>
        <div> <i className="bi bi-compass"></i> Explore</div>
        <div> <i className="bi bi-play-btn"></i> Reels</div>
        <div> <i className="bi bi-chat-dots"></i> Messages</div>
        <div> <i className="bi bi-heart"></i> Notifications</div>
        <div> <i className="bi bi-plus-square"></i> Create</div>
        <div onClick ={()=>{nav("/profile")}}> <i className="bi bi-person-circle"></i> Profile</div>
      </div>

      <div className='position-fixed bottom-0 d-flex flex-column gap-3 mb-1'>
        <div> <i className="bi bi-threads"></i> Threads</div>
        <div> <i className="bi bi-list"></i> More</div>
      </div>
    </div>
  );
}

export default Sidebar;
