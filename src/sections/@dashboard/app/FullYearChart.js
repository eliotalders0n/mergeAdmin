import PropTypes from 'prop-types';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../../components/charts';
import React, { useState, useEffect } from 'react';
// ----------------------------------------------------------------------
FullYearChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function FullYearChart({data }) {
 
//   let asd = booking[0]?.createdAt
//   const date = new Date(asd?.seconds * 1000 + asd?.nanoseconds / 1000000);
// const month = date.getMonth() + 1;

  const months = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"];

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const groupByMonth = data.reduce((acc, curr) => {
      const date = new Date(curr.createdAt.seconds * 1000);
      const month = date.getMonth() + 1;
      if (!acc[month]) {
        acc[month] = {
          month,
          totalAmount: 0,
          count: 0
        };
      }
      acc[month].totalAmount += curr.totalAmount;
      acc[month].count++;
      return acc;
    }, {});

    const chartData = {
      series: [{
        name: 'Total Amount',
        data: Object.values(groupByMonth).map(monthData => monthData.totalAmount)
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: Object.values(groupByMonth).map(monthData => `Month ${monthData.month}`),
        },
        yaxis: {
          title: {
            text: 'Total Amount'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return `$ ${val.toFixed(2)}`;
            }
          }
        }
      }
    };
    setChartData(chartData);
  }, [data]);

    // const chartOptions = merge(BaseOptionChart(), {
    //   stroke: {
    //     show: true,
    //     width: 1,
    //     colors: ['transparent']
    //   },
    //   xaxis: {
    //     categories: chartLabels
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: (val) => `${val}`
    //     }
    //   }
    // });
console.log(chartData)
  return (
    <Card >
      <CardHeader title={"Month on Month Sales"}  />
      <Box sx={{ mx: 3 }} dir="ltr">
        {chartData &&  <ReactApexChart type="bar" series={chartData?.series} options={chartData?.options} height={364} />
        }
      </Box>
    </Card>
  );
}