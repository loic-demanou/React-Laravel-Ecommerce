import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../../Loader.gif"


toast.configure()


const Category = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 

const fetchCategory =()=> { 
    setIsLoading(true)

    axios.get('http://127.0.0.1:8000/api/categories')
        .then((result) => {
            console.log(result);
            setCategories(result.data)
            setIsLoading(false);
        })
} ;

const deleteCategory = (id)=>{
    // axios.delete('http://127.0.0.1:8000/api/category/delete/' +id)
    axios.delete('/api/category/delete/' +id)
    .then((result) =>{
        toast.error("Category deleted ! 🙃");
        fetchCategory()
    })
}

    useEffect(() => {

        document.title = "Category";

        fetchCategory()
    }, [])
    

    return (
        <div>

            <nav aria-label="breadcrumb" className="m-5">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/admin">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Category</li>
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

                {categories.length >0 ?<table className="table table-striped table-hover">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Name</th>
                            <th scope="col">Slug</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                categories.map((c, index) =>
                        <tr key= {c.id}>
                                
                                {/* <div> */}
                                    <td >{index +1}</td>
                                    <td>{c.name}</td>
                                    <td>{c.slug}</td>
                                    <td>
                                        { c.status ==1 ?<span className="badge rounded-pill bg-primary">Active</span>
                                        : <span className="badge rounded-pill bg-danger">Unactive</span>}
                                    </td>
                                    <td>
                                        <Link to={`/admin/category/edit/${c.id}`} className="btn btn-warning m-2 text-white"><i className="fa fa-edit"></i></Link>
                                        <button onClick={() =>deleteCategory(c.id)} className="btn btn-danger"><i className="fa fa-trash"></i></button>
                                    </td>
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

export default Category;