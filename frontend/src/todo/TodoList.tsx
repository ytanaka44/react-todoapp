import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { getAllTodos, updateTodo } from "./api/api";
import { TodoState } from "./types/types";
import AddIcon from "@mui/icons-material/Add";
import AddTodo from "./AddTodo";

const TodoList: React.FC = () => {
  const [datas, setDatas] = useState<TodoState[]>([]);

  const fetchTodos = async () => {
    const todos = await getAllTodos();
    setDatas(todos);
  };

  const handleCheckDone = async (data: TodoState) => {
    const updateData = { ...data, done: !data.done };
    await updateTodo(data.id, updateData);

    fetchTodos();
  };

  const handleCheckImportant = async (data: TodoState) => {
    const updateData = { ...data, important: !data.important };
    await updateTodo(data.id, updateData);

    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
          {datas
            .filter((data) => !data.done)
            .map((data, index) => (
              <Box key={data.id} sx={{ backgroundColor: "lightgray", mb: 1 }}>
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
                      checked={data.done}
                      onChange={() => handleCheckDone(data)}
                    />
                    <Box
                      sx={{
                        pl: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>{data.title}</Box>
                      <Box>{data.date}</Box>
                    </Box>
                  </Box>
                  <Checkbox
                    icon={<StarBorderOutlinedIcon />}
                    checkedIcon={<StarIcon />}
                    checked={data.important}
                    onChange={() => handleCheckImportant(data)}
                  />
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <AddTodo fetchTodos={fetchTodos} />
    </Box>
  );
};

export default TodoList;
