import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Documents
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
