import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import swal from "sweetalert";

const HeaderClient = () => {

  const history = useHistory();

  const logoutSubmit =(e)=> {
    e.preventDefault();
    axios.post(`/api/logout`)
    .then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal("Success", res.data.message, 'success');
        history.push('/');

      } else {
        
      }
    })
  }

  var AuthButtons ='';
  if (!localStorage.getItem('auth_token')) {
    
    AuthButtons = (
      <>
        <li className="list-inline-item"><Link to="/login">Login</Link></li>
        <li className="list-inline-item"><Link to="/register">Register</Link></li>
      </>
    )
  } else {
    AuthButtons = (
      <>
          <li className="list-inline-item">
            <button type="button" onClick={logoutSubmit} className="btn btn-danger btn-sm">Logout</button>
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
                {/* <li className="list-inline-item"><Link to="#" data-toggle="modal" data-target="#login-modal">Login</Link></li> */}
                <li className="list-inline-item"><Link to="contact.html">Contact</Link></li>
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
                <form action="customer-orders.html" method="post">
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
                <p className="text-center text-muted">Not registered yet?</p>
                <p className="text-center text-muted"><Link to="/register"><strong>Register now</strong></Link>! It is easy and done in 1&nbsp;minute and gives you access to special discounts and much more!</p>
              </div>
            </div>
          </div>
        </div>
        {/* *** TOP BAR END ****/}
      </div>
      <nav className="navbar navbar-expand-lg">
        <div className="container"><a href="index.html" className="navbar-brand home"><img src="img/logo.png" alt="Obaju logo" className="d-none d-md-inline-block" /><img src="img/logo-small.png" alt="Obaju logo" className="d-inline-block d-md-none" /><span className="sr-only">Obaju - go to homepage</span></a>
          <div className="navbar-buttons">
            <button type="button" data-toggle="collapse" data-target="#navigation" className="btn btn-outline-secondary navbar-toggler"><span className="sr-only">Toggle navigation</span><i className="fa fa-align-justify" /></button>
            <button type="button" data-toggle="collapse" data-target="#search" className="btn btn-outline-secondary navbar-toggler"><span className="sr-only">Toggle search</span><i className="fa fa-search" /></button><a href="basket.html" className="btn btn-outline-secondary navbar-toggler"><i className="fa fa-shopping-cart" /></a>
          </div>
          <div id="navigation" className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><Link to="/" className="nav-link active">Home</Link></li>
              <li className="nav-item"><Link to="/collections" className="nav-link">Collections</Link></li>
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
              <div id="basket-overview" className="navbar-collapse collapse d-none d-lg-block"><a href="basket.html" className="btn btn-primary navbar-btn"><i className="fa fa-shopping-cart" /><span>3 items in cart</span></a></div>
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