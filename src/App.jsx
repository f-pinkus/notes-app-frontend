import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { NotesPage } from "./NotesPage";
import { NoteShowPage } from "./NoteShowPage";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { Footer } from "./Footer";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("email"));
  }, []);

  return (
    <div className="app-layout d-flex flex-column min-vh-100">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      <main className="flex-grow-1 container py-4" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
        <Outlet context={{ setIsLoggedIn }} />
      </main>
      
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
        element: <Navigate to="/notes" replace />,
      },
      {
        path: "/notes",
        element: <NotesPage />,
      },
      {
        path: "/notes/:id",
        element: <NoteShowPage />,
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
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
