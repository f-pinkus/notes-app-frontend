import { Link } from "react-router-dom";
import "./NotesIndex.css";

export function NotesIndex({ notes }) {
  return (
    <div className="notes-index container py-4">
      <h1 className="mb-4">Your Notes:</h1>

      {notes.map((note) => (
        <div key={note.id} className="note-card mb-3 p-3">
          <h2 className="h5">{note.title}</h2>
          <Link to={`/notes/${note.id}`} className="btn btn-primary mt-2">
            View Note
          </Link>
        </div>
      ))}
    </div>
  );
}
