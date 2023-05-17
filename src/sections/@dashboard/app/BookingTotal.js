// material
import { styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fNumber, fShortenNumber } from '../../../utils/formatNumber';
//
const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 2, 2, 3)
}));

// ----------------------------------------------------------------------
 
export default function BookingTotal({data}) {
  let TOTAL = 0
  let completed_quotes = data.map((e)=> {
    if(e.status === "COMPLETED"){
      TOTAL = TOTAL + parseInt(e.TotalFees)
    }
  });
  return (
    <RootStyle>
      <div>
        <Typography variant="h3">R {fNumber(TOTAL)}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Total Cost of Completed Quotes
        </Typography>
      </div>
    </RootStyle>
  );
}
