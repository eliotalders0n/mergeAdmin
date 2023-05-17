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
SalesByChannel.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function SalesByChannel({data }) {
 

  var result = data.filter(function(v, i) {
    return ((v.month === new Date().getMonth()+1));
    })

  const _data = [];
      let group = result.reduce((r, a) => {
         r[a.channel] = [...r[a.channel] || [], a];
    return r;
    }, {});  
    const keys = Object.keys(group);
    keys.forEach((key) => {
      if(key === "null"){         
      return
    }
      _data.push({
        label: key,
        sum : group[key].reduce((acc, obj) => acc + obj.sales, 0),     
      });           
    });
    _data.sort(function(a,b){
           return a.label - b.label
    });

    const chartLabels = _data.map((i) => i.label);
    
    const chartSeries = _data.map((i) => 
    {
      return i.sum
    }
    );
    console.log(chartSeries, "here")
   
      const chartOptions = merge(BaseOptionChart(), {
        labels: chartLabels,
        stroke: { show: false },
        legend: { horizontalAlign: 'center' },
        plotOptions: { pie: { donut: { size: '90%' } } }
      });

  return (
    <Card >
      <CardHeader title={"Sales by Channel by %"} subheader={"Figures are a percentage of " + chartSeries.reduce((sum, week) => sum + week, 0)} />
    
      <Box sx={{ mx: 3 }} dir="ltr">
        {data &&   <ReactApexChart type="donut" series={chartSeries.map((c)=>(
          Math.round((c / chartSeries.reduce((sum, week) => sum + week, 0))*100, 1)
          ))} options={chartOptions} width={"100%"} />
        }
      </Box>
    </Card>
  );
}