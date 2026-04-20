import React from "react";

const Header = () => {
  const username = sessionStorage.getItem("username");

  const handleLogout = async () => {
    await fetch("/djangoapp/logout");
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="/">Dealership Reviews</a>
      <div className="navbar-nav me-auto">
        <a className="nav-link" href="/">Home</a>
        <a className="nav-link" href="/about">About</a>
        <a className="nav-link" href="/contact">Contact</a>
      </div>
      <div className="d-flex">
        {username ? (
          <>
            <span className="navbar-text text-white me-3">Hello, {username}</span>
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <a className="btn btn-outline-light me-2" href="/login">Login</a>
            <a className="btn btn-primary" href="/register">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
