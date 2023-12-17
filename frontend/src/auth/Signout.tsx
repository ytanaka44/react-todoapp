import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Signout: React.FC = () => {
  const handleSignout = () => {
    signOut(auth);
  };
  return (
    <List>
      <ListItem key="signout" disablePadding>
        <ListItemButton onClick={handleSignout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Signout" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default Signout;
