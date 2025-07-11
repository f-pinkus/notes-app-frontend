import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./LoginPage.css";

export function LoginPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useOutletContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);
    axios
      .post("/login", params)
      .then((response) => {
        localStorage.setItem("email", response.data.email);
        setIsLoggedIn(true);
        event.target.reset();
        navigate("/");
      })
      .catch(() => {
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div className="login-page container my-5 p-4 rounded shadow-sm">
      <h1 className="mb-4 text-success">Login</h1>

      {errors.length > 0 && (
        <div className="alert alert-danger rounded">
          <ul className="mb-0">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            name="email"
            type="email"
            id="email"
            className="form-control rounded"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            name="password"
            type="password"
            id="password"
            className="form-control rounded"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary rounded-pill">
          Login
        </button>
      </form>
    </div>
  );
}
