import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../components/charts';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 92;

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

 
export default function AppCurrentVisits({data, title, type}) {
  const theme = useTheme();

  const result = data.reduce((acc, item) => {
    if(type === "type")
    {
     
      const status = item.typeOfCar;
      const index = acc.findIndex((el) => el.status === status);
     
      if (index !== -1) {
        acc[index].count++;
      } else {
        acc.push({ status, count: 1 });
      }
    
      return acc;
    }
    else{
      const status = item.status;
      const index = acc.findIndex((el) => el.status === status);
    
      if (index !== -1) {
        acc[index].count++;
      } else {
        acc.push({ status, count: 1 });
      }
    
      return acc;
    }

  }, []);

  
  const chartOptions ={
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main
    ],
    labels: result.map((item) => item.status),
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`
        }
      }
    },
    plotOptions: {
     donut: { labels: { show: false } } 
    }
  };

  return (
    <Card>
      <CardHeader title={`${title} Breakdown`} />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={result.map((item) => item.count)} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
