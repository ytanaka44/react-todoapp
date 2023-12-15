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
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "./theme";

function App() {
  const location = useLocation();
  const background = (location.state as BackgroundLocation)?.background;

  const { todos, setTodos, fetchTodos } = useTodos();

  const theme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes location={background || location}>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <TodoList
                  todos={todos}
                  setTodos={setTodos}
                  fetchTodos={fetchTodos}
                  filterFunction={(todo) => !todo.done}
                />
              }
            />
            <Route
              path="/important"
              element={
                <TodoList
                  todos={todos}
                  setTodos={setTodos}
                  fetchTodos={fetchTodos}
                  filterFunction={(todo) => todo.important}
                />
              }
            />
            <Route
              path="/all"
              element={
                <TodoList
                  todos={todos}
                  setTodos={setTodos}
                  fetchTodos={fetchTodos}
                  filterFunction={() => true}
                />
              }
            />
            <Route
              path="/complited"
              element={
                <TodoList
                  todos={todos}
                  setTodos={setTodos}
                  fetchTodos={fetchTodos}
                  filterFunction={(todo) => todo.done}
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
                  filterFunction={(todo) => !todo.done}
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
      </ThemeProvider>
    </div>
  );
}

export default App;
