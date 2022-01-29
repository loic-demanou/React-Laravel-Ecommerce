import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../Loader.gif"

toast.configure()


toast.configure()


const Vente = () => {
    const [ventes, setVentes] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 

    const fetchVentes =()=> { 
    setIsLoading(true)
    axios.get('/api/ventes')
        .then((result) => {
            setVentes(result.data.ventes);
            setIsLoading(false);
        })
    };


    useEffect(() => {

        document.title = "Ventes";

        fetchVentes()
    }, [])
    

    return (
        <div>

            <nav aria-label="breadcrumb" className="m-5">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Vente</li>
                </ol>
            </nav>
            <div className="container">
            {isLoading && 
                <div className="loader d-flex justify-content-center">
                    <img src={Loader} alt="Loader" width="40px" />
                    <span className="mt-2">Chargement...</span>
                </div>}

                <div>
                    <Link to="/admin/category/create" className="btn btn-primary mb-2">Create <i className="fa fa-plus"></i></Link>
                </div>

                {ventes.length >0 ?<table className="table table-striped table-hover">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Email</th>
                            <th scope="col">State</th>
                            <th scope="col">Payment mode</th>
                            <th scope="col">Payment id</th>
                            <th scope="col">Statut</th>
                            <th scope="col">Montant</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                ventes.map((v, index) =>
                                <tr key= {v.id}>
                                        
                                        {/* <div> */}
                                            <td >{index +1}</td>
                                            <td> {v.email} </td>
                                            <td> {v.state} </td>
                                            <td> {v.payment_mode} </td>
                                            <td> {v.payment_id} </td>
                                            <td>
                                                { v.status ?<span className="badge rounded-pill bg-success">OK</span>
                                                : <span className="badge rounded-pill bg-danger">NON</span>}
                                            </td>
                                                <td> {v.orderitems.forEach(element => {
                                                    <>
                                                    {element.price && <p className="bg-red-700"></p>}
                                                    {/* <p>{console.log(element.qty)}</p> */}
                                                    </>
                                                }) } </td>
                                            <td> {v.created_at} </td>
                                        {/* </div> */}
                                </tr>
                                )
                            }
                    </tbody>
                </table>
                :
                <div className="container">
                    <h4 className="">Create the categories of your products here ☺</h4>
                </div>    
            }

            </div>
        </div>
    );
}

export default Vente;