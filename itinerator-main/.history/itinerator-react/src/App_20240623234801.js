import './App.css';

function App() {
  return (
    <div className="flex flex-col justify-center font-bold text-center text-teal-900 bg-white">
      <div className="flex justify-center items-center px-16 py-20 w-full bg-white max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col items-center mt-7 mb-72 max-w-full w-[492px] max-md:mb-10">
          <div className="flex gap-2 text-2xl whitespace-nowrap">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/18c1060fdb7de4a2128a3e5d304fea376e03e36e1f38556ee5a3fa91aae67d3d?apiKey=95bdd6893dbc47d0ac51c502bd26afe2&"
              className="shrink-0 aspect-square w-[57px]"
            />
            <div className="flex-auto my-auto">Itinerator</div>
          </div>
          <div className="self-stretch mt-60 text-5xl leading-[52.92px] max-md:mt-10 max-md:max-w-full">
            What should I do today?
          </div>
          <div className="mt-7 text-xs tracking-wider leading-4 text-slate-500">
            Ai-powered itinerary generator.
          </div>
          <div className="flex gap-5 justify-between mt-11 text-xs font-extrabold tracking-widest max-md:mt-10">
            <div className="justify-center px-7 py-4 rounded-md bg-slate-300 max-md:px-5">
              TAKE THE QUIZ
            </div>
            <div className="justify-center px-8 py-4 rounded-md bg-slate-300 max-md:px-5">
              SURPRISE ME
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
