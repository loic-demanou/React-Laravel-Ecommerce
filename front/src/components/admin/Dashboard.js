import axios from "axios";
import { useEffect, useState } from "react";
import Barchart from "./DashboardComponents/Barchart";
import BarProduct from "./DashboardComponents/BarProduct";
import LineChart from "./DashboardComponents/LineChart";

const Dashboard = () => {

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [userData, setUserData] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [productData, setProductData] = useState([]);

    const getChartsData = () => {
        axios.get('/api/DashboardCharts')
        .then((res) => {
            setUserData(res.data.usersNbre)
            setOrderData(res.data.orderNbre)
            setProductData(res.data.productNbre)
        })
        .catch(err => console.log(err))
    }


    const getProducts = () =>{
        axios.get(`/api/products`)
        .then(res => {
            setProducts(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getUsers = () =>{
        axios.get(`/api/users`)
        .then(res => {
            setUsers(res.data.users)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getOrders = () =>{
        axios.get(`/api/ventes`)
        .then(res => {
            setOrders(res.data.ventes)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getUsers();
        getProducts();
        getOrders();
        getChartsData();
    }, [])

    return ( 
        <div className="container-fluid px-4">
        <h1 className="mt-4">Dashboard</h1>
        <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">Dashboard</li>
        </ol>
        <div className="row">
            <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4">
                    <div className="card-body">Nombre d'utilisateurs</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <p className=" text-base text-white">{users.length}</p>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-warning text-white mb-4">
                    <div className="card-body">Nombre de commandes</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <p className=" text-base text-white">{orders.length}</p>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-success text-white mb-4">
                    <div className="card-body">Nombre d'articles</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <p className=" text-base text-white">{products.length}</p>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-md-6">
                <div className="card bg-danger text-white mb-4">
                    <div className="card-body">Danger Card</div>
                    <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            {/* <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-chart-area me-1"></i>
                        Area Chart Example
                    </div>
                    <div className="card-body"><canvas id="myAreaChart" width="100%" height="40"></canvas></div>
                </div>
            </div> */}

            {/* <!-- Number of users chars--> */}
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header flex justify-center items-center pt-3">
                        {/* <i class="material-icons mr-2">show_chart</i> */}
                        <h6>Graph des utilisateurs</h6>
                    </div>
                    <div class="card-body">
                        <Barchart userData={userData} />
                    </div>
                </div>
            </div>
            {/* <!-- Number of orders chars--> */}
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header flex justify-center items-center pt-3">
                        <h6>Graph des produits</h6>
                    </div>
                    <div class="card-body">
                        <BarProduct productData={productData} />
                    </div>
                </div>
            </div>
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header flex justify-center items-center pt-3">
                        <h6>Graph des commandes</h6>
                    </div>
                    <div class="card-body">
                        <LineChart orderData={orderData} />
                    </div>
                </div>
            </div>
        </div>
        <div className="card mb-4">
            <div className="card-header">
                <i className="fas fa-table me-1"></i>
                DataTable Example
            </div>
            <div className="card-body">
                <table id="datatablesSimple">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Office</th>
                            <th>Age</th>
                            <th>Start date</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Office</th>
                            <th>Age</th>
                            <th>Start date</th>
                            <th>Salary</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr>
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
                            <td>Edinburgh</td>
                            <td>61</td>
                            <td>2011/04/25</td>
                            <td>$320,800</td>
                        </tr>
                        <tr>
                            <td>Donna Snider</td>
                            <td>Customer Support</td>
                            <td>New York</td>
                            <td>27</td>
                            <td>2011/01/25</td>
                            <td>$112,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
}
 
export default Dashboard;