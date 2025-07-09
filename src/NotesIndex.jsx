export function NotesIndex({ notes, onShow }) {
  return (
    <div>
      <h1>Your Notes:</h1>

      {notes.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <button onClick={() => onShow(note)}>View Note</button>
        </div>
      ))}
    </div>
  );
}