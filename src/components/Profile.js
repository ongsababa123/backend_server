import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Layout/Header";
import Image from "../image/img5.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Swal from "sweetalert2";
import instance from "../axios.create";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

const theme = createTheme();

export default function Profile() {
  const [stay, setStay] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    instance
      .post(
        "authen",
        {},
        {
          headers: {
            Authorization: `Basic ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.status === "ok") {
          const temp = response.data.decoded.email;
          const JsonData = {
            email: temp,
          };
          instance.post("user", JsonData).then((response) => {
            if (response.data.status === "ok") {
              setid(response.data["user"]["id"]);
              setIdcard(response.data["user"]["idcard"]);
              setName(response.data["user"]["name"]);
              setLastname(response.data["user"]["lastname"]);
              setEmail(response.data["user"]["email"]);
              setTel(response.data["user"]["tel"]);

              setBackupidcard(response.data["user"]["idcard"]);
              setBackupname(response.data["user"]["name"]);
              setBackuplastname(response.data["user"]["lastname"]);
              setBackupemail(response.data["user"]["email"]);
              setBackuptel(response.data["user"]["tel"]);
            } 
          });
        }else {
          Swal.fire({
            title: "Authen Time Out",
            text: "Please Login agin",
            icon: "warning",
            confirmButtonText: "OK",
          }).then((response) => {
            if (response.isConfirmed) {
              localStorage.removeItem("token");
              window.location = "/login";
            }
          });
        }
      });
  }, []);

  const color = "#D6A144";
  const [id, setid] = useState("");
  const [idcard, setIdcard] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  const [backupidcard, setBackupidcard] = useState("");
  const [backupname, setBackupname] = useState("");
  const [backuplastname, setBackuplastname] = useState("");
  const [backupemail, setBackupemail] = useState("");
  const [backuptel, setBackuptel] = useState("");

  const handleClick = () => {
    setIdcard(backupidcard);
    setName(backupname);
    setLastname(backuplastname);
    setEmail(backupemail);
    setTel(backuptel);
  };

  const Clickupdate = () => {
    const update_user = {
      id: id,
      idcard: idcard,
      name: name,
      lastname: lastname,
      email: email,
      tel: tel,
    };
    instance.put("update", update_user).then((response) => {
        if (response.data.status === "ok") {
          setStay(true);
          Swal.fire({
            title: "Update Success",
            text: "Please Login agin",
            icon: "success",
          })
          localStorage.removeItem("token");
              setTimeout(function(){ window.location = '/login';}, 1000);
        }
      
    });
   
  };
  return (
    <ThemeProvider theme={theme}>
      <main>
        {/* Hero unit */}
        <Box style={styles.paperContainer}>
          <Navbar />
          <Box
            color="transparent"
            elevation={0}
            sx={{
              pt: 5,
              pb: 10,
            }}
          >
            <Typography
              variant="h2"
              align="center"
              color="common.white"
              gutterBottom
            >
              MY PROFILE
            </Typography>
          </Box>
        </Box>
        {/* <Container  maxWidth="xl" disableGutters={true} > */}
        <Box
          sx={{
            backgroundColor: "#14274A",
            pt: 3,
            pb: 8,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "background.paper",
              boxShadow: 10,
              borderRadius: 2,
              p: 3,
              ml: 4,
              mr: 4,
              maxWidth: "sm",
            }}
          >
            <TextField
              id="idcard"
              label="idcard"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              InputProps={{
                readOnly: stay,
              }}
              onChange={(e) => setIdcard(e.target.value)}
              value={idcard}
            />

            <TextField
              id="name"
              label="name"
              value={name}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              InputProps={{
                readOnly: stay,
              }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="lastname"
              label="lastname"
              value={lastname}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              InputProps={{
                readOnly: stay,
              }}
              onChange={(e) => setLastname(e.target.value)}
            />
            <TextField
              id="email"
              label="email"
              value={email}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              InputProps={{
                readOnly: stay,
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="tel"
              label="Telephone"
              value={tel}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              InputProps={{
                readOnly: stay,
              }}
              onChange={(e) => setTel(e.target.value)}
            />
            {stay && (
              <Button
                startIcon={<ManageAccountsIcon />}
                sx={{
                  backgroundColor: color,
                  color: "white",
                  "&:hover": {
                    backgroundColor: color,
                  },
                }}
                fullWidth
                variant="contained"
                onClick={() => {
                  setStay(false);
                }}
              >
                Change About
              </Button>
            )}
            {!stay && (
              <div>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    Clickupdate();
                  }}
                >
                  update
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => {
                    setStay(true);
                    handleClick();
                  }}
                  sx={{ ml: 4 }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Box>
        </Box>
        {/* </Container> */}
      </main>
    </ThemeProvider>
  );
}
