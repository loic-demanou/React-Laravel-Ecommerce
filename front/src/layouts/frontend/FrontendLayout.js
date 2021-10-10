// import "../../assets/frontend/js/"
// import "../../assets/frontend/css/material-design-iconic-font.min.css"
// import "../../assets/frontend/css/font-awesome.min.css"


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from "react-router";

import FooterClient from "./FooterClient";
import HeaderClient from "./HeaderClient";
import PublicRouteList from '../../routes/publicroutelist';


const FrontendLayout = () => {
  return (
    <div>
      <header className="header mb-5">
        <HeaderClient />

      </header>

      <div id="all">
        <div id="content">

          <Switch>
            {/* { path:'/', exact:true, name:'Home', component: Home } */}
            {/* <Route path="/" component={Home} /> */}
            {/* <Route path="/collections" name='Collections' component={ViewCollection} /> */}
            { 
                            PublicRouteList.map((routedata, idx) => { 
                                return (
                                    routedata.component && (
                                        <Route 
                                            key= {idx}
                                            path = {routedata.path}
                                            exact = {routedata.exact}
                                            name = {routedata.name}
                                            render = {(props) => (
                                                <routedata.component {...props} />
                                            )}
                                        />
                                    )
                                )
                            })
                        }
            {/* <Redirect from="/client" to="/client/home" /> */}
          </Switch>
        </div>
      </div>
      <FooterClient />
    </div>
  );
}

export default FrontendLayout;