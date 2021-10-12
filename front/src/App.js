// import logo from './logo.svg';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Error403 from './components/frontend/Error403';
import Error404 from './components/frontend/Error404';
import MasterLayout from './layouts/admin/MasterLayout';
import PublicRoute from './PublicRoute';
import AdminPrivateRoute from './routes/AdminPrivateRoute';


axios.defaults.baseURL= "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path= '/403' component= {Error403} />
        <Route path= '/404' component= {Error404} />
        {/* <Route exact path= '/' component= {Home} /> */}
        {/* <Route exact path= '/register' component= {Register} />
        <Route exact path= '/login' component= {Login} /> */}
            <Route path="/login">
                { localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Login /> }
            </Route>,
            <Route path="/register">
                { localStorage.getItem('auth_token') ? <Redirect to="/" /> : <Register /> }
            </Route>,


        {/* <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} /> } /> */}
        <AdminPrivateRoute path="/admin" name="Admin" />

        <PublicRoute path='/' name="Home" />
        <Route path= '*' component= {Error404} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
