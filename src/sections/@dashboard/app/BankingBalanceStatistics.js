import { merge } from 'lodash';
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField } from '@mui/material';
//
import { BaseOptionChart } from '../charts/index';
import useGetQuotes from '../../../hooks/useGetAccounts';

// ----------------------------------------------------------------------



export default function BankingBalanceStatistics() {

  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', "Nov", "Dec"]
  let quotes = useGetQuotes().docs

  const [data, setdata] = useState([])

  useEffect(() => {
    quotes && arrangeStuff()
  }, [quotes])
  
  const arrangeStuff = () =>{
  const data = [];
  const groupByCategory = quotes.reduce((group, user) => {
      
    group[new Date(user.createdAt).getMonth()] = group[new Date(user.createdAt).getMonth()] ?? [];
    group[new Date(user.createdAt).getMonth()].push(user);
    return group;
  }, {});
  const keys = Object.keys(groupByCategory);

  keys.forEach((key) => {
    data.push({
      label: key,
      value: groupByCategory[key].length,
    });
    // console.log(`${key}: ${groupByCategory[key].length}`);
  });
  setdata(data)
  console.log(data)
  }
    
  const getMonthName = (month) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return months[month];
};

  const CHART_DATA = [
    {
      year: 'Year',
      data: [
        { name: 'Quotes', data: data.map((asd) =>({})) },   
      ]
    }
  ];


  const [seriesData, setSeriesData] = useState('Year');

  const handleChangeSeriesData = (event) => {
    setSeriesData(event.target.value);
  };

  const chartOptions = merge(BaseOptionChart(), {
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', "Nov", "Dec"]
    },
    tooltip: {
      y: {
        formatter: (val) => `$${val}`
      }
    }
  });

  return (
    <Card>
      <CardHeader
        title="Quotes Received Per Month"
        subheader=""
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="bar" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
