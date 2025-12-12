import { useState } from "react";
import "./notes.css";

export default function NotesModal({ isOpen, onClose, onSubmit, recipeName }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("Please add some note content");
      return;
    }

    const note = {
      title: title.trim() || `Notes for ${recipeName}`,
      content: content.trim(),
      priority,
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString()
    };

    onSubmit(note);
    setTitle("");
    setContent("");
    setPriority("medium");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Notes for {recipeName}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="notes-form">


          <div className="form-group">
            <label htmlFor="note-content">Your Notes: *</label>
            <textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your personal notes, modifications, tips, or reminders..."
              rows="6"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}