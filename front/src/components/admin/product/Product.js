import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "../../useFetch";
import Loader from "../../../Loader.gif"

toast.configure()


const Product = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 

    // const { data:products, isLoading, error } = useFetch('http://localhost:8000/blogs/');

    const fetchProducts =()=> { 
        setIsLoading(true)
        axios.get('http://127.0.0.1:8000/api/products')
            .then((result) => {
                console.log(result);
                setProducts(result.data);
                setIsLoading(false);
            })
    } ;
    
    const deleteProduct = (id)=>{
        // setIsLoading(true)
        axios.delete('http://127.0.0.1:8000/api/product/delete/' +id)
        .then((result) =>{
            // setIsLoading(false)
            toast.error("Product deleted ! 🙃");
            fetchProducts()
        })
    }
    
        useEffect(() => {
            document.title = "Product";

            fetchProducts()
        },[])
        
    
    return ( 
        <div>

            <nav aria-label="breadcrumb" className="m-5">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Products</li>
                </ol>
            </nav>
            <div className="container">
                {isLoading && <div className="loader d-flex justify-content-center">
                    <img src={Loader} alt="Loader" width="40px" />
                    <span className="mt-2">Chargement...</span>
                </div>}
                <div>
                    <Link to="/admin/product/create" className="btn btn-primary mb-2">Create <i className="fa fa-plus"></i></Link>
                </div>

                {products.length >0 ?<table className="table table-striped table-hover">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Category</th>
                            <th scope="col">Product name</th>
                            <th scope="col">Selling price</th>
                            <th scope="col">Status</th>
                            <th scope="col">Image</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                products.map((p, index) =>
                        <tr key= {p.id}>
                                
                                {/* <div> */}
                                    <td >{index +1}</td>
                                    <td>{p.category.name}</td>
                                    <td>{p.name}</td>
                                    <td>{ parseFloat(p.selling_price).toLocaleString('en')} Fcfa</td>
                                    <td>
                                        { p.status ==1 ?<span className="badge rounded-pill bg-primary">Active</span>
                                        : <span className="badge rounded-pill bg-danger">Unactive</span>}
                                    </td>
                                    <td> <img src={ `http://127.0.0.1:8000/${p.image}` } alt={p.name} width="60px" /> </td>
                                    <td>
                                        <button className="btn btn-success"><i className="fas fa-eye"></i></button>
                                        <Link to={`/category/edit/${p.id}`} className="btn btn-warning m-2 text-white"><i className="fa fa-edit"></i></Link>
                                        <button onClick={() =>deleteProduct(p.id)} className="btn btn-danger">
                                            <i className="fa fa-trash"></i>
                                            {/* {isLoading && <small>deleting...</small>} */}
                                            </button>
                                    </td>
                                {/* </div> */}
                        </tr>
                                )
                            }
                    </tbody>
                </table>
                :
                <div className="container">
                    <h4 className="">Create your products here ☺</h4>
                </div>    
            }

            </div>
        </div>
     );
}
 
export default Product;