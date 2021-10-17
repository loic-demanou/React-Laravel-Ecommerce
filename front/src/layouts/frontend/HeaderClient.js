import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import logo from '../../Loader.gif';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "../../components/frontend/auth/Login";

toast.configure()


const HeaderClient = () => {

  const history = useHistory();
  const [CartLenght, setCartLenght] = useState(0);
  const [user, setUser] = useState("");

  const logoutSubmit =(e)=> {
    e.preventDefault();
    axios.post(`/api/logout`)
    .then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        // swal("Success", res.data.message, 'success');
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        history.push('/');
      } else {
        
      }
    })
  }

  const fetchCart= ()=> {
    axios.get(`/api/cart`).then(res => {
        if (res.data.status ===200) {
            // setCart(res.data.cart);
            console.log(res.data);
            setUser(res.data.auth);
            setCartLenght(res.data.cart.length);
        } else if(res.data.status === 401) {
            history.push('/');
            // toast.warn(res.data.message);
        }
    })

}

useEffect(() => {
    fetchCart();

},[])



  var AuthButtons ='';
  if (!localStorage.getItem('auth_token')) {
    
    AuthButtons = (
      <>
        <li className="list-inline-item"><Link to="/login">Se connecter</Link></li>
        <li className="list-inline-item"><Link to="/register">S'inscrire</Link></li>
      </>
    )
  } else {
    AuthButtons = (
      <>
          <li className="list-inline-item">
            {/* <button type="button" onClick={logoutSubmit} className="btn btn-danger btn-sm">Logout</button> */}
            
            <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-user"></i> {user}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button className="dropdown-item" type="button">Action</button>
              <button onClick={logoutSubmit} className="dropdown-item btn-danger bg-danger text-white" type="button">Se déconnecter <i class="fas fa-sign-out-alt"></i></button>
            </div>
          </div>


          </li>
      </>
    ) 
  }



  return (
    <div>
      {/*
    *** TOPBAR ***
    _________________________________________________________
    */}
      <div id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offer mb-3 mb-lg-0"><Link to="#" className="btn btn-success btn-sm">Offer of the day</Link><Link to="#" className="ml-1">Get flat 35% off on orders over $50!</Link></div>
            <div className="col-lg-6 text-center text-lg-right">
              <ul className="menu list-inline mb-0">

                {AuthButtons}

                {/* <li className="list-inline-item"><Link to="/login">Login</Link></li>
                <li className="list-inline-item"><Link to="/register">Register</Link></li>
                <li className="list-inline-item"><nutton type="button" className="btn btn-danger btn-sm">Logout</nutton></li> */}
                {/* <li className="list-inline-item"><Link to="#" data-toggle="modal" data-target="#login-modal">Login modal</Link></li> */}
                <li className="list-inline-item"><Link to="#">Contact</Link></li>
                {/* <li className="list-inline-item"><Link to="#">Recently viewed</Link></li> */}
              </ul>
            </div>
          </div>
        </div>
        <div id="login-modal" tabIndex={-1} role="dialog" aria-labelledby="Login" aria-hidden="true" className="modal fade">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer login</h5>
                <button type="button" data-dismiss="modal" aria-label="Close" className="close"><span aria-hidden="true">×</span></button>
              </div>
              <div className="modal-body">
                {/* <form action="customer-orders.html" method="post">
                  <div className="form-group">
                    <input id="email-modal" type="text" placeholder="email" className="form-control" />
                  </div>
                  <div className="form-group">
                    <input id="password-modal" type="password" placeholder="password" className="form-control" />
                  </div>
                  <p className="text-center">
                    <button className="btn btn-primary"><i className="fa fa-sign-in" /> Log in</button>
                  </p>
                </form>
                 */}
                 {/* <Login /> */}
                <p className="text-center text-muted">Not registered yet?</p>
                <p className="text-center text-muted"><Link to="/register"><strong>Register now</strong></Link>! It is easy and done in 1&nbsp;minute and gives you access to special discounts and much more!</p>
              </div>
            </div>
          </div>
        </div>
        {/* *** TOP BAR END ****/}
      </div>
      <nav className="navbar navbar-expand-lg">
        <div className="container"><Link to="/" className="navbar-brand home">
          <img src={logo} alt="logo logo" className="d-none d-md-inline-block" />
          <img src={logo} alt="Obaju logo" className="d-inline-block d-md-none" />
          <span className="sr-only">Obaju - go to homepage</span></Link>
          <div className="navbar-buttons">
            <button type="button" data-toggle="collapse" data-target="#navigation" className="btn btn-outline-secondary navbar-toggler"><span className="sr-only">Toggle navigation</span><i className="fa fa-align-justify" /></button>
            <button type="button" data-toggle="collapse" data-target="#search" className="btn btn-outline-secondary navbar-toggler"><span className="sr-only">Toggle search</span><i className="fa fa-search" /></button><a href="basket.html" className="btn btn-outline-secondary navbar-toggler"><i className="fa fa-shopping-cart" /></a>
          </div>
          <div id="navigation" className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><NavLink exact activeClassName="nav-link active" className="nav-link" to="/" >Accueil</NavLink></li>
              <li className="nav-item"><NavLink activeClassName="nav-link active"className="nav-link" to="/shop">Boutique</NavLink></li>
              <li className="nav-item"><NavLink activeClassName="nav-link active"className="nav-link" to="/collections">Collections</NavLink></li>
              <li className="nav-item dropdown menu-large"><a href="#" data-toggle="dropdown" data-hover="dropdown" data-delay={200} className="dropdown-toggle nav-link">Men<b className="caret" /></a>
                <ul className="dropdown-menu megamenu">
                  <li>
                    <div className="row">
                      <div className="col-md-6 col-lg-3">
                        <h5>Clothing</h5>
                        <ul className="list-unstyled mb-3">
                          <li className="nav-item"><a href="category.html" className="nav-link">T-shirts</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Shirts</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Pants</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Accessories</a></li>
                        </ul>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <h5>Shoes</h5>
                        <ul className="list-unstyled mb-3">
                          <li className="nav-item"><a href="category.html" className="nav-link">Trainers</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Sandals</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Hiking shoes</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Casual</a></li>
                        </ul>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <h5>Accessories</h5>
                        <ul className="list-unstyled mb-3">
                          <li className="nav-item"><a href="category.html" className="nav-link">Trainers</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Sandals</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Hiking shoes</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Casual</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Hiking shoes</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Casual</a></li>
                        </ul>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <h5>Featured</h5>
                        <ul className="list-unstyled mb-3">
                          <li className="nav-item"><a href="category.html" className="nav-link">Trainers</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Sandals</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Hiking shoes</a></li>
                        </ul>
                        <h5>Looks and trends</h5>
                        <ul className="list-unstyled mb-3">
                          <li className="nav-item"><a href="category.html" className="nav-link">Trainers</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Sandals</a></li>
                          <li className="nav-item"><a href="category.html" className="nav-link">Hiking shoes</a></li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="navbar-buttons d-flex justify-content-end">
              {/* /.nav-collapse*/}
              <div id="search-not-mobile" className="navbar-collapse collapse" /><a data-toggle="collapse" href="#search" className="btn navbar-btn btn-primary d-none d-lg-inline-block"><span className="sr-only">Toggle search</span><i className="fa fa-search" /></a>
              <div id="basket-overview" className="navbar-collapse collapse d-none d-lg-block">
                <Link to="/cart" className="btn btn-primary navbar-btn"><i className="fa fa-shopping-cart" />
                  <span>{CartLenght} </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div id="search" className="collapse">
        <div className="container">
          <form role="search" className="ml-auto">
            <div className="input-group">
              <input type="text" placeholder="Search" className="form-control" />
              <div className="input-group-append">
                <button type="button" className="btn btn-primary"><i className="fa fa-search" /></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>



  );
}

export default HeaderClient;