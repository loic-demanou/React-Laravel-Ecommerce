import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


const Register = () => {

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            axios.post(`/api/register`, data)
            .then(res => {
                if (res.data.status === 200) {
                    setIsLoading(false);
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
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
                    setIsLoading(false);
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
                            <li className="breadcrumb-item"><Link to="/">Accueil</Link></li>
                            <li aria-current="page" className="breadcrumb-item active">Nouveau compte</li>
                        </ol>
                    </nav>
                </div>
                <div className="col-lg-6">
                    <div className="box">
                        <h1>Nouveau compte</h1>
                        <p className="lead">Vous n'êtes pas encore enregistré ?</p>
                        <p>
                        Avec l'enregistrement avec nous un nouveau monde de l'achat en ligne, des réductions fantastiques et beaucoup plus s'ouvre à vous ! L'ensemble du processus ne vous prendra pas plus d'une minute !
                        Avec l'enregistrement avec nous un nouveau monde de l'achat en ligne, des réductions fantastiques et beaucoup plus s'ouvre à vous ! L'ensemble du processus ne vous prendra pas plus d'une minute !
                        </p>
                        {/* <p className="text-muted">If you have any questions, please feel free to <a href="contact.html">contact us</a>, our customer service center is working for you 24/7.</p> */}
                        <hr />
                        
                        <form onSubmit = {registerSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Nom d'utilisateur</label>
                                <input name="name" onChange={handleInput} value={registerInput.name} type="text" className={registerInput.error_list.name ? "form-control border-danger" : "form-control"} />
                                <span className="form-text text-danger">{registerInput.error_list.name}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input name="email" onChange={handleInput} value={registerInput.email} type="text" className={registerInput.error_list.email ? "form-control border-danger" : "form-control"} />
                                <span className="form-text text-danger">{registerInput.error_list.email}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input name="password" onChange={handleInput} value={registerInput.password} type="password" className={registerInput.error_list.password ? "form-control border-danger" : "form-control"} />
                                <span className="form-text text-danger">{registerInput.error_list.password}</span>
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="password">Confirm Password</label>
                                <input name="password" type="password" className="form-control" />
                            </div> */}
                            <div className="text-center">
                                {!isLoading && <button type="submit" className="btn btn-primary"><i className="fa fa-user-md" /> Enregistrer</button>}
                            
                           {isLoading && <button class="btn btn-primary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>En cours...
                            </button>}
                            <p className="mt-2">Vous avez déja un compte ? 
                                <Link to="/login">Connectez vous</Link>
                            </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;