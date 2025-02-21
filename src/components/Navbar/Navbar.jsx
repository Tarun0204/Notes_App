import React, { useState } from "react";
import Profile from "../Cards/Profile";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Search from "../SearchBar/Search";
import { toast } from "react-toastify";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch, isMobileView }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const onLogout = () => {
    localStorage.clear();
    toast.success("Logout Successful!");
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <h1 className="logo-heading">Notes App</h1>
      </div>
      
      {isAuthenticated && !isMobileView && (
        <div className="navbar-search">
          <Search
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>
      )}

      <div className="navbar-profile">
        <Profile onLogout={onLogout} userInfo={userInfo} />
      </div>
    </div>
  );
};

export default Navbar;
