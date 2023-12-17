import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LightModeIcon from "@mui/icons-material/LightMode";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Link, useNavigate } from "react-router-dom";
import Signout from "../auth/Signout";

interface SidebarProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { window } = props;
  const navigate = useNavigate();
  const listItems = [
    {
      text: "Todos",
      icon: <FormatListBulletedIcon />,
      to: "/",
    },
    {
      text: "Important",
      icon: <StarIcon />,
      to: "/important",
    },
    {
      text: "Planned",
      icon: <CalendarMonthIcon />,
      to: "planned",
    },
    {
      text: "All",
      icon: <AllInclusiveIcon />,
      to: "/all",
    },
    {
      text: "Complited",
      icon: <TaskAltIcon />,
      to: "complited",
    },
  ];

  // 例えば、クリックイベントに対する処理
  const handleItemClick = (to: string) => {
    navigate(to);
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: "280px" },
        height: "100vh",
        borderRight: 1, // 1ピクセルの右境界線を追加
        borderColor: "divider", // デフォルトの境界線色を使用
        bgcolor: "secondary.main",
        color: "secondary.contrastText",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Toolbar variant="regular" sx={{ fontSize: "22px" }}>
          ToDo App
        </Toolbar>
        <Divider />
        <List>
          {listItems.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleItemClick(item.to)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
      <Box sx={{ pb: 2 }}>
        <Signout />
      </Box>
    </Box>
  );
};

export default Sidebar;
