import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import {Oratio} from './components/Oratio';
import './index.css'

ReactDOM.render(
    <Router>
        <Oratio />
    </Router>
    , document.getElementById('root'));


