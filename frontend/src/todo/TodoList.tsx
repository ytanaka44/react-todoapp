import { Box, Checkbox, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { getAllTodos, updateTodo } from "./api/api";
import { TodoState } from "./types/types";
import AddTodo from "./AddTodo";
import useModalRoute from "./hooks/useModalRoute";
import { useTodos } from "./hooks/useTodos";
import { useNavigate } from "react-router-dom";

interface TodoListProps {
  todos: TodoState[];
  setTodos: React.Dispatch<React.SetStateAction<TodoState[]>>;
  fetchTodos: () => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  const { editModalPath } = useModalRoute();

  // const fetchTodos = async () => {
  //   const todos = await getAllTodos();
  //   setDatas(todos);
  // };

  const handleCheckDone = async (todo: TodoState) => {
    const updateData = { ...todo, done: !todo.done };
    await updateTodo(todo.id, updateData);

    props.setTodos(props.todos.map((t) => (t.id === todo.id ? updateData : t)));
  };

  const handleCheckImportant = async (todo: TodoState) => {
    const updateData = { ...todo, important: !todo.important };
    await updateTodo(todo.id, updateData);

    props.setTodos(props.todos.map((t) => (t.id === todo.id ? updateData : t)));
  };

  const handleEdit = (todo: TodoState) => {
    editModalPath(`/todos/${todo.id}`, todo.id);
  };

  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box>
        <Typography fontSize={22} align="left" pb={2}>
          Tasks
        </Typography>
        <Box sx={{ overflowY: "auto", maxHeight: "75vh" }}>
          {props.todos
            .filter((todo) => !todo.done)
            .map((todo, index) => (
              <Box
                key={todo.id}
                sx={{ backgroundColor: "lightgray", mb: 1, cursor: "pointer" }}
                onClick={() => handleEdit(todo)}
              >
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    p: 2,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      icon={<CircleOutlinedIcon />}
                      checkedIcon={<CheckCircleOutlinedIcon />}
                      checked={todo.done}
                      onChange={() => handleCheckDone(todo)}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        e.stopPropagation()
                      }
                    />
                    <Box
                      sx={{
                        pl: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>{todo.title}</Box>
                      <Box>{todo.date}</Box>
                    </Box>
                  </Box>
                  <Checkbox
                    icon={<StarBorderOutlinedIcon />}
                    checkedIcon={<StarIcon />}
                    checked={todo.important}
                    onChange={() => handleCheckImportant(todo)}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      e.stopPropagation()
                    }
                  />
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <AddTodo fetchTodos={props.fetchTodos} />
    </Box>
  );
};

export default TodoList;
