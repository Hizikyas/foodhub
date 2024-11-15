import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Provider } from 'react-redux';
import  store from "./Store/redux";



ReactDOM.render(   <BrowserRouter> <Provider store = {store}><App /></Provider></BrowserRouter>, document.getElementById('root')) ;


