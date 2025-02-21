import React, { useState } from "react";
import "./EditNotes.css";
import Tags from "../../components/Input/Tags";
import axiosapp from "../../utils/axiosapp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditNotes = ({ noteData, type, getAllNotes, onClose }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosapp.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        toast.success("Note added successfully!"); 
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message); 
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData?._id;
    try {
      const response = await axiosapp.put("/edit-note/" + noteId, {
        title,
        content,
        tags,
      });
      if (response.data && response.data.note) {
        getAllNotes();
        toast.success("Note updated successfully!");
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message); 
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      toast.error("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      toast.error("Please enter the content");
      return;
    }
    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-form">
        <label className="edit-label" htmlFor="title">
          TITLE
        </label>
        <input
          className="edit-input"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder="Notes Title"
        />
      </div>
      <div className="edit-form">
        <label className="edit-label" htmlFor="content">
          CONTENT
        </label>
        <textarea
          className="edit-input"
          id="content"
          placeholder="Notes Content"
          rows={6}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className="edit-form">
        <label className="edit-label">TAGS</label>
        <Tags tags={tags} setTags={setTags} />
      </div>
      {error && <p className="err-msg">{error}</p>}
      <div className="buttons-container">
        <button type="button" className="close-btn" onClick={onClose}>
          Close
        </button>
        <button type="button" className="edit-btn" onClick={handleAddNote}>
          {type === "add" ? "Add Note" : "Update Note"}
        </button>
      </div>
    </div>
  );
};

export default EditNotes;
