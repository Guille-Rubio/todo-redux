import React from "react";
import ToDoList from "./ToDoList";
import { Route, Routes } from "react-router-dom";


const Main = () => {

  return <main className="main">
    <Routes>
      <Route element={<ToDoList />} path="/" />
    </Routes>
  </main>;
};

export default Main;
