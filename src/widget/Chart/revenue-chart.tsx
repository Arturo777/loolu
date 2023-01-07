import { ApexOptions } from 'apexcharts';
// ==============================|| WIDGET - REVENUE CHART ||============================== //

export const options: ApexOptions = {
    chart: {
        width: 100,
        height: 150
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '55%'
            }
        }
    },
    noData: {
        text: undefined
    }
};
export const series: any = {
    series: [70]
};
