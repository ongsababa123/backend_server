import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Layout/Header";
import Image from "../image/img3.png";
import Swal from "sweetalert2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Room1 from "../image/room1.jpg";
import instance from "../axios.create";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
  },
};

const theme = createTheme();
const token = localStorage.getItem("token");

export default function Album(props) {
  const [rows, setrows] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    instance.post("authen",{},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === "ok") {
        } else {
              // Swal.fire({
          //   title: 'Authen Time Out',
          //   text: 'Please Login agin',
          //   icon: 'warning',
          //   confirmButtonText: 'OK'
          // }).then((result) => {
          //   if (result.isConfirmed) {
          //     localStorage.removeItem("token");
          //   }
          // });
        }
      });
      instance.get("superiordata").then((response) => {
        setrows(response.data);
        // console.log(response.data);
      });

  }, []);
  function check(temp) {
    const checkStatus = temp;
    const buttonColor = checkStatus ? "error" : "success";
    return buttonColor;
  }

  function check1(temp, price) {
    const checkStatus = temp;
    const Buttonname = checkStatus
      ? "ห้องไม่ว่าง"
      : "ห้องว่าง ราคา " + price + "/คืน";
    return Buttonname;
  }

  const handleClick = (param, id) => {
    if (param === 1) {
      Swal.fire({
        title: "ห้องไม่ว่าง",
        text: "ห้องไม่ว่าง โปรดเลือกห้องใหม่",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      if (token === null) {
        Swal.fire({
          title: "ยังไม่ได้เข้าสู่ระบบ",
          text: "โปรดเข้าสู่ระบบหรือสมัคสมาชิก",
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        sessionStorage.setItem("roomkey", id);
        window.location = "/pay1";
      }
    }
  };

  const color = "#14274A";
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box style={styles.paperContainer}>
          <Navbar />
          <Box
            color="transparent"
            sx={{
              pt: 10,
              pb: 10,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                variant="h5"
                align="center"
                color="common.white"
                paragraph
              >
                WELCOME TO
              </Typography>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="common.white"
                gutterBottom
              >
                Superior Room
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="common.white"
                paragraph
              >
                Book your stay and enjoy Luxury redefined at the most affordable
                rates.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              ></Stack>
            </Container>
          </Box>
        </Box>

        <Container sx={{ py: 1 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {rows.map((row) => (
              <Grid item key={row.id_room} xs={12} sm={12} md={12}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: 5,
                    }}
                    image={Room1}
                    alt="random"
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      bgcolor: color,
                      textAlign: "center",
                      color: "#f0f0f0",
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="h2">
                      {row.name_room}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography>{row.detill_room}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button
                      variant="contained"
                      color={check(row.status)}
                      onClick={() => handleClick(row.status, row.id_room)}
                    >
                      {check1(row.status, row.price)}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}

      {/* End footer */}
    </ThemeProvider>
  );
}
