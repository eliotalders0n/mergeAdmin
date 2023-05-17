import { useLocation } from "react-router-dom";
// import { useState } from "react";
// material
import {
  Grid,
  Container,
  Stack,
  Typography,
  Card,
  Divider,
  Box,
} from "@mui/material";
// components
import Page from "../../../components/Page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPasswordForm from "src/pages/ResetPasswordForm";

export default function ViewUser() {
  const location = useLocation();
  const { data } = location.state;
  //  const {data} = GetUser

  // const sendNotification = (msg) => {
  //   var formdata = new FormData();
  //   formdata.append("to", data.token);
  //   formdata.append("title", "Taximania Admin");
  //   formdata.append("body", "Your account was " + msg);

  //   var requestOptions = {
  //     method: "POST",
  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "https://corserver.onrender.com/https://exp.host/--/api/v2/push/send",
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // };

  return (
    <Page title="Dashboard">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Container maxWidth="xl">
        <Stack direction="row" justifyContent={"space-between"}>
          <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              {data.name}
            </Typography>
          </Stack>
        </Stack>
        {/* <Stack direction={"row"} spacing={3}>
          <Button
            size="small"
            variant="contained"
            color="success"
            onClick={() => update("APPROVED")}
            style={{ textDecoration: "none" }}
          >
            APPROVE
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => update("DENIED")}
            style={{ textDecoration: "none" }}
          >
            DENIED
          </Button>
        </Stack> */}
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
            <Typography variant="overline">Details</Typography>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                {data?.documents?.PHOTO && (
                  <Box
                    component="img"
                    src={data?.documents?.PHOTO}
                    sx={{ width: 140, height: 140, borderRadius: 2 }}
                  />
                )}
                <Typography variant="overline">Full Name</Typography>
                <Typography variant="h5">
                  {data.firstName} {data.lastName}
                </Typography>

                <Typography variant="overline">Email</Typography>
                <Typography variant="h5">{data.email}</Typography>

                <Typography variant="overline">Group</Typography>
                <Typography variant="h5">{data.group}</Typography>

                <Typography variant="overline">Password</Typography>
                <Typography variant="h5">{data.password}</Typography>
                <ResetPasswordForm />

              </Stack>
            </Card>
            <br />
            <br />
            <Typography variant="overline">Documents</Typography>
            <Card sx={{ p: 3 }}>
             
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}
