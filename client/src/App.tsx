import React from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import SignIn from './pages/UserPages/SignIn';
import SignUp from './pages/UserPages/SignUp'
import Profile from './pages/UserPages/Account'
import Error from './pages/UserPages/fallback';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/sign-in' element={<SignIn/>}></Route>
          <Route path='/sign-up' element={<SignUp/>}></Route>
          <Route path='/home' element={<SignIn/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='*' element={<Error />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
