import axios from "axios";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";import { useState, useEffect } from "react";
import { Header } from "./Header";
import { NotesPage } from "./NotesPage";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { Footer } from "./Footer";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [setNotes] = useState([]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("email"));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      handleNotesIndex();
    }
  }, [isLoggedIn]);

  const handleNotesIndex = () => {
    console.log("handleNotesIndex");

    axios.get("/notes.json").then((response) => {
      console.log("Notes:", response.data);
      setNotes(response.data);
    }).catch((error) => {
      console.error("Error fetching notes:", error);
    });
  }

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet context={{ 
        setIsLoggedIn
      }} />
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <NotesPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;