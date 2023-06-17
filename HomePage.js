import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to my app!</h1>
      <Link to="/other">
        <button className="round-button">Click me!</button>
      </Link>
    </div>
  );
}

export default HomePage;
