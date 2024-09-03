import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css';

function Home() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="content">
          <div className="header">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=2000 2000w"
              className="logo"
              alt="Logo"
            />
            
            <Link to="/" className="title-link">
              Itinerator
            </Link>
            <br/>
           
          </div>
           <div className="auth-buttons">
              {user ? (
                <>
                  <Link to="/profile" className="button">Profile</Link>
                  <button onClick={handleSignOut} className="button">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="button">Log In</Link>
                  <Link to="/signup" className="button">Sign Up</Link>
                </>
              )}
            </div>
          <div className="subtitle">What should I do today?</div>
          <div className="description">Ai-powered itinerary generator.</div>
          <div className="buttons">
            <a href="/quiz" className="button">TAKE THE QUIZ</a>
            <a href="/surprise" className="button">SURPRISE ME</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;