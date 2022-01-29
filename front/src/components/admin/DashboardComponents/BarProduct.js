import React from 'react';
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, Legend, } from 'chart.js'
import { Bar, Chart, Doughnut, Line } from "react-chartjs-2";

ChartJs.register(ArcElement, LinearScale, CategoryScale, BarElement, Legend)
const BarProduct = ({productData}) => {

    const datas = {
        labels:['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label:"Les produits",
            data: productData,
            // backgroundColor: ['green'],
            backgroundColor:['red','orange','yellow','green','indigo', 'gray', 'violet','purple', 'gray','pink','silver','gold','brown'],
            borderWidth: 1,
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
            <Bar
                data={datas}
                 height={400}
                 width={600}
                 options={options}
            />
        </div>
     );
}
 
export default BarProduct;