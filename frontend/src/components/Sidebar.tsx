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

interface SidebarProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { window } = props;
  const listItems = [
    {
      text: "Todos",
      icon: <FormatListBulletedIcon />,
      onClick: () => handleItemClick("Inbox"),
    },
    {
      text: "Important",
      icon: <StarIcon />,
      onClick: () => handleItemClick("Starred"),
    },
    {
      text: "Planned",
      icon: <CalendarMonthIcon />,
      onClick: () => handleItemClick("Send email"),
    },
    {
      text: "All",
      icon: <AllInclusiveIcon />,
      onClick: () => handleItemClick("Drafts"),
    },
    {
      text: "Complited",
      icon: <TaskAltIcon />,
      onClick: () => handleItemClick("Drafts"),
    },
  ];

  // 例えば、クリックイベントに対する処理
  const handleItemClick = (text: string) => {
    console.log(`${text} clicked`);
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
        {listItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={item.onClick}>
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
