import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Layout/Header";
import Swal from 'sweetalert2'
import instance from "../axios.create";



const theme = createTheme();
export default function SignUp() {
  const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

     const JsonData = {
        id: data.get('id'),
        name: data.get('firstName'),
        lastname: data.get('lastName'),
        email: data.get('email'),
        tel: data.get('tel'),
        password: data.get('password'),
      }

      instance.post("register",JsonData).then((response) => {
        if (response.data.status === true) {
          Swal.fire({
            title: 'Register success',
            icon: 'success',
          })
          setTimeout(function(){ window.location = '/login';}, 1000);
        } else {
          Swal.fire({
            title: 'Register failed',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      });
      // fetch("http://localhost:3001/register", {
      //   method: "POST", // or 'PUT'
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(JsonData),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //   console.log(data);
      //     if (data.status === true) {
            
      //       Swal.fire({
      //         title: 'Register success',
      //         icon: 'success',
      //         confirmButtonText: 'OK'
      //       }).then((result) => {
      //         if (result.isConfirmed) {
      //           localStorage.setItem('token', data.token);
      //           window.location = "/login";
      //         }
      //       });
      //     } else {
      //       Swal.fire({
      //         title: 'Register failed',
      //         icon: 'error',
      //         confirmButtonText: 'OK'
      //       })
      //     }
      //     console.log("Success:", data);
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
          sx={{
            backgroundColor: "#14274A",
      
          }}
        >
           <Navbar />
        </Box>
     

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="id"
                  label="ID Card number"
                  name="id"
                  autoComplete="id"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="tel"
                  label="telophone"
                  name="tel"
                  autoComplete="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
