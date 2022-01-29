import Category from '../components/admin/category/Category';
import CategoryEdit from '../components/admin/category/CategoryEdit';
import Create from '../components/admin/category/Create';
import Dashboard from '../components/admin/Dashboard';
import CreateProduct from '../components/admin/product/CreateProduct';
import Product from '../components/admin/product/Product';
import Profile from '../components/admin/Profile';
import Vente from '../components/admin/Vente';
// import Vente from '../components/admin/Vente';

const Routes =  [ 
    // {exact path="/admin/dashboard" component={Dashboard}} 
    // exact path="/admin/profile" component={Profile} 
    
    { path:'/admin', exact:true, name:'Admin' },
    { path:'/admin/dashboard', exact:true, name:'Dashboard', component:Dashboard },
    { path:'/admin/profile', exact:true, name:'Profile', component:Profile },
    
    { path:'/admin/category', exact:true, name:'Category', component:Category },
    { path:'/admin/category/create', exact:true, name:'CategoryCreate', component:Create },
    { path:'/admin/category/edit/:id', exact:true, name:'CategoryEdit', component:CategoryEdit },

    { path:'/admin/product', exact:true, name:'Product', component:Product },
    { path:'/admin/product/create', exact:true, name:'ProductCreate', component:CreateProduct },
    { path:'/admin/vente', exact:true, name:'Vente', component:Vente },

];

export default Routes;