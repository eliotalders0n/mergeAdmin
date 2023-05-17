// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
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

 
export default function BagsTotal({data}) {
 

  let pannar = 0
  let pionner = 0

 data.forEach(element => {
  if(element.number_of_bags === null || element.number_of_bags === ""|| element.bag_size === null){}else{
   
     if(element.brand === "PANNER" || element.brand === "PANNAR")
     {
      pannar = pannar + parseInt(element.number_of_bags)
     }
     if(element.brand === "PIONEER")
     {
      pionner = pionner + parseInt(element.number_of_bags)
     }
   }
 });
 
  return (
    <RootStyle>
  <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Number of Bags by Brand
      </Typography>
      <Typography variant="h1">{(pannar)} : {pionner}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        PANNAR :  PIONEER
      </Typography>
    </RootStyle>
  );
}
