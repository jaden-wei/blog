import React from "react";
import "./style.scss";

import { useNavigate } from "react-router-dom";

import { HiOutlineNewspaper } from "react-icons/hi";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { IoCreateOutline, IoNotificationsOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

const Sidebar = ({}) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <div className="logo">
        <span>Jaden's Blog</span>
        <HiOutlineNewspaper className="icon" size={26} />
      </div>
      <div
        className="sidebar-item"
        onClick={() => {
          navigate("/");
        }}
      >
        <span>Dashbaord</span>
        <AiOutlineHome className="icon" size={24} />
      </div>
      <div
        className="sidebar-item"
        onClick={() => {
          navigate("/user");
        }}
      >
        <span>User</span>
        <FiUser className="icon" size={24} />
      </div>
      <div
        className="sidebar-item"
        onClick={() => {
          navigate("/notifications");
        }}
      >
        <span>Notifications</span>
        <IoNotificationsOutline className="icon" size={24} />
      </div>
      <div
        className="sidebar-item"
        onClick={() => {
          navigate("/about");
        }}
      >
        <span>About</span>
        <AiOutlineInfoCircle className="icon" size={24} />
      </div>
      <div className="sidebar-item">
        <span>Post</span>
        <IoCreateOutline
          className="icon"
          size={24}
          onClick={() => {
            navigate("/create");
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
