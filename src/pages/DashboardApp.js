// material
import {
  Container,
  // Card,
  Typography,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import Page from "../components/Page";
import useGetUsers from "src/hooks/useGetUsers";
import AppBugReports from "src/sections/@dashboard/app/AppBugReports";
import useGetExtras from "src/hooks/useGetExtras";
import useGetHospitals from "src/hooks/useGetHospitals";
import useGetPosts from "src/hooks/useGetPosts";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryPie,
  VictoryLine,
} from "victory";
import firebase from '../firebase'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import { fNumber } from "src/utils/formatNumber";

export default function DashboardApp() {
  let users = useGetUsers().docs;
  let leaders = useGetExtras().docs;
  let hospitals = useGetHospitals().docs;
  let posts = useGetPosts().docs;

  const servingOpps = posts.filter((post) => post.postType === "serve");
  const eventOpps = posts.filter((post) => post.postType === "event");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events data from Firestore
    const fetchEvents = async () => {
      try {
        const snapshot = await firebase.firestore().collection('posts').get();
        const eventsData = snapshot.docs.map(doc => ({
          title: doc.data().text,
          start: new Date(doc.data().startDate),
          end: new Date(doc.data().endDate),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.log('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);



  return (
    <Page title="Dashboard">
      <Container maxWidth>
        <Typography variant="overline">Overall</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports data={leaders} title={"Total Leaders"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports data={hospitals} title={"Total Groups"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports data={users} title={"Total Users"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports data={posts} title={"Total Posts"} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppBugReports data={servingOpps} title={"Total Serving Opps"} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppBugReports data={eventOpps} title={"Total Events"} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
              <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4]}
                tickFormat={["Group 1", "Group 2", "Group 3", "Group 4"]}
              />
              <VictoryBar
                data={posts}
                // data accessor for x values
                x="user_name"
                // data accessor for y values
                y="group"
              />
            </VictoryChart>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <VictoryPie
              data={[
                { x: "Group 1", y: 35 },
                { x: "Group 2", y: 40 },
                { x: "Group 3", y: 55 },
                { x: "Group 4", y: 30 },
                { x: "Group 5", y: 20 },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" },
                }}
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 3 },
                  { x: 3, y: 5 },
                  { x: 4, y: 4 },
                  { x: 5, y: 7 },
                ]}
              />
            </VictoryChart>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={10}>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
