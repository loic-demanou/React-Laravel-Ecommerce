import Register from '../components/frontend/auth/Register';
import Login from '../components/frontend/auth/Login';
import DetailsProduct from '../components/frontend/collections/product/DetailsProduct';
import ViewProduct from '../components/frontend/collections/product/ViewProduct';
import ViewCollection from '../components/frontend/collections/ViewCollection';
import Error404 from '../components/frontend/Error404';
import Home from '../components/frontend/Home';

const PublicRouteList =  [
    
    { path:'/', exact:true, name:'Home', component: Home },
    { path:'/login', exact:true, name:'Login', component:Login },
    { path:'/register', exact:true, name:'Collection', component:Register },
    
    { path:'/collections', exact:true, name:'Collection', component:ViewCollection },
    { path:'/collections/:slug', exact:true, name:'ViewProduct', component:ViewProduct },
    { path:'/collections/:category/:product', exact:true, name:'DetailsProduct', component:DetailsProduct },

    { path:'*', exact:true, name:'Error', component:Error404 },
    // <Route path= '*' component= {Error404} />

];

export default PublicRouteList;