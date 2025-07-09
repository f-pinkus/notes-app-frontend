import { Link } from "react-router-dom";

export function NotesIndex({ notes }) {
  return (
    <div>
      <h1>Your Notes:</h1>

      {notes.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <Link to={`/notes/${note.id}`}>
            View Note
          </Link>
        </div>
      ))}
    </div>
  );
}
