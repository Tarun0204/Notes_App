import React from "react";
import moment from "moment";
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import "./NoteCard.css";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="note-card-container">
      <div className="note-header">
        <h6 className="notes-title">{title}</h6>
        <MdOutlinePushPin
          className={`pin-icon ${isPinned ? "pinned" : ""}`}
          onClick={onPinNote}
        />
      </div>
      <span className="notes-date">{moment(date).format("Do MMM YYYY")}</span>
      <p className="note-content">{content}</p>
      <div className="actions-container">
        <div className="tags-container">{tags.map((item) => `#${item}`)}</div>
        <div className="actions">
          <MdCreate className="action-icon edit-icon" onClick={onEdit} />
          <MdDelete className="action-icon delete-icon" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
