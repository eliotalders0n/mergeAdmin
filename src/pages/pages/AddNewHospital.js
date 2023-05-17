import { useState } from "react";
// material
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  Card,
  TextField,
} from "@mui/material";
// components
import Page from "../../components/Page";
import firebase from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function AddNewHospital() {
  let navigate = useNavigate();
  const [laoding, setlaoding] = useState(false);
  const [values, setValues] = useState(null);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const createGame = () => {
    setlaoding(true);
    firebase
      .firestore()
      .collection("groups")
      .add(values)
      .then((doc) => {
        let data = {
          id: doc.id,
        };
        setlaoding(false);
        navigate(`/editHospital/${doc.id}`, { state: data });
      });
  };

  return (
    <Page title="Dashboard">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
            <Card sx={{ p: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Add Group
              </Typography>

              <Stack spacing={3}>
                <TextField
                  fullWidth
                  name="name"
                  type="text"
                  onChange={handleChange("name")}
                  label="Name"
                />

                <TextField
                  fullWidth
                  onChange={handleChange("description")}
                  label="Description"
                />

                {laoding ? null : (
                  <Button
                    fullWidth={false}
                    variant="contained"
                    onClick={() => createGame()}
                  >
                    Save
                  </Button>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
