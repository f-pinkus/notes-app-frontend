export function NotesShow({ note }) {
  return (
    <div>
      <h1>{note.title}</h1>

      <p>{note.body}</p>
    </div>
  );
}