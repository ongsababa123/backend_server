import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import React, { useEffect } from "react";
import Navbar from "../Layout/Header";
// import Footer from "../Layout/Footer";
import Swal from "sweetalert2";
import instance from "../axios.create";

const theme = createTheme();

export default function SignIn() {
  // const [name, setName] = useState('');

  const clientId =
    "581350385120-2kgkabehouvu40b0d1han5ct032ghr42.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        screen: "",
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const onSuccess = (res) => {
    // console.log('success', res);
  };
  const onFailure = (res) => {
    // console.log('failed', res);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const JsonData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    instance.post("login", JsonData).then((response) => {
      if (response.data.status === "ok") {
        localStorage.setItem("token", response.data.token);

        Swal.fire({
          title: "Login success",
          icon: "success",
        });
        // window.location = "/home";
        setTimeout(function(){ window.location = '/home';}, 1000);

      } else {
        Swal.fire({
          title: "Login failed",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });

    // fetch("http://localhost:3001/login", {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(JsonData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.status === 'ok') {

    //       Swal.fire({
    //         title: 'Login success',
    //         icon: 'success',
    //         confirmButtonText: 'OK'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           localStorage.setItem('token', data.token);
    //           window.location = '/home';
    //         }
    //       });
    //     } else {
    //       Swal.fire({
    //         title: 'Login failed',
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <GoogleLogin
              clientId={clientId}
              buttonText="Sign In with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
