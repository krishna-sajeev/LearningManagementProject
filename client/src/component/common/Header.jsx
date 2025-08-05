import React from "react";
import { Box, Typography } from "@mui/material";

const Header = ({ title }) => {
  return (
    <Box
      bgcolor="#34495e"
      color="white"
      px={4}
      py={2}
      sx={{
        position: "fixed",
        top: 0,
        left: "220px", // shift right to avoid sidebar
        width: "calc(100vw - 220px)", // full width minus sidebar
        zIndex: 1000,
        boxShadow: 1,
        borderRadius: "0 0 8px 8px",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
