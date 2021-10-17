import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


const ListProduct = ({ category, product }) => {
    // const [quantity, setQuantity] = useState(1);
    // const[product_id, setProduct] = useState([]);

    const addToCart =( product)=> {
        // e.preventDefault()
        const data = {
            product_id: product,
            product_qty: 1,
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
        <>
            {product.length > 0 ? product.map((prod) => (
                <div className="col-lg-3 col-md-6" key={prod.id}>
                    <div className="product" style={{ height:"90%" }} >
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
                                {/* <del>$280 </del> */}
                                { parseFloat(prod.selling_price).toLocaleString('fr')} Fcfa
                            </p>
                            <p className="buttons"><Link to={`/collections/${prod.category.slug}/${prod.slug}`} className="btn btn-outline-secondary btn-sm ">Details</Link>
                            <button className="btn btn-primary btn-sm" onClick={()=>addToCart(prod.id)}><i className="fa fa-shopping-cart" />Panier</button></p>
                        </div>
                        {/* /.text*/}
                       { prod.featured==1 ? <div className="ribbon sale" style={{ fontSize:"10px" }}>
                            <div className="theribbon"><small>Vedette</small></div>
                            <div className="ribbon-background" />
                        </div> : ""}
                        {/* /.ribbon*/}
                        { prod.popular == 1 ? <div className="ribbon new" style={{ fontSize:"8px" }}>
                            <div className="theribbon">Populaire</div>
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
                    <h3>Aucun produit dans la categorie {category.name}</h3>
                </div>
            }


        </>
    );
}

export default ListProduct;