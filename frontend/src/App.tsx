import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TodoList from "./todo/TodoList";
import AppLayout from "./components/AppLayout";
import TodoEdit from "./todo/TodoEdit";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<TodoList />} />
            <Route path="/edit/:id" element={<TodoEdit />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
