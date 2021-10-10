import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import swal from "sweetalert";

const Register = () => {

    const history = useHistory();

    const [registerInput, setRegister] = useState({
        name:'',
        email:'',
        password:'',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit =(e)=>{
        e.preventDefault();
         
        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`, data)
            .then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, 'success');
                    history.push('/');
                } else {
                    setRegister({...registerInput, error_list:res.data.validation_errors});
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
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li aria-current="page" className="breadcrumb-item active">New account / Sign in</li>
                        </ol>
                    </nav>
                </div>
                <div className="col-lg-6">
                    <div className="box">
                        <h1>New account</h1>
                        <p className="lead">Not our registered customer yet?</p>
                        <p>With registration with us new world of fashion, fantastic discounts and much more opens to you! The whole process will not take you more than a minute!</p>
                        <p className="text-muted">If you have any questions, please feel free to <a href="contact.html">contact us</a>, our customer service center is working for you 24/7.</p>
                        <hr />
                        <form onSubmit = {registerSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input name="name" onChange={handleInput} value={registerInput.name} type="text" className={registerInput.error_list.name ? "form-control border-danger" : "form-control"} />
                                <span className="form-text text-danger">{registerInput.error_list.name}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input name="email" onChange={handleInput} value={registerInput.email} type="text" className={registerInput.error_list.email ? "form-control border-danger" : "form-control"} />
                                <span className="form-text text-danger">{registerInput.error_list.email}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input name="password" onChange={handleInput} value={registerInput.password} type="password" className={registerInput.error_list.password ? "form-control border-danger" : "form-control"} />
                                <span className="form-text text-danger">{registerInput.error_list.password}</span>
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="password">Confirm Password</label>
                                <input name="password" type="password" className="form-control" />
                            </div> */}
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary"><i className="fa fa-user-md" /> Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;