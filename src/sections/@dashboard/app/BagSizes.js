// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
 
import React,{useState, useEffect} from 'react' 
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));
 
export default function BagSizes({data}) {
  
  let two = 0
  let five = 0
  let ten = 0
  let twofive = 0

 data.forEach(element => {
  if(element.bag_size === null || element.bag_size === ""){}else{
   
     if(element.bag_size === "2" && element.brand === "PIONEER"){two = two +  parseInt(element.number_of_bags)}
     if(element.bag_size === "5"&& element.brand === "PIONEER"){five = five +  parseInt(element.number_of_bags)}
     if(element.bag_size === "10"&& element.brand === "PIONEER"){ten = ten +  parseInt(element.number_of_bags)}
     if(element.bag_size === "25"&& element.brand === "PIONEER"){twofive = twofive +  parseInt(element.number_of_bags)}
     
   }
 });
 
  return (
    <RootStyle>
    <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total by Bag Size (PIONNER)
      </Typography>
    <Grid container>
      <Grid item xs={3}>      
      <Typography variant="h1">{fShortenNumber(two)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        2KG
      </Typography>
      </Grid>
      <Grid item xs={3}>      
      <Typography variant="h1">{fShortenNumber(five)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        5KG
      </Typography>
      </Grid>
      <Grid item xs={3}>      
      <Typography variant="h1">{fShortenNumber(ten)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        10KG
      </Typography>
      </Grid>
      <Grid item xs={3}>      
      <Typography variant="h1">{fShortenNumber(twofive)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        25KG
      </Typography>
      </Grid>
    </Grid>
  
    </RootStyle>
  );
}
