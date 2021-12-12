import React, { useState } from "react";
import { Search } from "./components/search";
import "./App.css";
import { movieData } from "./models/movieData";
import { DisplayMovieData } from "./components/diaplayMovieData";

function App() {
  const [stateValue, seStateValue] = useState({
    data: [] as movieData[],
    loading: false,
  });
  const newData = (val: Array<movieData>) => {
   // console.log(val)
    seStateValue({  data: val, loading: false });
  };
  const loaderHandler = (val: boolean) => {
  //  console.log(val)
    seStateValue({ ...stateValue, loading: val });
  };
  return (
    <div className="App">
      <Search newData={newData} loaderHandler={loaderHandler}></Search>
      {!stateValue.loading ? (
        <DisplayMovieData data={stateValue.data}></DisplayMovieData>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default App;
