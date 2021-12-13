import React, { useState } from "react";
import { Search } from "./components/search";
import "./App.css";

import { DisplayMovieData } from "./components/diaplayMovieData";
import { movieImdbData } from "./models/movieExtraData";

function App() {
  const [stateValue, seStateValue] = useState({
    data: [] as movieImdbData[],
    loading: false,
  });
  const newData = (val: Array<movieImdbData>) => {
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
