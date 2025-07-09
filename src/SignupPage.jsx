import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignupPage() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);

    axios.post("/signup", params).then((response) => {
      console.log(response.data);
      event.target.reset();
      navigate("/login");
    }).catch((error) => {
  setErrors(error.response?.data?.errors || ["Signup failed"]);
});
  };

  return (
    <div>
      <h1>Create Your Free Account</h1>

      {errors.length > 0 && (
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input name="name" type="text" id="name" className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input name="email" type="email" id="email" className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input name="password" type="password" id="password" className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="password_confirmation" className="form-label">Password Confirmation:</label>
          <input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
    </div>
  )
}