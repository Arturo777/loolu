import { Props } from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
// ==============================|| WIDGET - REVENUE CHART ||============================== //

export const options: ApexOptions = {
    chart: {
        width: 300,
        height: 350
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '70%'
            }
        }
    }
};
export const series: any = {
    series: [70]
};
