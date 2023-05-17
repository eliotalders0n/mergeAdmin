// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
import React,{useState, useEffect} from 'react'
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';
import firebase from './../../../firebase'
import useGetNeighbourhood from 'src/hooks/useGetNeighbourhood';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
}));


export default function AppNewUsers({data}) {
  let _data = data.filter(function (e) {
    return e.gender === "MALE";
  });

   
  return (
    <RootStyle> 
      <Typography variant="h1">{fShortenNumber(_data.length)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>      
        Male
      </Typography>
    </RootStyle>
  );
}
