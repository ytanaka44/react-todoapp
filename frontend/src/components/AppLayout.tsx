import { Box } from "@mui/material";
import React from "react";
import Sidebar from "./Sidebar";
import SideContent from "../todo/SideContent";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Outlet />
    </Box>
  );
};

export default AppLayout;
