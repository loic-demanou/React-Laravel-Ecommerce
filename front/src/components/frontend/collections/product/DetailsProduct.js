import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";


const DetailsProduct = (props) => {

    const[isLoading, setIsLoading] = useState(false);
    const[product, setProduct] = useState([]);
    const[category, setCategory] = useState([]);
    const [quantity, setQuantity] = useState(1);


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
            console.log(result.data)
            setCollection(result.data);
            setIsLoading(false)
        })

    }, [])


        // const [isLoading, setIsLoading] = useState(false);
    // const {slug} = useParams();
    
    const category_slug =props.match.params.category;
    const product_slug =props.match.params.product;
    useEffect(() => {

        setIsLoading(true);
        // axios.get(`http://127.0.0.1:8000/api/view-product/${slug}`)
        axios.get(`http://127.0.0.1:8000/api/view-product/${category_slug}/${product_slug}`)
        .then((result) => {
            console.log(result.data.product)
            setProduct(result.data.product)
            setIsLoading(false)
        })

    }, [])
    // }, [props.match.params.category, props.match.params.product])


    
    return (

        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {/* breadcrumb*/}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="#">Collections</Link></li>
                            {/* <li className="breadcrumb-item"><Link to="#">{product.category.name}</Link></li> */}
                            <li aria-current="page" className="breadcrumb-item active">{product.name}</li>
                        </ol>
                    </nav>
                </div>
                <div className="col-lg-3 order-2 order-lg-1">
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
                                    <ul className="list-unstyled">
                                        { collection && collection.map((col) => (
                                        <li key={col.id}><Link to={"collections/"+col.slug} className="nav-link">{col.name}</Link></li>
                                        // <li key={col.id}><Link to={`collections/${col.slug}`} className="nav-link">{col.name}</Link></li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
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
                            { product.featured==1 ? <div className="ribbon sale" style={{ fontSize:"10px" }}>
                                <div className="theribbon">Featured</div>
                                <div className="ribbon-background" />
                            </div> : ""}
                            {/* /.ribbon*/}
                            { product.popular == 1 ?<div className="ribbon new" style={{ fontSize:"10px" }}>
                                <div className="theribbon">Popular</div>
                                <div className="ribbon-background" />
                            </div> : ""}
                            {/* /.ribbon*/}
                        </div>
                        <div className="col-md-6">
                            <div className="box">
                                <h1 className="text-center">{product.name}</h1>
                                <p className="goToDescription"><a href="#details" className="scroll-to">Scroll to product details, material
                                    &amp; care and sizing</a></p>

                                    {product.qty >0 ?<div  className="d-flex" >
                                        <div className="input-group col-md-6 ">
                                            <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                                            <div className="form-control text-center">{quantity}</div>
                                            <button type="button" onClick={handleIncrement}  className="input-group-text">+</button>
                                        </div>
                                        <button type="button" className="btn btn-primary"><i className="fa fa-shopping-cart" /> Add to cart</button>
                                    </div> :
                                    <button type="button" className="btn btn-danger"><i className="" /> out of stock</button>
                                    }
                                {/* <span>{product.qty >0 ? <span class="badge bg-success">Primary</span> : <span class="badge bg-danger">Primary</span>}</span> */}
                                <p className="price"><small style={{ fontSize:"15px" }}>{product.qty >0 ? <span class="badge bg-success">In stock</span> : <span class="badge bg-danger">Stock out</span>}</small> { parseFloat(product.selling_price).toLocaleString('en')} Fcfa</p>
                                <p className="text-center buttons">
                                    <a href="basket.html" className="btn btn-outline-primary"><i className="fa fa-heart" /> Add to wishlist</a>
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
                        <h4>Product description</h4>
                        <p>{product.description}</p>
                        {/* <h4>Brand &amp; category</h4> */}
                        <ul>
                            <li><strong>Brand : </strong>{product.brand}</li>
                            {/* <li><strong>Category : </strong>{product.category.name}</li> */}
                            <li><strong>Quantity : </strong>{product.qty}</li>
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
                            <h4>Show it to your friends</h4>
                            <p><a href="#" className="external facebook"><i className="fa fa-facebook" /></a><a href="#" className="external gplus"><i className="fa fa-google-plus" /></a><a href="#" className="external twitter"><i className="fa fa-twitter" /></a><a href="#" className="email"><i className="fa fa-envelope" /></a></p>
                        </div>
                    </div>
                    <div className="row same-height-row">
                        <div className="col-md-3 col-sm-6">
                            <div className="box same-height">
                                <h3>You may also like these products</h3>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="product same-height">
                                <div className="flip-container">
                                    <div className="flipper">
                                        <div className="front"><a href="detail.html"><img src="img/product2.jpg" alt className="img-fluid" /></a>
                                        </div>
                                        <div className="back"><a href="detail.html"><img src="img/product2_2.jpg" alt className="img-fluid" /></a></div>
                                    </div>
                                </div><a href="detail.html" className="invisible"><img src="img/product2.jpg" alt className="img-fluid" /></a>
                                <div className="text">
                                    <h3>Fur coat</h3>
                                    <p className="price">$143</p>
                                </div>
                            </div>
                            {/* /.product*/}
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="product same-height">
                                <div className="flip-container">
                                    <div className="flipper">
                                        <div className="front"><a href="detail.html"><img src="img/product1.jpg" alt className="img-fluid" /></a>
                                        </div>
                                        <div className="back"><a href="detail.html"><img src="img/product1_2.jpg" alt className="img-fluid" /></a></div>
                                    </div>
                                </div><a href="detail.html" className="invisible"><img src="img/product1.jpg" alt className="img-fluid" /></a>
                                <div className="text">
                                    <h3>Fur coat</h3>
                                    <p className="price">$143</p>
                                </div>
                            </div>
                            {/* /.product*/}
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="product same-height">
                                <div className="flip-container">
                                    <div className="flipper">
                                        <div className="front"><a href="detail.html"><img src="img/product3.jpg" alt className="img-fluid" /></a>
                                        </div>
                                        <div className="back"><a href="detail.html"><img src="img/product3_2.jpg" alt className="img-fluid" /></a></div>
                                    </div>
                                </div><a href="detail.html" className="invisible"><img src="img/product3.jpg" alt className="img-fluid" /></a>
                                <div className="text">
                                    <h3>Fur coat</h3>
                                    <p className="price">$143</p>
                                </div>
                            </div>
                            {/* /.product*/}
                        </div>
                    </div>
                </div>
                {/* /.col-md-9*/}
            </div>
        </div>

    );
}

export default DetailsProduct;