import React from "react";
import { Box, Container } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box
  sx={{
    height: "100vh",                // full height of screen
    width: "100vw",                 // full width of screen
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url("https://i.pinimg.com/236x/5e/16/98/5e1698206d0c5cab27a797b7dfee74d5.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: 2,                     
  }}
>
       <Container maxWidth="sm"
        sx={{
        
        }}>
        {children}
       </Container> 
    </Box>
  );
};

export default Layout;
