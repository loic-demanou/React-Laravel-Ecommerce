import React from 'react';
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, Legend, } from 'chart.js'
import { Bar, Chart, Doughnut, Line } from "react-chartjs-2";

ChartJs.register(ArcElement, LinearScale, CategoryScale, BarElement, Legend)
const Barchart = ({userData}) => {

    const datas = {
        labels:['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label:"Les utilisateurs",
            data: userData,
            backgroundColor: ['green'],
            // backgroundColor:['red','orange','yellow','green','indigo', 'gray', 'violet','purple', 'gray','pink','silver','gold','brown'],
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

    // const ctx = document.getElementById('myChart');
    // const leChart = new ChartJs(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    //         datasets: [{
    //             label: '# of Votes',
    //             // data: userData,
    //             data: userData,
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });    
    
    return ( 
        <div>
            <Bar
                data={datas}
                 height={400}
                 width={600}
                 options={options}
            />
            {/* {myChart} */}
            {/* Number of users chars */}
            {/* <div class="col mb-3">
                <div class="card card-style-1">
                    <div class="card-header py-1">
                        <i class="material-icons mr-2">show_chart</i>
                        <h6>Number of users chars</h6>
                        <button type="button" data-action="fullscreen"
                            class="btn btn-sm btn-text-secondary btn-icon rounded-circle shadow-none ml-auto">
                            <i class="material-icons">fullscreen</i>
                        </button>
                    </div>
                    <div class="card-body" >
                        <canvas id="myChart"></canvas> 
                    </div>
                </div>
            </div> */}
        </div>
     );
}
 
export default Barchart;