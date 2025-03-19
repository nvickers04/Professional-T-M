import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to T&M App</h1>
      <p>Please choose an option:</p>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
    </div>
  );
}

export default Home;