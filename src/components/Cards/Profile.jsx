import React from "react";
import { getInitials } from "../../utils/helper";
import "./Profile.css";

const Profile = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="profile-container">
        <div className="user-container">
          <div className="profile-logo">{getInitials(userInfo?.fullName)}</div>
          <p className="profile-name">{userInfo.fullName}</p>
          <button type="button" onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default Profile;
