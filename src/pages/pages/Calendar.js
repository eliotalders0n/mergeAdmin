import FullCalendar, { formatDate } from '@fullcalendar/react'; // => request placed at the top
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { useState, useRef, useEffect } from 'react';
// material
import { useTheme } from '@mui/material/styles';
import { Card, Button, Container, DialogTitle, useMediaQuery, Typography, Stack, Grid, Divider } from '@mui/material';

// import { DialogAnimate } from '../../components/animate';
// import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import firebase from '../../firebase'
// import useGetBookings from 'src/hooks/useGetBookings';
// import GetCar from './users/GetCar';
import GetUser from './users/GetUser';
// import useGetBookingById from 'src/hooks/useGetBookingById';
import { fNumber } from 'src/utils/formatNumber';
import { Link } from 'react-router-dom';

export default function Calendar() {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const calendarRef = useRef(null);
  const [date, setDate] = useState(new Date()); 
  // let events = useGetBookings().docs

  const [eventClickInfo, setEventClickInfo] = useState(null);

  const handleEventClick = (info) => {
    info.jsEvent.preventDefault()
    setEventClickInfo(info);
  };
   
 console.log(eventClickInfo?.event, "here")

const [events_, setevents_] = useState([])

  // useEffect(() => {
  //   let sdf = []
  //   events.forEach((item)=>{
  //     let asd = {
  //       title : item.car_id,
  //       start : new firebase.firestore.Timestamp(item.startDate.seconds, item.startDate.nanoseconds).toDate() ,
  //       end : new firebase.firestore.Timestamp(item.endDate.seconds, item.endDate.nanoseconds).toDate() ,  
  //       id : item.app_user_id,
  //       url : item.id,
  //       borderColor:"transparent", 
  //       backgroundColor:item.status === "PENDING" ? "#7A0C2E80" : item.status === "COMPLETE" ? "#00AB5580" : "#FFC10780"
  //     }
  //     sdf.push(asd)

  //   })

  //   setevents_(sdf)
  // }, [events])
  
  function renderEventContent(eventInfo) {
    return (
       <CalendarItem data={eventInfo}/> 
    )
  }
  return (
    <Container >
 
      <Grid container maxWidth={"xl"}>
        <Grid item xs={10} md={10}>
        <Card>
         
         {events_ && <FullCalendar
          headerToolbar={{
           left: 'prev,next today',
           center: 'title',
           right: 'dayGridMonth'
         }}
           weekends
           editable
           droppable
           selectable
           events={events_}
           ref={calendarRef}
           rerenderDelay={10}
           initialDate={date}
           initialView={"dayGridMonth"}
           dayMaxEventRows={3}
           eventDisplay="block"
           themeSystem="standard"
           allDayMaintainDuration
           eventResizableFromStart
           eventContent={renderEventContent}
           
           eventClick={handleEventClick}
          
           height={isMobile ? 'auto' : 720}
           plugins={[listPlugin, dayGridPlugin,  interactionPlugin]}
         />}          
     </Card>
        </Grid>
        <Grid item xs={2} md={2} sx={{p:2}}>
        <Stack>
        {eventClickInfo &&
        <div>
        <Typography variant="overline">Booking Details</Typography>
        </div> }<br/>
        <Typography variant="overline">Key</Typography>
        <br/>
        <Divider />
        <br/>
          <Typography variant="overline" color="#7A0C2E">Pending -  Client sent a car hire request and is pending review and approval from Admin.</Typography>
          <br/><Typography variant="overline" color="#FFC107">Collected - Reservation was approved and the car was collected by the client.</Typography>
          <br/><Typography variant="overline" color="#00AB55">Completed - Client has returned the car and has been invoiced by the Admin.</Typography>
       
        </Stack>
        
        </Grid>
      </Grid>
     
      </Container>
 
  );
}
 
function CalendarItem({data}) {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
    <Typography variant="overline"><GetUser data={data.event.id} />
    {formatDate(data.event.start, {year: 'numeric', month: 'short', day: 'numeric'})}
       </Typography>
       
       <Typography variant="overline">{formatDate(data.event.end, {year: 'numeric', month: 'short', day: 'numeric'})}</Typography>
    </Stack>
  )
}




