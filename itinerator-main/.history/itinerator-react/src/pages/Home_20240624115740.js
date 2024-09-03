import React from 'react';
import '../css/styles.css'; // Assuming you have a separate CSS file for styles

function Home() {
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
            <div className="title">Itinerator</div>
          </div>
          <div className="subtitle">What should I do today?</div>
          <div className="description">Ai-powered itinerary generator.</div>
          <div className="buttons">
					  <a href="/quiz" className="button">TAKE THE QUIZ</a>
					  <a href="/quiz" className="button">TAKE THE QUIZ</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;