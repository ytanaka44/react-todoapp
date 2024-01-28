import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";

import TodoList from "./todo/TodoList";
import AppLayout from "./layout/AppLayout";
import TodoEdit from "./todo/components/TodoEdit";
import { BackgroundLocation } from "./todo/hooks/useModalRoute";
import { useTodos } from "./todo/hooks/useTodos";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "./theme";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import { PrivateRoute } from "./auth/PrivateRoute";

function App() {
  const location = useLocation();
  const background = (location.state as BackgroundLocation)?.background;
  const { todos, setTodos } = useTodos();
  const theme = createTheme();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes location={background || location}>
          <Route path="/" element={<PrivateRoute element={<AppLayout />} />}>
            <Route
              index
              element={
                <TodoList
                  todos={todos}
                  setTodos={setTodos}
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
                  filterFunction={(todo) => !todo.done}
                />
              }
            />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
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
