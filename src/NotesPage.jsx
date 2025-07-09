import axios from "axios";
import { NotesIndex } from "./NotesIndex";
import { useState, } from "react";
// import { useOutletContext } from "react-router-dom";
import { NotesShow } from "./NotesShow";
import { NotesNew } from "./NotesNew";


export function NotesPage() {
  const [notes, setNotes] = useState([]);
  // const [isNotesShowVisible, setIsNotesShowVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState({});

  const HandleIndex = () => {
    console.log("handleIndex!");

    axios.get("/notes.json").then((response) => {
      console.log(response.data);
      setNotes(response.data);
    });
  };


  const handleCreate = (params, successCallback) => {
    console.log("handleCreate!");

    axios.post("/notes.json", params).then((response) => {
      setNotes([...notes, response.data]);
      successCallback();
    });
  };

  const handleShow = (note) => {
    console.log("handleShow!", note);

    // setIsNotesShowVisible(true);
    setCurrentNote(note);
  }
  
  return (
  <main>
    <NotesNew onCreate={handleCreate} />
    <NotesIndex notes={notes} onShow={handleShow} />
    <NotesShow note={currentNote} />
  </main>
  );
}