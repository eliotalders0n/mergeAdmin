// material
import {
  Container,
  // Card,
  Typography,
  Grid,
} from "@mui/material";

import Page from "../components/Page";
import useGetUsers from "src/hooks/useGetUsers";
import AppBugReports from "src/sections/@dashboard/app/AppBugReports";
import useGetExtras from "src/hooks/useGetExtras";

import useGetHospitals from "src/hooks/useGetHospitals";
// import { fNumber } from "src/utils/formatNumber";


export default function DashboardApp() {
  let users = useGetUsers().docs;
  let services = useGetExtras().docs;
  let hospitals = useGetHospitals().docs;


  return (
    <Page title="Dashboard">
      <Container maxWidth>
        <Typography variant="overline">Overall</Typography>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppTotal data={users}/>
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports data={services} title={"Total Events"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports data={hospitals} title={"Total Groups"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}></Grid>
        </Grid>

       
      </Container>
    </Page>
  );
}
