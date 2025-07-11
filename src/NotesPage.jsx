import axios from "axios";
import { useState, useEffect } from "react";
import { NotesIndex } from "./NotesIndex";
import { NotesNew } from "./NotesNew";
import "./NotesPage.css";

export function NotesPage() {
  const [notes, setNotes] = useState([]);

  const handleIndex = () => {
    axios.get("/notes.json").then((response) => {
      setNotes(response.data);
    });
  };

  useEffect(() => {
    handleIndex();
  }, []);

  const handleCreate = (params, successCallback) => {
    axios.post("/notes.json", params).then((response) => {
      setNotes([...notes, response.data]);
      successCallback();
    });
  };

  return (
    <main className="notes-page container py-5">
      <div className="row g-5">
        <div className="col-lg-5">
          <NotesNew onCreate={handleCreate} />
        </div>
        <div className="col-lg-7">
          <NotesIndex notes={notes} />
        </div>
      </div>
    </main>
  );
}
