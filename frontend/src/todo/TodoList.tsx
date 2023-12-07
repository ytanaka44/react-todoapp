import { CheckBox } from "@mui/icons-material";
import { Box, Checkbox, Typography } from "@mui/material";
import React from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";

const TodoList: React.FC = () => {
  const dummyData = [
    {
      id: "0",
      title: "title1です",
      done: false,
      important: false,
      date: "test1",
      createdAt: "2023-12-07-07:22:23",
    },
    {
      id: "1",
      title: "title1です",
      done: false,
      important: false,
      date: "test1",
      createdAt: "2023-12-07-07:22:23",
    },
    {
      id: "2",
      title: "title1です",
      done: false,
      important: false,
      date: "test1",
      createdAt: "2023-12-07-07:22:23",
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Box p={3}>
        <Typography fontSize={22} align="left" pb={2}>
          Tasks
        </Typography>
        <Box sx={{ overflowY: "auto", maxHeight: "80vh" }}>
          {dummyData.map((data, index) => (
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
