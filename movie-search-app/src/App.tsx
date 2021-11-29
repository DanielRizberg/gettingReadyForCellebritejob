import React, { useState } from 'react';
import { Search } from './components/search';
import './App.css';
import { movieData } from './models/movieData';
import {DisplayMovieData} from './components/diaplayMovieData';

function App() {
  const [data,setData]=useState([] as movieData[]);
  const newData=(val:Array<movieData>)=>{setData(val);}
  return (
   
    <div className="App">
     <Search newData={newData}></Search>
     <DisplayMovieData data={data}></DisplayMovieData>
    </div>
  );
}

export default App;


