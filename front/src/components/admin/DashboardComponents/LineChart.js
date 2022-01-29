import React from 'react';
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, Legend, LineElement, } from 'chart.js'
import { Bar, Chart, Doughnut, Line } from "react-chartjs-2";

ChartJs.register(LinearScale, CategoryScale, LineElement, PointElement, Legend)
const LineChart = ({orderData}) => {

    const datas = {
        labels:['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label:"Les ventes",
            data: orderData,
            // backgroundColor: ['green'],
            borderColor: ['green'],
            backgroundColor:['red','orange','yellow','green','indigo', 'gray', 'violet','purple', 'gray','pink','silver','gold','brown'],
            borderWidth: 1,
            fill: false,
        }],

    }
    const options= {
        maintainAspectRadio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                legend: {   
                    labels: {
                        fontSize: 26
                    }
                }
            }

    return ( 
        <div>
            <Line
                data={datas}
                 height={400}
                 width={600}
                 options={options}
            />
        </div>
     );
}
 
export default LineChart;