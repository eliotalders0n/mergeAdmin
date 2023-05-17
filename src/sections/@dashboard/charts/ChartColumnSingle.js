import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
//
import BaseOptionChart from './BaseOptionChart';
import firebase from '../../../firebase';
  
// ----------------------------------------------------------------------

const CHART_DATA = [{ name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 45,67,12] }];

export default function ChartColumnSingle({data}) {
 
    //const status =  new Date(new firebase.firestore.Timestamp(item?.createdAt?.seconds, item?.createdAt?.nanoseconds).toDate()).toLocaleDateString()
 
    const result = data.reduce((acc, item) => {
      const status = item.createdAt;
      const index = acc.findIndex((el) => el.createdAt === status);
      
      if (index !== -1) {
        acc[index].count++;
      } else {
        acc.push({ status, count: 1 });
      }
    
      return acc;
    }, []);
    
    

  console.log(result)
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    stroke: { show: false },
    xaxis: {
      categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec']
    },
    tooltip: {
      y: {
        formatter: (val) => `$ ${val} thousands`
      }
    }
  });

  return <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={480} />;
}
