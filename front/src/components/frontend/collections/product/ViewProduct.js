import axios from "axios";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from '../../../../Loader.gif'
import ListProduct from "./ListProduct";
import HistoryBack from "../../../HistoryBack";

const ViewProduct = () => {

    const[isLoading, setIsLoading] = useState(false);
    const[product, setProduct] = useState([]);
    const[category, setCategory] = useState([]);
    const[error, setError] = useState(false);
    const {slug} =useParams();

    const [collection, setCollection] = useState([]);
    const [sortby, setSortBy] = useState('');
    const [search, setSearch] = useState('');
    var sortName= "name";
    var sortPrice="price"; 
    // const [isLoading, setIsLoading] = useState(false);
    const submitSearchCategory =(category)=>{
        if (search.length >=2) {
            setError(false);
            axios.get(`/api/searchSection/${category}/${search}`).then(res => {
                setError(false);
                console.log(res.data);
                setProduct(res.data.product)
            })
            } else {
            setError(true);
        }
    };

    const sortProduct =(category)=>{
        axios.get(`/api/sortSection/${category}/${sortby}`).then(res => {
            setProduct(res.data.product)
        })
    };

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://127.0.0.1:8000/api/getCollections')
        .then((result) => {
            // console.log(result.data)
            setCollection(result.data);
            setIsLoading(false)
        });
        // getBrand();
    }, [])

    useEffect( async () => {
        setIsLoading(true);
        await axios.get('http://127.0.0.1:8000/api/getCollections/'+slug)
        .then((result) =>{
            setCategory(result.data.category)
            setProduct(result.data.product)
            setIsLoading(false)
        })
    }, [collection, slug])

    return (
        <div className="container">
            <div className="row">
            <div className="d-flex justify-content-between">
                <HistoryBack />
                <div>
                    <form role="search" className="ml-auto">
                        <div className="input-group">
                            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={error ? "Minimum 2 charactères" : "Search"} 
                                                className={error ? "form-control border-danger" : "form-control"} />
                            <div className="input-group-append">
                                <button onClick={ ()=>submitSearchCategory(category.id)} type="button" className="btn btn-primary"><i className="fa fa-search" /></button>
                            </div>
                        </div>
                            {error && <div className="form-text text-danger">Minimum 2 charactères</div>}
                    </form>
                </div>
                </div>
            {/* <span className="float-right"><button onClick={ ()=>back()} className="btn btn-success mb-2"> {"<< "}Retour</button></span> */}
                <div className="col-lg-12">
                    {/* breadcrumb*/}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
                            <li className="breadcrumb-item"><Link to="/collections">Collections</Link></li>
                            <li aria-current="page" className="breadcrumb-item active">{category.name}</li>
                        </ol>
                    </nav>
                </div>
                <div className="col-lg-3">
                    {/*
        *** MENUS AND FILTERS ***
        _________________________________________________________
        */}
                    <div className="card sidebar-menu mb-4">
                        <div className="card-header">
                            <h3 className="h4 card-title">Categories</h3>
                        </div>
                        <div className="card-body">
                            <ul className="nav nav-pills flex-column category-menu">
                                <li>
                                    {/* <a href="category.html" className="nav-link">Men <span className="badge badge-secondary">42</span></a> */}
                                    <ul className="list-unstyled">
                                        { collection && collection.map((col) => (
                                        <li key={col.id}><Link to={`${col.slug}`} className="nav-link">{col.name}</Link></li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card sidebar-menu mb-4">
                        <div className="card-header">
                            <h3 className="h4 card-title">Marques <a href="#" className="btn btn-sm btn-danger pull-right"><i className="fa fa-times-circle" /> Clear</a></h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    {product.map((prod, idx) => ( 
                                        <div className="checkbox" key={idx}>
                                            <label>
                                                <input type="checkbox" /> {prod.brand}  (10)
                                            </label>
                                        </div>
                                    )) }
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" /> Jack Honey  (14)
                                        </label>
                                    </div>
                                </div>
                                <button className="btn btn-default btn-sm btn-primary"><i className="fa fa-pencil" /> Apply</button>
                            </form>
                        </div>
                    </div>
                    {/* *** MENUS AND FILTERS END ****/}
                </div>
                <div className="col-lg-9">
                    {/* loader */}
                        {isLoading && <div class="d-flex justify-content-center">
                            <div id="loader" className="position-absolute mt-5" style={{ zIndex:9 }} >
                                <img id="loader" src={Loader} alt="loader"
                                    height="60px" width="60px" /> <span> Chargement...</span>
                            </div>
                        </div>}
                    {/* <div className="box">
                        <h1>Ladies</h1>
                        <p>In our Ladies department we offer wide selection of the best products we have found and carefully selected worldwide.</p>
                    </div> */}
                    {/* <div className="box info-bar"> */}
                    <div className=" border-1 p-3 mb-3 info-bar" style={{ border:"1px solid gray", borderRadius:"8px" }}>
                        <div className="row">
                            {/* <div className="col-md-12 col-lg-4 products-showing">Showing <strong>12</strong> of <strong>25</strong> products</div> */}
                            <div className="col-md-12 col-lg-7 products-number-sort">
                                <form className="form-inline d-block d-lg-flex justify-content-between flex-column flex-md-row">
                                    {/* <div className="products-number"><strong>Show</strong><a href="#" className="btn btn-sm btn-primary">12</a><a href="#" className="btn btn-outline-secondary btn-sm">24</a><a href="#" className="btn btn-outline-secondary btn-sm">All</a><span>products</span></div> */}
                                   
                                    <div className="products-sort-by mt-2 mt-lg-0 pull-right"><strong>Trier par</strong>
                                        <select name="sort-by" className="form-control" value={sortby} onChange={(e)=>sortProduct(category.id, setSortBy(e.target.value) )}>
                                            {/* <option>Trier...</option> */}
                                            <option value={sortPrice}>Prix</option>
                                            <option value={sortName}>Nom</option>
                                        </select>
                                    </div>

                                    {/* <div>
                                        <div className="container">
                                        <form>
                                            <div className="input-group">
                                                <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={error ? "Minimum 2 charactères" : "Search"} 
                                                className={error ? "form-control border-danger" : "form-control"} />
                                                    <button onClick={ ()=>submitSearchCategory(category.id)} type="button" className="btn btn-primary"><i className="fa fa-search" /></button>
                                            </div>
                                        </form>
                                        </div>
                                    </div>
                                                {error && <div className="form-text text-danger">Minimum 2 charactères</div>} */}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row products">

                        <ListProduct product= {product} category={category} />
                        
                    </div>
                    <div className="pages">
                        <p className="loadMore"><a href="#" className="btn btn-primary btn-sm"><i className="fa fa-chevron-down" /> Voir plus</a></p>
                        <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                            <ul className="pagination">
                                <li className="page-item"><a href="#" aria-label="Previous" className="page-link"><span aria-hidden="true">«</span><span className="sr-only">Previous</span></a></li>
                                <li className="page-item active"><a href="#" className="page-link">1</a></li>
                                <li className="page-item"><a href="#" className="page-link">2</a></li>
                                <li className="page-item"><a href="#" className="page-link">3</a></li>
                                <li className="page-item"><a href="#" className="page-link">4</a></li>
                                <li className="page-item"><a href="#" aria-label="Next" className="page-link"><span aria-hidden="true">»</span><span className="sr-only">Next</span></a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                {/* /.col-lg-9*/}
            </div>
        </div>
    );
}

export default ViewProduct;