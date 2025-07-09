import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function NoteShowPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/notes/${id}.json`)
      .then((response) => {
        setNote(response.data);
      })
      .catch((err) => {
        console.error("Error fetching note:", err);
        setError("Note not found.");
      });
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!note) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h1>{note.title}</h1>
      <p>{note.body}</p>
    </div>
  );
}
