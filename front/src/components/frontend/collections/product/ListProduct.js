import { Link } from "react-router-dom";

const ListProduct = ({ category, product }) => {
    return (
        <>
            {product.length > 0 ? product.map((prod) => (
                <div className="col-lg-4 col-md-6" key={prod.id}>
                    <div className="product">
                        <div className="flip-container">
                            <div className="flipper">
                                <div className="front"><Link to={`/collections/${prod.category.slug}/${prod.slug}`}><img src={`http://localhost:8000/${prod.image}`} alt={prod.name} className="img-fluid" /></Link></div>
                                <div className="back"><Link to={`/collections/${prod.category.slug}/${prod.slug}`}><img src={`http://localhost:8000/${prod.image}`} alt ={prod.name} className="img-fluid" /></Link></div>
                            </div>
                        </div>
                        <Link to={`/collections/${prod.category.slug}/${prod.slug}`} className="invisible"><img src={`http://localhost:8000/${prod.image}`} alt className={prod.name} className="img-fluid" /></Link>
                        <div className="text">
                            <h3><Link to={`/collections/${prod.category.slug}/${prod.slug}`}>{prod.name}</Link></h3>
                            <p className="price">
                                <del>$280 </del>{ parseFloat(prod.selling_price).toLocaleString('en')} Fcfa
                            </p>
                            <p className="buttons"><Link to={`/collections/${prod.category.slug}/${prod.slug}`} className="btn btn-outline-secondary">View detail</Link><a href="basket.html" className="btn btn-primary"><i className="fa fa-shopping-cart" />Add to cart</a></p>
                        </div>
                        {/* /.text*/}
                       { prod.featured==1 ? <div className="ribbon sale" style={{ fontSize:"10px" }}>
                            <div className="theribbon"><small>Featured</small></div>
                            <div className="ribbon-background" />
                        </div> : ""}
                        {/* /.ribbon*/}
                        { prod.popular == 1 ? <div className="ribbon new" style={{ fontSize:"8px" }}>
                            <div className="theribbon">Trending</div>
                            <div className="ribbon-background" />
                        </div> : ""}
                        {/* /.ribbon*/}
                        {/* <div className="ribbon gift">
                            <div className="theribbon">GIFT</div>
                            <div className="ribbon-background" />
                        </div> */}
                        {/* /.ribbon*/}
                    </div>
                    {/* /.product            */}
                </div>
            )) :
                <div className="container my-3">
                    <h3>No product for the category {category.name}</h3>
                </div>
            }


        </>
    );
}

export default ListProduct;