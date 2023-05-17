// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
 
import React,{useState, useEffect} from 'react' 
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));

 

export default function AppTotal({data}) {
 
//   const uniqueIds = [];

//   data.filter(element => {
//   const isDuplicate = uniqueIds.includes(element.contact_number);
//   if (!isDuplicate) {
//     uniqueIds.push(element.id);

//     return true;
//   }

//   return false;
// });
 
 

  return (
    <RootStyle> 
      <Typography variant="h1">{(data.length)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
     Overall Total Registrations
      </Typography>
    </RootStyle>
  );
}
