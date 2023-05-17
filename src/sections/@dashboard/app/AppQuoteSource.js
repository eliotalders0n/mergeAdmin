// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import Iconify from '../../../components/Iconify';
import firebase from '../../../firebase'
import React,{useState, useEffect} from 'react'
import useGetNeighbourhood from 'src/hooks/useGetNeighbourhood';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));

const TOTAL = 234;

export default function AppQuoteSource({data}) {
 
  let asd = []
let sdf = []
let nin = []
let mob = []
let pc = []
  let _data = data.filter(function (e) {
   if(e.platform === "XBOX")
   {
    asd.push(e)
   }
   if(e.platform === "PLAYSTATION")
   {
    sdf.push(e)
   }
   if(e.platform === "PC")
   {
    pc.push(e)
   }
   if(e.platform === "MOBILE")
   {
    mob.push(e)
   }
   if(e.platform === "NINTENDO")
   {
    nin.push(e)
   }
  });
 
  return (
    <RootStyle>
 
      <Typography variant="h1">{fShortenNumber(asd.length)}:{fShortenNumber(sdf.length)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
       Male : Female
      </Typography>
    </RootStyle>
  );
}
