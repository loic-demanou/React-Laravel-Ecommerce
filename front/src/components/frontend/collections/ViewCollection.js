import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from '../../../Loader.gif';

const ViewCollection = () => {

    const [collection, setCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setIsLoading(true);
        axios.get('http://127.0.0.1:8000/api/getCollections')
        .then((result) => {
            setCollection(result.data);
            setIsLoading(false)
        })

    }, [])
    return ( 
        <div className="container">
                    {/* loader */}
            {isLoading && <div class="d-flex justify-content-center">
                <div id="loader" className="position-absolute mt-5" style={{ zIndex:9 }} >
                    <img id="loader" src={Loader} alt="loader"
                        height="60px" width="60px" /> <span> Loading...</span>
                </div>
            </div>}

            {/* {isLoading && <div className="d-flex justify-content-center"><img src={Loader} alt="." width="33px" /> <span>Loading...</span></div>} */}
            {!isLoading && <h3 className="w-9/12 mx-auto">Categories</h3>}
            <div className="row justify-content-center">
                { collection && collection.map((col) =>(
                    <div className="col-md-3 card mx-2 my-2 justify-content-center hover:bg-gray-100" key={col.id}>
                        <Link to={`collections/${col.slug}`}>
                            <div className="flex justify-center items-center cursor-pointer">
                                <img className="" src={`http://localhost:8000/images/category/${col.image}`} height="150px" width="150px" />
                            </div>
                        </Link>
                        <Link to={`collections/${col.slug}`} style={{ textDecoration:"none" }}>
                            <div className="card-body text-center text-lg">{col.name}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default ViewCollection;