import PropTypes from 'prop-types';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../components/charts';

// ----------------------------------------------------------------------
AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({ title, subheader, chartData, ...other }) {
  const chartLabels = chartData.map((i) => i.label === "PANNER" || i.label === "PANNAR" ? "PANNAR" : i.label);

  const chartSeries = chartData.map((i) => i.value.toFixed(0));

  const chartOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    xaxis: {
      categories: chartLabels
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}`
      }
    }
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
       <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}