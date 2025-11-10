// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.css'

//페이지 import
import MissionLog from "./pages/MissionLog/MissionLog";
import MissionDetail from "./pages/MissionDetail/MissionDetail";
import PhotoDetail from "./pages/PhotoDetail/PhotoDetail";
import AnswerDetail from "./pages/AnswerDetail/AnswerDetail";
import AddPhoto from "./pages/AddPhoto/AddPhoto";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <BrowserRouter>
      <Routes>
      <Route path="/MissionLog" element={<MissionLog/>}/>
      <Route path="/MissionDetail" element={<MissionDetail/>}/>
      <Route path="/PhotoDetail" element={<PhotoDetail/>}/>
      <Route path="/AnswerDetail" element={<AnswerDetail/>}/>
      <Route path="/AddPhoto" element={<AddPhoto/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
