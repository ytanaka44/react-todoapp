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
        width: { sm: "360px" },
        height: "100vh",
        backgroundColor: "lightgray",
      }}
    >
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
  );
};

export default Sidebar;
