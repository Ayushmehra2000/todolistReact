import React, { useEffect } from 'react';
import './App.css';
import { getdata, todoSelector } from './features/counter/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Tasklist } from './pages/tasklist';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getdata());
  },[]);
  return (
    <div className="App">
      <h1>hello</h1>;
      <Tasklist />
    </div>
  );
}

export default App;
