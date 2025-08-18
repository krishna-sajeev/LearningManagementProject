import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8081/users"); 
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    axios
      .delete(`http://localhost:8080/users/${id}`)
      .then(() => {
        console.log(`User with id ${id} deleted`);
        setUsers((prev) => prev.filter((user) => String(user.id) !== String(id))); // instantly update UI
      })
      .catch((error) => {
        console.error("Delete failed:", error);
        alert("Failed to delete user. See console for details.");
      });
  }
};


  return (
    <>
      <Sidebar role="admin" />
      <Header title="Manage Users" />
      <Box sx={{ marginLeft: "260px", marginTop: "64px", padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          User Management
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.mobileNumber}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ManageUsers;
