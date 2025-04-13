// components/Sidebar/Sidebar.jsx

import { Drawer, Box, List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { isOpenState } from "../../utils/Atoms/userAtom";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser.username);
    }
  }, []);
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <Box p={2} width="250px" role="presentation">
        Welcome, {username ? username : "Guest"}!
        <List>
          <ListItem button component={NavLink} to="/dashboard/daily-tasks">
            <ListItemText primary="Daily Tasks" />
          </ListItem>
          <ListItem button component={NavLink} to="/dashboard/add-task">
            <ListItemText primary="Add Task" />
          </ListItem>
          <ListItem button component={NavLink} to="/dashboard/view-task">
            <ListItemText primary="View Tasks" />
          </ListItem>
          <ListItem button component={NavLink} to="/dashboard/manage-task">
            <ListItemText primary="Manage Tasks" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
