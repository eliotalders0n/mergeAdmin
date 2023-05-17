// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
import useGetUsers from 'src/hooks/useGetGames';
// component
 

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter
}));


// ----------------------------------------------------------------------
 
export default function AppWeeklySales() {

let data = useGetUsers().docs


  return (
    <RootStyle> 
    <Typography variant="h1">{fShortenNumber(data.length)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Total Agents
      </Typography>
    </RootStyle>
  );
}
