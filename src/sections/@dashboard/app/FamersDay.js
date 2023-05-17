// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
 
import React,{useState, useEffect} from 'react' 
import useGetPosts from 'src/hooks/useGetPosts';
// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));
 

export default function FamersDay({data}) {
 
 let posts = useGetPosts().docs
 
  return (
    <RootStyle>
 <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Posts Made
      </Typography>
      <Typography variant="h1">{(posts.length)}  </Typography>
 
    </RootStyle>
  );
}
