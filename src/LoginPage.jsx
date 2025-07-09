import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

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
        console.log(response.data);
        localStorage.setItem("email", response.data.email);
        setIsLoggedIn(true);
        event.target.reset();
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Invalid email or password"]);
      });
  };

  return (
    <div className="container my-5" id="login">
      <h1 className="mb-4">Login</h1>

      {errors.length > 0 && (
        <div className="alert alert-danger">
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
          <input name="email" type="email" id="email" className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input name="password" type="password" id="password" className="form-control" required />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
