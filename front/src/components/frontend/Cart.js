import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import swal from "sweetalert";

toast.configure()


const Cart = () => {
    const [cart, setCart] = useState([]);
    const history = useHistory();
    
    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        toast.warn("Vous devez dabord être connecté");
    }

    useEffect(() => {

        // setIsLoading(true);
        // axios.get(`http://127.0.0.1:8000/api/view-product/${slug}`)
        axios.get(`/api/cart`).then(res => {
            if (res.data.status ===200) {
                setCart(res.data.cart);

            } else if(res.data.status === 401) {
                history.push('/');
                toast.warn(res.data.message);
            }
        })

    }, [])

    const handleDecrement =(cart_id) =>{
        setCart(cart => 
            cart.map((item)=> 
                cart_id === item.id ? {...item, product_qty: item.product_qty - (item.product_qty >1 ? 1 : 0) } :item
            )
        );
        updateCartQuantity(cart_id, "dec");
    }
    const handleIncrement =(cart_id) =>{
        setCart(cart => 
            cart.map((item)=> 
                cart_id === item.id ? {...item, product_qty: item.product_qty + (item.product_qty <10 ? 1 : 0)} :item
            )
        );
        updateCartQuantity(cart_id, "inc");
    }

    function updateCartQuantity(cart_id, scope){
        axios.put(`/api/cart-updatequantity/${cart_id}/${scope}`).then(res => {
            if (res.data.status===200) {
                // toast.success(res.data.message);
            }
        });
    };

    const deleteCartItem =(e, cart_id)=> {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "...";
        axios.delete(`/api/delete-cartitem/${cart_id}`).then(res => {
            if (res.data.status === 200) {
                toast.success(res.data.message);
                thisClicked.closest("tr").remove();
            }else if(res.data.status === 404) {
                toast.error(res.data.message);
                // thisClicked.innerText = "remove";
            }
        })
    }


    var cartHTML = '';
    if (cart.length >0) {
        cartHTML= <div className="table-responsive">
        <table className="table">
            <thead>
                    <tr>
                        <th colSpan={2}>Product</th>
                        {/* <th>Product</th> */}
                        <th>Quantity</th>
                        <th>Unit price</th>
                        {/* <th>Discount</th> */}
                        <th colSpan={2}>Total</th>
                    </tr>
            </thead>
            <tbody>
                {cart && cart.map((item, idx) => (
                    <tr key={idx}>
                        <td><a href="#"><img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} /></a></td>
                        <td>{item.product.name}</td>
                        <td width="15%"> 
                        
                            <div className="input-group">
                                <button type="button" onClick={()=>handleDecrement(item.id)} className="input-group-text">-</button>
                                <div className="form-control text-center">{item.product_qty}</div>
                                <button type="button" onClick={()=>handleIncrement(item.id)} className="input-group-text">+</button>
                            </div>
                             
                            {/* <input type="number" defaultValue={item.product_qty} className="form-control" /> */}
                            </td>
                        <td> { parseFloat(item.product.selling_price).toLocaleString('en')}</td>
                        <td>{ parseFloat(item.product.selling_price * item.product_qty).toLocaleString('en')}</td>
                        <td>
                            <button onClick= {(e)=>deleteCartItem(e, item.id)} className="btn btn-danger btn-sm"><i className="fa fa-trash-o" /></button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th colSpan={5}>Total</th>
                    <th colSpan={2}>$446.00</th>
                </tr>
            </tfoot>
        </table>
    </div>

    } else {
        cartHTML = <div className="table-responsive">
            <h3 className="text-danger">OOOoop votre panier est vide</h3>
        </div>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {/* breadcrumb*/}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li aria-current="page" className="breadcrumb-item active">Shopping cart</li>
                        </ol>
                    </nav>
                </div>
                <div id="basket" className="col-lg-9">
                    <div className="box">
                        <form method="post" action="checkout1.html">
                            <h1>Shopping cart</h1>
                            <p className="text-muted">You currently have {cart.length} item(s) in your cart.</p>
                            
                            {cartHTML}

                            {/* /.table-responsive*/}
                            <div className="box-footer d-flex justify-content-between flex-column flex-lg-row">
                                <div className="left"><a href="category.html" className="btn btn-outline-secondary"><i className="fa fa-chevron-left" /> Continue shopping</a></div>
                                <div className="right">
                                    <button className="btn btn-outline-secondary"><i className="fa fa-refresh" /> Update cart</button>
                                    <button type="submit" className="btn btn-primary">Proceed to checkout <i className="fa fa-chevron-right" /></button>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* /.box*/}
                    <div className="row same-height-row">
                        <div className="col-lg-3 col-md-6">
                            <div className="box same-height">
                                <h3>You may also like these products</h3>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="product same-height">
                                <div className="flip-container">
                                    <div className="flipper">
                                        <div className="front"><a href="detail.html"><img src="img/product2.jpg" alt className="img-fluid" /></a></div>
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
                                        <div className="front"><a href="detail.html"><img src="img/product1.jpg" alt className="img-fluid" /></a></div>
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
                                        <div className="front"><a href="detail.html"><img src="img/product3.jpg" alt className="img-fluid" /></a></div>
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
                {/* /.col-lg-9*/}
                <div className="col-lg-3">
                    <div id="order-summary" className="box">
                        <div className="box-header">
                            <h3 className="mb-0">Order summary</h3>
                        </div>
                        <p className="text-muted">Shipping and additional costs are calculated based on the values you have entered.</p>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Order subtotal</td>
                                        <th>$446.00</th>
                                    </tr>
                                    <tr>
                                        <td>Shipping and handling</td>
                                        <th>$10.00</th>
                                    </tr>
                                    <tr>
                                        <td>Tax</td>
                                        <th>$0.00</th>
                                    </tr>
                                    <tr className="total">
                                        <td>Total</td>
                                        <th>$456.00</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="box">
                        <div className="box-header">
                            <h4 className="mb-0">Coupon code</h4>
                        </div>
                        <p className="text-muted">If you have a coupon code, please enter it in the box below.</p>
                        <form>
                            <div className="input-group">
                                <input type="text" className="form-control" /><span className="input-group-append">
                                    <button type="button" className="btn btn-primary"><i className="fa fa-gift" /></button></span>
                            </div>
                            {/* /input-group*/}
                        </form>
                    </div>
                </div>
                {/* /.col-md-3*/}
            </div>
        </div>
    );
}

export default Cart;