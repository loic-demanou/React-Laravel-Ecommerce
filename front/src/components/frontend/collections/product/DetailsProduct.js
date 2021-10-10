import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";


const DetailsProduct = (props) => {

    const[isLoading, setIsLoading] = useState(false);
    const[product, setProduct] = useState([]);
    const[category, setCategory] = useState([]);
    
    const [collection, setCollection] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const {slug} = useParams();
    
    useEffect(() => {
        const category_slug =props.match.params.category;
        const product_slug =props.match.params.product;

        setIsLoading(true);
        // axios.get(`http://127.0.0.1:8000/api/view-product/${slug}`)
        axios.get(`http://127.0.0.1:8000/api/view-product/${category_slug}/${product_slug}`)
        .then((result) => {
            console.log(result.data.product)
            setProduct(result.data.product)
            setIsLoading(false)
        })

    }, [props.match.params.category, props.match.params.product])


    
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
                            <li className="breadcrumb-item"><Link to="#">{product.name}</Link></li>
                            {/* <li aria-current="page" className="breadcrumb-item active">White Blouse Armani</li> */}
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
                                <li><a href="category.html" className="nav-link">Men <span className="badge badge-secondary">42</span></a>
                                    <ul className="list-unstyled">
                                        <li><a href="category.html" className="nav-link">T-shirts</a></li>
                                        <li><a href="category.html" className="nav-link">Shirts</a></li>
                                        <li><a href="category.html" className="nav-link">Pants</a></li>
                                        <li><a href="category.html" className="nav-link">Accessories</a></li>
                                    </ul>
                                </li>
                                <li><a href="category.html" className="nav-link active">Ladies <span className="badge badge-light">123</span></a>
                                    <ul className="list-unstyled">
                                        <li><a href="category.html" className="nav-link">T-shirts</a></li>
                                        <li><a href="category.html" className="nav-link">Skirts</a></li>
                                        <li><a href="category.html" className="nav-link">Pants</a></li>
                                        <li><a href="category.html" className="nav-link">Accessories</a></li>
                                    </ul>
                                </li>
                                <li><a href="category.html" className="nav-link">Kids <span className="badge badge-secondary">11</span></a>
                                    <ul className="list-unstyled">
                                        <li><a href="category.html" className="nav-link">T-shirts</a></li>
                                        <li><a href="category.html" className="nav-link">Skirts</a></li>
                                        <li><a href="category.html" className="nav-link">Pants</a></li>
                                        <li><a href="category.html" className="nav-link">Accessories</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card sidebar-menu mb-4">
                        <div className="card-header">
                            <h3 className="h4 card-title">Brands <a href="#" className="btn btn-sm btn-danger pull-right"><i className="fa fa-times-circle" /> Clear</a></h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" /> Armani (10)
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" /> Versace (12)
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" /> Carlo Bruni (15)
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" /> Jack Honey (14)
                                        </label>
                                    </div>
                                </div>
                                <button className="btn btn-default btn-sm btn-primary"><i className="fa fa-pencil" /> Apply</button>
                            </form>
                        </div>
                    </div>
                    <div className="card sidebar-menu mb-4">
                        <div className="card-header">
                            <h3 className="h4 card-title">Colours <a href="#" className="btn btn-sm btn-danger pull-right"><i className="fa fa-times-circle" /> Clear</a></h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" /><span className="colour white" /> White (14)
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" /><span className="colour blue" /> Blue (10)
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" /><span className="colour green" /> Green (20)
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" /><span className="colour yellow" /> Yellow (13)
                                        </label>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" /><span className="colour red" /> Red (10)
                                        </label>
                                    </div>
                                </div>
                                <button className="btn btn-default btn-sm btn-primary"><i className="fa fa-pencil" /> Apply</button>
                            </form>
                        </div>
                    </div>
                    {/* *** MENUS AND FILTERS END ****/}
                    <div className="banner"><a href="#"><img src="img/banner.jpg" alt="sales 2014" className="img-fluid" /></a></div>
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
                                <p className="price">{ parseFloat(product.selling_price).toLocaleString('en')} Fcfa</p>
                                <p className="text-center buttons"><a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart" /> Add to cart</a><a href="basket.html" className="btn btn-outline-primary"><i className="fa fa-heart" /> Add to wishlist</a></p>
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
                        <h4>Product details</h4>
                        <p>{product.description}</p>
                        <h4>Material &amp; care</h4>
                        <ul>
                            <li>Polyester</li>
                            <li>Machine wash</li>
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
                    <div className="row same-height-row">
                        <div className="col-md-3 col-sm-6">
                            <div className="box same-height">
                                <h3>Products viewed recently</h3>
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