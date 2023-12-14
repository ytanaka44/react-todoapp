import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import TodoList from "./todo/TodoList";
import AppLayout from "./components/AppLayout";
import TodoEdit from "./todo/TodoEdit";
import { BackgroundLocation } from "./todo/hooks/useModalRoute";
import { useTodos } from "./todo/hooks/useTodos";

function App() {
  const location = useLocation();
  const background = (location.state as BackgroundLocation)?.background;

  const { todos, setTodos, fetchTodos } = useTodos();

  return (
    <div className="App">
      <Routes location={background || location}>
        <Route path="/" element={<AppLayout />}>
          <Route
            index
            element={
              <TodoList
                todos={todos}
                setTodos={setTodos}
                fetchTodos={fetchTodos}
              />
            }
          />
          <Route
            path="/todos/:id"
            element={
              <TodoList
                todos={todos}
                setTodos={setTodos}
                fetchTodos={fetchTodos}
              />
            }
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/todos/:id"
            element={<TodoEdit todos={todos} setTodos={setTodos} />}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
