import { useState, useEffect } from "react";
import "./notes.css";

export default function Notes({ isLoggedIn, username }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("userNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    localStorage.setItem("userNotes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note = {
      id: Date.now(),
      username: username,
      content: newNote,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      timestamp: new Date().toISOString()
    };

    setNotes([note, ...notes]);
    setNewNote("");
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddNote();
    }
  };

  if (!isLoggedIn) return null;

  return (
    <>
      {/* Floating Notes Button */}
      <button 
        className="notes-floating-btn"
        onClick={() => setIsOpen(true)}
      >
        📝 Notes
      </button>

      {/* Notes Modal */}
      {isOpen && (
        <div className="notes-modal-overlay">
          <div className="notes-modal">
            <div className="notes-header">
              <h2>My Notes</h2>
              <button 
                className="notes-close-btn"
                onClick={() => setIsOpen(false)}
              >
                ✖
              </button>
            </div>

            <div className="notes-input-section">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Write your note here... (Press Enter to save)"
                className="notes-textarea"
                rows="3"
              />
              <button 
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="notes-add-btn"
              >
                Add Note
              </button>
            </div>

            <div className="notes-list">
              {notes.length === 0 ? (
                <p className="no-notes">No notes yet. Start writing!</p>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="note-item">
                    <div className="note-header">
                      <span className="note-username">{note.username}</span>
                      <span className="note-date">{note.date}</span>
                    </div>
                    <div className="note-content">
                      {note.content}
                    </div>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="note-delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}