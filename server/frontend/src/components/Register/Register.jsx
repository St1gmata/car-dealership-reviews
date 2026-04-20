import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/djangoapp/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.status === 201 || data.success) {
        alert("Registration successful");
        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input name="username" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input name="first_name" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input name="last_name" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" type="email" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input name="password" type="password" className="form-control" onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
