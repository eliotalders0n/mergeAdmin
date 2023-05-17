import PropTypes from 'prop-types';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../components/charts';
import { useState } from 'react';
import { useEffect } from 'react';
import firebase from '../../../firebase'
// ----------------------------------------------------------------------
BookingsPerDay.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function BookingsPerDay({data }) {
 console.log(data)
  const [regDay, setRegDay] = useState([])

  useEffect(() => {
    getPerDayREg()
  }, [data])
  
  function getPerDayREg() {
    const month = new Date().getMonth();
    const filteredData = data.filter((item) => new firebase.firestore.Timestamp(item.createdAt.seconds, item.createdAt.nanoseconds).toDate().getMonth() === month);
  
    const group = filteredData.reduce((acc, item) => {
      const label = new firebase.firestore.Timestamp(item.createdAt.seconds, item.createdAt.nanoseconds).toDate().toLocaleDateString();
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {});
  
    const sortedData = Object.entries(group).sort((a, b) => new Date(a[0]) - new Date(b[0]));
  
    const formattedData = sortedData.map(([label, value]) => ({ label, value }));
  
    setRegDay(formattedData);
  }

    const chartLabels = regDay.map((i) => i.label);
    
    const chartSeries = regDay.map((i) => fNumber(i.value));
      
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
    <Card >
      <CardHeader title={"Daily Bookings"}  />
      <Box sx={{ mx: 3 }} dir="ltr">
        {data &&  <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={300} />}
      </Box>
    </Card>
  );
}