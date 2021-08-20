import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/login';
import Register from './pages/register';
import DoctorsList from './pages/doctorsList';
import DoctorDetail from './pages/doctorDetail';
import UserDetail from './pages/userDetail';


ReactDOM.render(
  <React.StrictMode>
    {/* <Login/> */}
    {/* <Register/> */}
    {/* <DoctorsList/> */}
    {/* <DoctorDetail/> */}
    <UserDetail/>
  </React.StrictMode>,
  document.getElementById('root')
);

// const test = require('./assets')

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
