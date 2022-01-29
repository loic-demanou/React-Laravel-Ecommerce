import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialShareButtons from "./SocialShareButtons";

toast.configure()


const DetailsProduct = (props) => {

    const[isLoading, setIsLoading] = useState(false);
    const[product, setProduct] = useState([]);
    const[otherproduct, setOtherProduct] = useState([]);

    // const[category, setCategory] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [link, setLink] = useState("");
    
const history= useHistory()
const back =()=> {
    history.go(-1);
}
    const handleDecrement=() => {
        if (quantity >1) {
            setQuantity(prevCount => prevCount-1);
        }
    }
    const handleIncrement=() => {
        if (quantity <10) {
            setQuantity(prevCount => prevCount+1);
        }
    }

    const [collection, setCollection] = useState([]);
    
    useEffect(() => {
        setIsLoading(true);
        axios.get('http://127.0.0.1:8000/api/getCollections')
        .then((result) => {
            // console.log(result.data)
            setCollection(result.data);
            setIsLoading(false)
        })

    }, [])
    
    const category_slug =props.match.params.category;
    const product_slug =props.match.params.product;

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://127.0.0.1:8000/api/view-product/${category_slug}/${product_slug}`)
        .then((result) => {
            // console.log(result.data.product)
            setProduct(result.data.product)
            setIsLoading(false)
        })
    }, [category_slug, product_slug])

    const[category, setCategory] = useState([]);
    useEffect( async () => {
        setIsLoading(true);
        // await axios.get('http://127.0.0.1:8000/api/getCollections/'+category_slug)
        await axios.get('http://127.0.0.1:8000/api/getOthersProduct/'+category_slug)
        .then((result) =>{
            console.log(result.data);
            setCategory(result.data.category)
            setOtherProduct(result.data.product)
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://127.0.0.1:8000/api/social-share-wa/${category_slug}/${product_slug}`)
        .then((result) => {
            // console.log(result.data)
            setLink(result.data.link)
            setIsLoading(false)
        })
    }, [link])
    // }, [props.match.params.category, props.match.params.product])

    const addToCart =(e)=> {
        e.preventDefault()
        const data = {
            product_id: product.id,
            product_qty: quantity,
        }
        axios.post(`/api/add-to-cart`, data).then(res => {
            if (res.data.status=== 201) {
                toast.success(res.data.message);
            } else if(res.data.status === 409) {
                toast.warn(res.data.message);
            } else if(res.data.status === 401) {
                toast.error(res.data.message);
            } else if(res.data.status === 404) {
                toast.warn(res.data.message);
            }
        })
    }

    
    return (

        <div className="container">
            <div className="row">
                <span className="float-right"><button onClick={ ()=>back()} className="btn btn-success mb-2"> {"<< "}Retour</button></span>
                <div className="col-lg-12">
                    {/* breadcrumb*/}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
                            <li className="breadcrumb-item"><Link to="/collections">Collections</Link></li>
                            {/* <li className="breadcrumb-item"><Link to="/collections/slug">{product.category.name}</Link></li> */}
                            <li aria-current="page" className="breadcrumb-item active">{product.name}</li>
                            {/* <li aria-current="page" className="breadcrumb-item float-end"><button>Back</button></li> */}
                        </ol>
                    </nav>
                </div>
                <div className="col-lg-3 order-2 order-lg-1">
                    {/*
        *** MENUS AND FILTERS ***
        _________________________________________________________
        */}
                    {/* <div className="card sidebar-menu mb-4">
                        <div className="card-header">
                            <h3 className="h4 card-title">Categories</h3>
                        </div>
                        <div className="card-body">
                            <ul className="nav nav-pills flex-column category-menu">
                                <li>
                                    <ul className="list-unstyled">
                                        { collection && collection.map((col) => (
                                        <li key={col.id}><Link to={"collections/"+col.slug} className="nav-link">{col.name}</Link></li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                    {/* *** MENUS AND FILTERS END ****/}
                </div>
                <div className="col-lg-9 order-1 order-lg-2">
                    <div id="productMain" className="row">
                        <div className="col-md-6">
                            <div data-slider-id={1} className="owl-carousel shop-detail-carousel">
                                <div className="item"> <img src={`http://localhost:8000/${product.image}`} alt className="img-fluid" /></div>
                                <div className="item"> <img src={`http://localhost:8000/${product.image}`} alt className="img-fluid" /></div>
                                <div className="item"> <img src={`http://localhost:8000/${product.image}`} alt className="img-fluid" /></div>
                            </div>
                            { product.featured ? <div className="ribbon sale" style={{ fontSize:"8px" }}>
                                <div className="theribbon">En vedette</div>
                                <div className="ribbon-background" />
                            </div> : ""}
                            {/* /.ribbon*/}
                            { product.popular  ?<div className="ribbon new" style={{ fontSize:"8px" }}>
                                <div className="theribbon">Populaire</div>
                                <div className="ribbon-background" />
                            </div> : ""}
                            {/* /.ribbon*/}
                        </div>
                        <div className="col-md-6">
                            <div className="box">
                                <h3 className="text-center">{product.name}</h3>
                                <p className="goToDescription"><a href="#details" className="scroll-to">Aller aux détails du produit,
                                 {/* material&amp; care and sizing */}
                                 </a></p>

                                    {product.qty >0 ?<div  className="d-flex" >
                                        <div className="input-group col-md-6 ">
                                            <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                                            <div className="form-control text-center">{quantity}</div>
                                            <button type="button" onClick={handleIncrement}  className="input-group-text">+</button>
                                        </div>
                                        <button type="button" className="btn btn-primary" onClick={addToCart}><i className="fa fa-shopping-cart" /> Ajouter au panier</button>
                                    </div> :
                                    <button type="button" className="btn btn-danger"><i className="" /> Stock épuisé</button>
                                    }
                                {/* <span>{product.qty >0 ? <span class="badge bg-success">Primary</span> : <span class="badge bg-danger">Primary</span>}</span> */}
                                <p className="price"><small style={{ fontSize:"15px" }}>{product.qty >0 ? <span class="badge bg-success">En stock</span>
                                 : <span class="badge bg-danger">épuisé</span>}</small> { parseFloat(product.selling_price).toLocaleString('fr')} Fcfa</p>
                                <p className="text-center buttons">
                                    <a href="basket.html" className="btn btn-outline-primary"><i className="fa fa-heart" /> Ajouter à ma liste de souhaits</a>
                                </p>
                            </div>
                            <div data-slider-id={1} className="owl-thumbs">
                                <button className="owl-thumb-item"><img src={`http://localhost:8000/${product.image}`} alt className="img-fluid" /></button>
                                <button className="owl-thumb-item"><img src={`http://localhost:8000/${product.image}`} alt className="img-fluid" /></button>
                                <button className="owl-thumb-item"><img src={`http://localhost:8000/${product.image}`} alt className="img-fluid" /></button>
                            </div>
                        </div>
                    </div>
                    <div id="details" className="box">
                        <p />
                        <h4>Description du produit</h4>
                        <p>{product.description}</p>
                        {/* <h4>Brand &amp; category</h4> */}
                        <ul>
                            <li><strong>Marque : </strong>{product.brand}</li>
                            {/* <li><strong>Category : </strong>{product.category.name}</li> */}
                            <li><strong>Quantité : </strong>{product.qty}</li>
                        </ul>
                        <h4>Size &amp; Fit</h4>
                        <ul>
                            <li>Regular fit</li>
                            <li>The model (height 5'8" and chest 33") is wearing a size S</li>
                        </ul>
                        <blockquote>
                            <p><em>Define style this season with Armani's new range of trendy tops, crafted with intricate details.
                                Create a chic statement look by teaming this lace number with skinny jeans and pumps.</em></p>
                        </blockquote>
                        <hr />
                        <div className="social">
                            <h4>Montrez ça a vos amis</h4>
                            <li><a href="#" data-toggle="modal" data-target=".shareAd"> 
                                            <i class="fas fa-share-alt"></i> Share</a></li>
                                            <div className="modal fade shareAd" id="shareAd" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Partage cette annonce</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">×</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <Link to={`/social-share-fb/${product.slug}`} ><i className="fab fa-facebook-square ml-3" /> Facebook</Link>
                                                    <Link to={`/social-share-tw/${product.slug}`} ><i className="fab fa-twitter ml-3" /> Twitter</Link>
                                                    <Link to={`/social-share-ln/${product.slug}`} ><i className="fab fa-linkedin-in ml-3" /> LinkedIn</Link>
                                                    <Link to={`/social-share-wa/${product.slug}`} ><i className="fab fa-whatsapp ml-3" /> WhatsApp</Link>
                                                    <Link to={`/social-share-te/${product.slug}`} ><i className="fab fa-telegram ml-3" /> Telegram</Link>
                                                </div>
                                                <Link>{link}</Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <SocialShareButtons /> */}
                            {/* <p><a href="#" className="external facebook"><i className="fa fa-facebook" /></a><a href="#" className="external gplus"><i className="fa fa-google-plus" /></a><a href="#" className="external twitter"><i className="fa fa-twitter" /></a><a href="#" className="email"><i className="fa fa-envelope" /></a></p> */}
                        </div>
                    </div>
                                                {/* <SocialShareButtons prod_cat_slug={product.category.slug} prod_slug={product.slug} /> */}
                    <div className="row same-height-row">
                        <div className="col-md-3 col-sm-6">
                            <div className="box same-height">
                                <h3>Vous aussi pouvez aimer</h3>
                            </div>
                        </div>
                       { otherproduct.map((other) => (

                        <div className="col-md-3 col-sm-6" key={other.id}>
                            <div className="product same-height">
                                <div className="flip-container">
                                    <div className="flipper">
                                        <div className="front"><Link to={`/collections/${other.category.slug}/${other.slug}`}><img src={`http://localhost:8000/${other.image}`} alt className="img-fluid" /></Link>
                                        </div>
                                        <div className="back"><Link to={`/collections/${other.category.slug}/${other.slug}`}><img src={`http://localhost:8000/${other.image}`} alt className="img-fluid" /></Link></div>
                                    </div>
                                </div><Link to={`/collections/${other.category.slug}/${other.slug}`} className="invisible"><img src={`http://localhost:8000/${other.image}`} alt className="img-fluid" /></Link>
                                <div className="text">
                                    <h3>{other.name}</h3>
                                    <p className="price"> { parseFloat(other.selling_price).toLocaleString('fr')} Fcfa</p>
                                </div>
                            </div>
                            {/* /.product*/}
                        </div>
                       ))
                        }
                    </div>
                </div>
                {/* /.col-md-9*/}
            </div>
        </div>

    );
}

export default DetailsProduct;