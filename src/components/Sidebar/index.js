import React from "react";
import "./style.scss";

import { HiOutlineNewspaper } from "react-icons/hi";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { IoCreateOutline, IoNotificationsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="logo">
        <span>Jaden's Blog</span>
        <HiOutlineNewspaper className="icon" size={26} />
      </div>
      <div className="sidebar-item">
        <span>Dashbaord</span>
        <AiOutlineHome className="icon" size={24} />
      </div>
      <div className="sidebar-item">
        <span>User</span>
        <FiUser className="icon" size={24} />
      </div>
      <div className="sidebar-item">
        <span>Notifications</span>
        <IoNotificationsOutline className="icon" size={24} />
      </div>
      <div className="sidebar-item">
        <span>About</span>
        <AiOutlineInfoCircle className="icon" size={24} />
      </div>
      <div className="sidebar-item">
        <span>Post</span>
        <IoCreateOutline className="icon" size={24} />
      </div>
    </div>
  );
};

export default Sidebar;
