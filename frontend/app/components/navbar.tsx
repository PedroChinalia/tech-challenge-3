'use client'

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Blog Escolar
        </Typography>

        <Box>
          <Button variant="contained" color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
