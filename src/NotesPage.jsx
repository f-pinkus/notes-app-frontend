import axios from "axios";
import { NotesIndex } from "./NotesIndex";
import { useState, useEffect } from "react";
// import { useOutletContext } from "react-router-dom";
import { NotesNew } from "./NotesNew";


export function NotesPage() {
  const [notes, setNotes] = useState([]);

  const handleIndex = () => {
    console.log("handleIndex!");

    axios.get("/notes.json").then((response) => {
      console.log(response.data);
      setNotes(response.data);
    });
  };

  useEffect(() => {
    handleIndex();
  }, []);


  const handleCreate = (params, successCallback) => {
    console.log("handleCreate!");

    axios.post("/notes.json", params).then((response) => {
      setNotes([...notes, response.data]);
      successCallback();
    });
  };
  
  return (
  <main>
    <NotesNew onCreate={handleCreate} />
    <NotesIndex notes={notes} />
  </main>
  );
}