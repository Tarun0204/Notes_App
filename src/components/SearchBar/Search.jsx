import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import "./Search.css";

const Search = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="search-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Search Notes"
          className="search-input"
          value={value}
          onChange={onChange}
        />
        {value && <IoMdClose className="close-icon" onClick={onClearSearch} />}
        <FaSearch className="search-icon" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default Search;
