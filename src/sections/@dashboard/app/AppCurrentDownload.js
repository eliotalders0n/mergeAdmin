import { merge } from 'lodash';
import {useState, useEffect} from 'react'
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader, LinearProgress, Stack, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../charts/index';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 361;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

function ProgressItem({ progress }) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>
        <Typography variant="subtitle2">{progress.total}</Typography>
       
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress.total}
        color={
          (progress.label === 'Total Income' && 'info') ||
          (progress.label === 'Total Expenses' && 'warning') ||
          'primary'
        }
      />
    </Stack>
  );
}
// ----------------------------------------------------------------------

export default function AppCurrentDownload({data}) {
  
let office_total = 0
let res_total = 0
let ware_total = 0

 data.map((a)=>{
  if(a.type === "Office")
  {
    office_total += 1
  }
  if(a.type === "Residential")
  {
    res_total += 1
  }
  if(a.type === "Warehouse")
  {
    ware_total += 1
  }
 })
  


  const CHART_DATA = [
    {
      label : "Office",
      total : office_total
    },{
      label : "Residential",
      total : res_total
    }
    ,{
      label : "Warehouse",
      total : ware_total
    }
   ];


  return (
    <Card>
      <CardHeader title="Quotes By Type" />
      <Stack spacing={4} sx={{ p: 3 }}>
        {CHART_DATA.map((progress) => (
          <ProgressItem key={progress.label} progress={progress} />
        ))}
      </Stack>
    </Card>
  );
}
