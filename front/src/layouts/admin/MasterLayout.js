import "../../assets/admin/css/styles.css";
import '../../assets/admin/js/scripts';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
// import '../../../node_modules/bootstrap'


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Routes from "../../routes/routes";
import { Redirect } from "react-router";

const MasterLayout = () => {
    return ( 
        <div className="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar />
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <Switch>
                            { 
                                Routes.map((route, idx) => { 
                                    return (
                                        route.component && (
                                            <Route 
                                                key= {idx}
                                                path = {route.path}
                                                exact = {route.exact}
                                                name = {route.name}
                                                render = {(props) => (
                                                    <route.component {...props} />
                                                )}
                                            />
                                        )
                                    )
                                }) 
                            }
                            <Redirect from="/admin" to="/admin/dashboard" />
                        </Switch>
                    </main>
                    <Footer />
                </div>

            </div>

        </div>
     );
}
 
export default MasterLayout;