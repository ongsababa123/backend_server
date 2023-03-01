import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Layout/Header";
import Footer from "../Layout/Footer";
import Image from "../image/img3.png";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Swal from 'sweetalert2'
import instance from "../axios.create";


const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
  },
};

const theme = createTheme();

export default function Album() {
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
              Swal.fire({
            title: 'Authen Time Out',
            text: 'Please Login agin',
            icon: 'warning',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem("token");
            }
          });
        }
      });
  }, []);

  const handlelogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/Home";
  };
  const color = "#D6A144";

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
                CONVENIENT GRAND HOTELS
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
              >
                <Button
                  startIcon={<CalendarMonthIcon />}
                  variant="contained"
                  onClick={handlelogout}
                  sx={{
                    backgroundColor: color,
                    color: "white",
                    "&:hover": {
                      backgroundColor: color,
                    },
                  }}
                >
                  Book Now
                </Button>
              </Stack>
            </Container>
          </Box>
        </Box> 
      </main>
      {/* Footer */}
      <Footer />

      {/* End footer */}
    </ThemeProvider>
  );
}
