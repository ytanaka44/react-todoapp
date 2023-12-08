import { Box, Checkbox, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { getAllTodos } from "./api/api";
import { TodoState } from "./types/types";

const TodoList: React.FC = () => {
  const [datas, setDatas] = useState<TodoState[]>([]);

  const fetchTodos = async () => {
    const todos = await getAllTodos();
    setDatas(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Box p={3}>
        <Typography fontSize={22} align="left" pb={2}>
          Tasks
        </Typography>
        <Box sx={{ overflowY: "auto", maxHeight: "80vh" }}>
          {datas.map((data, index) => (
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
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TodoList;
