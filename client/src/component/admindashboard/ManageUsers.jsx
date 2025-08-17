import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@mui/material";
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
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:8081/users/${userId}`)
        .then(() => {
          setUsers((prev) => prev.filter((user) => user.userId !== userId)); // instantly update UI
        })
        .catch((error) => {
          console.error("Delete failed:", error);
          alert("Failed to delete user. See console for details.");
        });
    }
  };

  // Approve user
  const handleApprove = async (userId) => {
    try {
      const res = await axios.put(`http://localhost:8081/users/${userId}/approve`);
      alert(res.data.status || "User approved successfully");
      fetchUsers(); // reload list
    } catch (err) {
      console.error(err);
      alert("Error approving user");
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
                <TableRow key={user.userId}>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.mobileNumber}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user.userId)}
                    >
                      Delete
                    </Button>
                    &nbsp;
                    {!user.approved && ( // show approve only if not approved
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApprove(user.userId)}
                      >
                        Approve
                      </Button>
                    )}
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
