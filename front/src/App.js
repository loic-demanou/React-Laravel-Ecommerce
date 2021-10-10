// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/frontend/auth/Login';
import Register from './components/frontend/auth/Register';
import Error404 from './components/frontend/Error404';
import MasterLayout from './layouts/admin/MasterLayout';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        {/* <Route exact path= '/' component= {Home} /> */}
        <Route exact path= '/register' component= {Register} />
        <Route exact path= '/login' component= {Login} />
        

        <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} /> } />

        <PublicRoute path='/' name="Home" />
        <Route path= '*' component= {Error404} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
