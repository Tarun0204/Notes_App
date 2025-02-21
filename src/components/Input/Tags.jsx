import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const Tags = ({ tags = [], setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="tags-input-container">
      {tags.length > 0 && (
        <div className="tags-list">
          {tags.map((tag, index) => (
            <div key={index} className="tag-item">
              <span className="tag-name">#{tag}</span>
              <button
                className="remove-tag-btn"
                onClick={() => handleRemoveTag(tag)}
              >
                <MdClose />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="tags-input-wrapper">
        <input
          type="text"
          className="tag-input"
          placeholder="Add Tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        <button className="tags-action-btn" onClick={addNewTag}>
          <MdAdd />
        </button>
      </div>
    </div>
  );
};

export default Tags;
