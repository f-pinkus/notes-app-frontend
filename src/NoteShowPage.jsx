import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./NoteShowPage.css";

export function NoteShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/notes/${id}.json`)
      .then((response) => {
        setNote(response.data);
        setFormData({ title: response.data.title, body: response.data.body });
      })
      .catch(() => setError("Note not found."));
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    axios.delete(`/notes/${id}.json`).then(() => {
      navigate("/notes");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(`/notes/${id}.json`, {
        note: {
          title: formData.title,
          body: formData.body,
        },
      })
      .then((response) => {
        setNote(response.data);
        setEditing(false);
      })
      .catch(() => alert("Error updating note."));
  };

  if (error) return <p>{error}</p>;
  if (!note) return <p>Loading...</p>;

  return (
    <div className="note-show container mt-4">
      <button className="btn btn-link mb-3" onClick={() => navigate("/notes")}>
        ← Back to All Notes
      </button>

      {!editing ? (
        <div className="note-card p-4">
          <h1>{note.title}</h1>
          <p>{note.body}</p>
          <button className="btn btn-primary me-2" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      ) : (
        <div className="note-edit-form p-4">
          <h2>Edit Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                name="title"
                className="form-control"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Body</label>
              <textarea
                name="body"
                className="form-control"
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success me-2">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
