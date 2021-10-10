import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {

    const history = useHistory();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    })

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value });
    }

    const loginSubmit =(e)=> {
        e.preventDefault();

        const data= {
            email: loginInput.email,
            password: loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data)
            .then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, 'success');
                    history.push('/');

                } else if(res.data.status === 401) {
                    swal("Warning", res.data.message, 'warning');
                }else {
                    setLogin({...loginInput, error_list: res.data.validation_errors });
                }
            });
        });
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    {/* breadcrumb*/}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li aria-current="page" className="breadcrumb-item active"> Sign in</li>
                        </ol>
                    </nav>
                </div>
                <div className="col-lg-6">
                    <div className="box">
                        <h1>Login</h1>
                        <p className="lead">Already our customer?</p>
                        {/* <p className="text-muted">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p> */}
                        <hr />
                        <form onSubmit={loginSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" onChange={handleInput} value={loginInput.email} className={loginInput.error_list.email ? "form-control border-danger" : "form-control"} />
                                <span className="form-text text-danger">{loginInput.error_list.email}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" onChange={handleInput} value={loginInput.password} className={loginInput.error_list.password ? "form-control border-danger" : "form-control"} />
                                <span className="form-text text-danger">{loginInput.error_list.password}</span>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary"><i className="fa fa-sign-in" /> Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;