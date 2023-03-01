import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Room1 from "../image/room1.jpg";
import React, { useEffect, useState } from "react";
import instance from "../axios.create";

export default function Pay_room() {
  const [rows, setrows] = useState([]);
  // const nameroom = sessionStorage.getItem('nameroom');
  // const roomkey = sessionStorage.getItem('roomkey');
 
  useEffect(() => {
    const data = {
      nameroom: sessionStorage.getItem("nameroom"),
      roomkey: sessionStorage.getItem("roomkey"),
    };
    instance.post("payroom",data).then((response) => {
        setrows(response.data);
        // console.log(response.data);
      });
 
  }, []);

  return (
    <React.Fragment>
      {rows.map((row) => (
        <Card
          variant="outlined"
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={Room1}
              alt="green iguana"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {row.name_room}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {row.detill_room}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </React.Fragment>
  );
}
