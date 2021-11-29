import React, { useState } from 'react';
import { Search } from './components/search';
import './App.css';

function App() {
  const [data,setData]=useState([{}]);
  const newData=(val:Array<any>)=>{setData(val);console.log(val)}
  return (
   
    <div className="App">
     <Search newData={newData}></Search>
    </div>
  );
}

export default App;


