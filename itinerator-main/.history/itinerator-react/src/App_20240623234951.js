import './App.css';
import * as React from "react";
import styled from "styled-components";

function App() {
  return (
    <Div>
      <Div2>
        <Div3>
          <Div4>
            <Img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&"
            />
            <Div5>Itinerator</Div5>
          </Div4>
          <Div6>What should I do today?</Div6>
          <Div7>Ai-powered itinerary generator.</Div7>
          <Div8>
            <Div9>TAKE THE QUIZ</Div9>
            <Div10>SURPRISE ME</Div10>
          </Div8>
        </Div3>
      </Div2>
    </Div>
  );
}

    <Div>
      <Div2>
        <Div3>
          <Div4>
            <Img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&"
            />
            <Div5>Itinerator</Div5>
          </Div4>
          <Div6>What should I do today?</Div6>
          <Div7>Ai-powered itinerary generator.</Div7>
          <Div8>
            <Div9>TAKE THE QUIZ</Div9>
            <Div10>SURPRISE ME</Div10>
          </Div8>
        </Div3>
      </Div2>
    </Div>
    
    const Div = styled.div`
  justify-content: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  color: #20434d;
  font-weight: 700;
  text-align: center;
`;

const Div2 = styled.div`
  background-color: #fff;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 80px 60px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const Div3 = styled.div`
  display: flex;
  width: 492px;
  max-width: 100%;
  flex-direction: column;
  align-items: center;
  margin: 29px 0 286px;
  @media (max-width: 991px) {
    margin-bottom: 40px;
  }
`;

const Div4 = styled.div`
  display: flex;
  gap: 8px;
  font-size: 24px;
  white-space: nowrap;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 57px;
`;

const Div5 = styled.div`
  font-family: Rubik, sans-serif;
  flex-grow: 1;
  flex-basis: auto;
  margin: auto 0;
`;

const Div6 = styled.div`
  font-variant-numeric: lining-nums proportional-nums;
  align-self: stretch;
  margin-top: 240px;
  font: 42px/126% Rubik, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Div7 = styled.div`
  color: #5c7b81;
  font-variant-numeric: lining-nums proportional-nums;
  letter-spacing: 0.96px;
  margin-top: 26px;
  font: 400 12px/138.5% Rubik, sans-serif;
`;

const Div8 = styled.div`
  display: flex;
  margin-top: 45px;
  gap: 20px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.4px;
  justify-content: space-between;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Div9 = styled.div`
  font-family: Raleway, sans-serif;
  border-radius: 5px;
  background-color: #b8d1d2;
  justify-content: center;
  padding: 17px 27px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const Div10 = styled.div`
  font-family: Raleway, sans-serif;
  border-radius: 5px;
  background-color: #b8d1d2;
  justify-content: center;
  padding: 17px 33px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;


export default App;


