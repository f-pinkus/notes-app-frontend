import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";

export function SignupPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);

    axios
      .post("/signup", params)
      .then(() => {
        event.target.reset();
        navigate("/login");
      })
      .catch((error) => {
        setErrors(error.response?.data?.errors || ["Signup failed"]);
      });
  };

  return (
    <div className="signup-page container my-5 p-4 rounded shadow-sm">
      <h1 className="mb-4 text-success">Create Your Free Account</h1>

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
          <label htmlFor="name" className="form-label">Name:</label>
          <input name="name" type="text" id="name" className="form-control rounded" required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input name="email" type="email" id="email" className="form-control rounded" required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input name="password" type="password" id="password" className="form-control rounded" required />
        </div>

        <div className="mb-3">
          <label htmlFor="password_confirmation" className="form-label">Password Confirmation:</label>
          <input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
            className="form-control rounded"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary rounded-pill">
          Create Account
        </button>
      </form>
    </div>
  );
}
