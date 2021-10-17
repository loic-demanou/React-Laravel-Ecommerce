import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert";

toast.configure()


const Checkout = () => {

    const [cart, setCart] = useState([]);
    const [error, setError] = useState([]);
    const history = useHistory();
    
    const [checkoutInput, setCheckoutInput] = useState({
        firstname:'',
        lastname:'',
        phone:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
    });

    const handleInput =(e)=> {
        e.persist();
        setCheckoutInput({...checkoutInput, [e.target.name] : e.target.value });
    }

    const submitOrder =(e)=>{
        e.preventDefault();

        const data ={
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            street: checkoutInput.street,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
        }
        axios.post(`/api/place-order`, data).then(res => {
            if (res.data.status === 200) {
                swal("Commande passée avec success !", res.data.message, "success");
                setError([]);
                history.push('/thank-you');
            } else if(res.data.status === 422) {
                swal("Tous les champs sont obligatoires", "", "error");
                setError(res.data.errors);
            }
        })
    }

    var totalCardPrice = 0;
    var tva = 0;

    const back= ()=>{
        history.go(-1)
    }

    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        toast.warn("Vous devez dabord être connecté");
    }

    const fetchCart = () => {
        // setIsLoading(true);
        // axios.get(`http://127.0.0.1:8000/api/view-product/${slug}`)
        axios.get(`/api/cart`).then(res => {
            if (res.data.status === 200) {
                setCart(res.data.cart);
                // console.log(res.data);
                // setCartLenght(res.data.cart.length);
            } else if (res.data.status === 401) {
                history.push('/');
                toast.warn(res.data.message);
            }
        })

    }

    useEffect(() => {
        fetchCart();

    }, [])



    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {/* breadcrumb*/}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/">Acceuil</a></li>
                            <li aria-current="page" className="breadcrumb-item active">Checkout - Address</li>
                        </ol>
                    </nav>
                </div>
                <div id="checkout" className="col-lg-9">
                    <div className="box">
                        <form>
                            <h1>Paiement</h1>
                            <div>
                                <ul className="nav flex-column flex-md-row nav-pills text-center mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item nav-link flex-sm-fill text-sm-center" role="presentation">
                                        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                            <i className="fa fa-map-marker"> </i>Informations</a>
                                    </li>
                                    <li className="nav-item nav-link flex-sm-fill text-sm-center" role="presentation">
                                        <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
                                            <i className="fa fa-eye"></i>Revue de la commande</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        <div className="content py-3">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="firstname">Firstname</label>
                                                        <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className={error.firstname ? "form-control border-danger" : "form-control"} />
                                                        <span className="form-text text-danger">{error.firstname}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="lastname">Lastname</label>
                                                        <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className={error.lastname ? "form-control border-danger" : "form-control"} />
                                                        <span className="form-text text-danger">{error.lastname}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* /.row*/}
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="zip">ZIP</label>
                                                        <input name="zipcode" type="text" onChange={handleInput} value={checkoutInput.zipcode} className={error.zipcode ? "form-control border-danger" : "form-control"} />
                                                        <span className="form-text text-danger">{error.zipcode}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="state">State</label>
                                                        <input name="state" type="text" onChange={handleInput} value={checkoutInput.state} className={error.state ? "form-control border-danger" : "form-control"} />
                                                        <span className="form-text text-danger">{error.state}</span>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="city">City</label>
                                                        <input name="city" type="text" onChange={handleInput} value={checkoutInput.city} className={error.city ? "form-control border-danger" : "form-control"} />
                                                        <span className="form-text text-danger">{error.city}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="street">street</label>
                                                        <input name="street" type="text" onChange={handleInput} value={checkoutInput.street} className={error.street ? "form-control border-danger" : "form-control"} />
                                                        <span className="form-text text-danger">{error.street}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="phone">Telephone</label>
                                                        <input name="phone" type="text" onChange={handleInput} value={checkoutInput.phone} className={error.phone ? "form-control border-danger" : "form-control"} />
                                                        <span className="form-text text-danger">{error.phone}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email</label>
                                                        <input name="email" type="text" onChange={handleInput} value={checkoutInput.email} className={error.email ? "form-control border-danger" : "form-control"} />
                                                        <span className="form-text text-danger">{error.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* /.row*/}
                                        </div>

                                        ..1.</div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <div className="content py-3">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th colSpan={2}>Produit</th>
                                                            {/* <th>Product</th> */}
                                                            <th>Quantité</th>
                                                            <th>Prix unitaire</th>
                                                            {/* <th>Discount</th> */}
                                                            <th colSpan={2}>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cart && cart.map((item, idx) => {
                                                            totalCardPrice += item.product.selling_price * item.product_qty;
                                                            tva = (totalCardPrice * item.product.TVA) / 100;
                                                            return (
                                                                <tr key={idx}>
                                                                    <td><a href="#"><img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} /></a></td>
                                                                    <td>{item.product.name}</td>
                                                                    <td> {item.product_qty}</td>
                                                                    <td> {parseFloat(item.product.selling_price).toLocaleString('en')}</td>
                                                                    <td>{parseFloat(item.product.selling_price * item.product_qty).toLocaleString('en')}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <th colSpan={4}>Total</th>
                                                            <th colSpan={3}>{parseFloat(totalCardPrice).toLocaleString('en')} Fcfa</th>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>


                                        </div>
                                        ..2.
                                    </div>
                                </div>
                            </div>

                            <div className="box-footer d-flex justify-content-between">
                                <button type="button" onClick={()=>back()} className="btn btn-outline-secondary"><i className="fa fa-chevron-left" />Retourner au panier</button>
                                <button type="submit" className="btn btn-primary" onClick={submitOrder} >Passer la commande<i className="fa fa-chevron-right" /></button>
                            </div>
                        </form>
                    </div>
                    {/* /.box*/}
                </div>
                {/* /.col-lg-9*/}
                <div className="col-lg-3">
                    <div id="order-summary" className="box">
                        <div className="box-header">
                            <h3 className="mb-0">Résumé de la commande</h3>
                        </div>
                        <p className="text-muted">Les frais supplémentaires sont calculés en fonction des valeurs que vous avez saisies.</p>
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Sous-total</td>
                                        <th>{parseFloat(totalCardPrice).toLocaleString('en')} Fcfa</th>
                                    </tr>
                                    <tr>
                                        <td>Tax</td>
                                        <th>{parseFloat(tva).toLocaleString('en')} Fcfa</th>
                                    </tr>
                                    <tr className="total">
                                        <td>Total</td>
                                        <th>{parseFloat(tva + totalCardPrice).toLocaleString('en')} Fcfa</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* /.col-lg-3*/}
            </div>
        </div>
    );
}

export default Checkout;