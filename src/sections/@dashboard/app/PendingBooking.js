// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fNumber, fShortenNumber } from '../../../utils/formatNumber';
//
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));


// ----------------------------------------------------------------------
 
export default function PendingBooking({data}) {
  var result = data.filter(function(v, i) {
    return ((v.status === "PENDING"))
    })
  return (
    <RootStyle>
         <Typography variant="h1">{(result.length)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Pending Bookings
        </Typography>
  
    </RootStyle>
  );
}
