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
SalesByRegion.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function SalesByRegion({data }) {
 
  const months = ["January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"];

  var result = data.filter(function(v, i) {
    return ((v.month === new Date().getMonth()+1));
    })

  const _data = [];
      let group = result.reduce((r, a) => {
         r[a.region] = [...r[a.region] || [], a];
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
    
    const chartSeries = _data.map((i) => (i.sum));
    console.log(chartSeries)
    
 
      const chartOptions = merge(BaseOptionChart(), {
        labels: chartLabels,
        stroke: { show: false },
        legend: { horizontalAlign: 'center' },
        plotOptions: { pie: { donut: { size: '90%' } } }
      });

  return (
    <Card >
      <CardHeader title={"Sales by Region"}  />
      <Box sx={{ mx: 3 }} dir="ltr">
        {data &&   <ReactApexChart type="donut" series={chartSeries} options={chartOptions} width={"100%"} />
        }
      </Box>
    </Card>
  );
}