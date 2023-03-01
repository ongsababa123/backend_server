import React, { useEffect, useState } from "react";
// import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import instance from "../axios.create";

export default function Orders() {
  const [rows, setrows] = useState([]);
  useEffect(() => {
    instance.get("roomdata").then((response) => {
      setrows(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Room Name</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Path</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nameroom}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.path}</TableCell>
              <Button variant="contained" color="success">
                Success
              </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
