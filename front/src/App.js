// import logo from './logo.svg';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Error404 from './components/frontend/Error404';
import MasterLayout from './layouts/admin/MasterLayout';
import PublicRoute from './PublicRoute';


axios.defaults.baseURL= "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        {/* <Route exact path= '/' component= {Home} /> */}
        {/* <Route exact path= '/register' component= {Register} />
        <Route exact path= '/login' component= {Login} /> */}
        

        <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} /> } />

        <PublicRoute path='/' name="Home" />
        <Route path= '*' component= {Error404} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
