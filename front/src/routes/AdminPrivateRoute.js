import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import swal from "sweetalert";
import MasterLayout from "../layouts/admin/MasterLayout";
import Loader from '../Loader.gif'

function AdminPrivateRoute ({...rest}){

    const history = useHistory()
    const [Authenticated, setAuthenticated] = useState(false);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {

        axios.get(`/api/checkingAuthenticated`)
        .then(res => {
            if (res.status === 200) {
                setAuthenticated(true);
            }
            setLoading(false);
        });
        return () => {
            setAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            swal("Unauthorized", err.response.data.message, "warning");
            history.push('/');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            if (error.response.status === 403) //access denied
            {
                swal("Forbidden", error.response.data.message, "warning");
                history.push('/403');
            }
            else if (error.response.status === 404) //page not found
            {
                swal("404", "Url/page Not Found", "warning");
                history.push('/404');
            }
            return Promise.reject(error);
        }
    );

    if (Loading) {
        return <div class="d-flex justify-content-center">
                    <div id="loader" className="position-absolute mt-5" style={{ zIndex:9 }} >
                        <img id="loader" src={Loader} alt="loader"
                            height="60px" width="60px" /> <span> Loading...</span>
                    </div>
                </div>
    }

    return ( 
        <Route {...rest}
            render={ ( { props, location}) => 
            Authenticated ?
            ( <MasterLayout {...props} /> ) :
            ( <Redirect to={{pathname: "/login", state: {from: location} }} /> )
    
    } />
     );
}
 
export default AdminPrivateRoute;