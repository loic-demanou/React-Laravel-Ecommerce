import axios from "axios";
import { useHistory, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Loader from '../../../../Loader.gif'
import HistoryBack from "../../HistoryBack";
import ListProduct from "../collections/product/ListProduct";

const Shop = () => {

    const[isLoading, setIsLoading] = useState(false);
    const[product, setProduct] = useState([]);
    const[category, setCategory] = useState([]);
    const[error, setError] = useState(false);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [priceRequire, setPriceRequire] = useState("");
  
    // const {slug} =useParams();

    const [collection, setCollection] = useState([]);
    // const [brand, setBrand] = useState([]);
    const [sortby, setSortBy] = useState('');
    const [search, setSearch] = useState('');
    var sortName= "name";
    var sortPrice="price"; 
    // const [isLoading, setIsLoading] = useState(false);
    const submitSearchCategory =()=>{
        if (search.length >=2) {
            setError(false)
            setIsLoading(true);
            axios.get(`/api/searchShopage/${search}`).then(res => {
                console.log(res.data);
                setProduct(res.data.product)
                setIsLoading(false);
            })
        } else {
            setError(true)
        }
        
    };

    const priceFilter = (e) => {
        e.preventDefault();
        console.log("price filter");
        // const price = {minPrice, maxPrice};
        if (minPrice.length > 0 && maxPrice.length > 0) {
            setPriceRequire("");
            setIsLoading(true);
            axios.get(`/api/pricefilter/${minPrice}/${maxPrice}`)
                .then((res) => {
                    setProduct(res.data.filter)
                    setIsLoading(false);
                })
        } else {
            setPriceRequire("Champ obligatoire");
        }
    }

    const sortProduct =()=>{
        // axios.get(`/api/sortSection/${category}/${sortby}`).then(res => {
        axios.get(`/api/sortShopage/${sortby}`).then(res => {
            setProduct(res.data.product)
        })
    };

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://127.0.0.1:8000/api/getCollections')
        .then((result) => {
            console.log(result.data)
            setCollection(result.data);
            setIsLoading(false)
        });
    }, [])

    useEffect( async () => {
        setIsLoading(true);
        await axios.get('http://127.0.0.1:8000/api/products/')
        .then((result) =>{
            // setCategory(result.data)
            setProduct(result.data)
            setIsLoading(false)
        })
    }, [collection])

    // useEffect( async () => {
    //     setIsLoading(true);
    //     await axios.get('http://127.0.0.1:8000/api/getCollections/'+slug)
    //     .then((result) =>{
    //         setCategory(result.data.category)
    //         setProduct(result.data.product)
    //         setIsLoading(false)
    //     })
    // }, [collection, slug])

    return (
        <div className="container">
            <div className="row">
                <div className="d-flex justify-content-between">
                <HistoryBack />
                <div>
                    <form role="search" className="ml-auto">
                        <div className="input-group">
                            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Rechercher" className={error ? "form-control border-danger" : "form-control"} />
                            <div className="input-group-append">
                                <button onClick={ ()=>submitSearchCategory()} type="button" className="btn btn-primary"><i className="fa fa-search" /></button>
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
                            <li className="breadcrumb-item"><Link className="text-decoration-none" to="/">Acccueil</Link></li>
                            <li aria-current="page" className="breadcrumb-item active">Boutique</li>
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
                                        <li key={col.id}><Link to={`collections/${col.slug}`} className="nav-link">{col.name}</Link></li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card sidebar-menu mb-4">
                        <div className="card-header">
                            <h3 className="h4 card-title">Prix</h3>
                        </div>
                        <div className="card-body">
                            {/* <form>
                                <div className="form-group d-flex justify-content-center  text-center align-item-center">
                                    <input type="text" className="form-control" placeholder="ex:2000" />
                                    <div className="mx-1 justify-center items-center"> - </div>
                                    <input type="text" className="form-control" placeholder="ex:100.000" />
                                </div>
                                <button className="btn btn-default btn-sm btn-primary"><i className="fa fa-pencil" /> Apply</button>
                            </form> */}
                        </div>
                              <form onSubmit={(e) => priceFilter(e)} className="mb-4">
                                <li className="flex justify-center items-center">
                                  <input type="number" value={minPrice} onChange={ (e)=>setMinPrice(e.target.value)} className={priceRequire ? "w-3/6 border border-b mx-2 bg-gray-200 rounded py-2 pl-1 border-red-700" : "w-3/6 border-0 border-b mx-2 bg-gray-200 rounded py-2 pl-1"}  placeholder="Min" /> à
                                  <input type="number"  value={maxPrice} onChange={ (e)=>setMaxPrice(e.target.value)} className={priceRequire ? "w-3/6 border border-b mx-2 bg-gray-200 rounded py-2 pl-1 border-red-700" : "w-3/6 border-0 border-b mx-2 bg-gray-200 rounded py-2 pl-1"}  placeholder="Max"/>
                                  <button type="submit" className=" border border-blue-700 hover:bg-blue-700 p-2 rounded transition ease-in">Go</button>
                                </li>
                              </form>
                    </div>
                    {/* *** MENUS AND FILTERS END ****/}
                </div>
                <div className="col-lg-9">
                    {/* loader */}
                        {isLoading && 
                                     <div className="d-flex justify-content-center">
                        <div className="spinner-border text-success position-absolute mt-5" style={{ zIndex:9 }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        </div>
                            }
                    <div className=" border-1 p-3 mb-3 info-bar" style={{ border:"1px solid gray", borderRadius:"8px" }}>
                        <div className="row">
                            <div className="col-md-12 col-lg-7 products-number-sort">
                                <form className="form-inline d-block d-lg-flex justify-content-between flex-column flex-md-row">
                                   
                                    <div className="products-sort-by mt-2 mt-lg-0 pull-right"><strong>Trier par</strong>
                                        <select name="sort-by"  value={sortby} onChange={(e)=>sortProduct(setSortBy(e.target.value) )}>
                                        {/* <select name="sort-by" className="form-control" value={sortby} onChange={(e)=>sortProduct(category.id, setSortBy(e.target.value) )}> */}
                                            {/* <option>Trier...</option> */}
                                            <option value={sortPrice}>Prix</option>
                                            <option value={sortName}>Nom</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row products">

                        <ListProduct product= {product} category={category} />
                        
                    </div>
                    {/* <div className="pages">
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
                    </div> */}
                </div>
                {/* /.col-lg-9*/}
            </div>
        </div>
    );
}

export default Shop;