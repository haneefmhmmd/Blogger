import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import Posts from './Components/Posts';
import Create from './Components/Create';
import Updation from './Components/Updation';
import TempViewPost from './Components/TempViewPost';
import HomePage from './Components/HomePage';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import PrivateRoute from './hosc/PrivateRoute';
import UnPrivateRoute from './hosc/UnPrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path ='/' component ={HomePage} />
      <UnPrivateRoute exact path ='/login' component ={Login} />
      <UnPrivateRoute exact path ='/register' component ={Register} />
      <PrivateRoute exact path ='/posts' component ={Posts} />
      <PrivateRoute exact path ='/create' component ={Create} />
      <Route exact path ='/post/:postId' component ={TempViewPost} />
      <PrivateRoute exact path ='/updation/:postId' component ={Updation} />
    </Router>
  );
}

export default App;

