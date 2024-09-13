import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
const Quiz = () =>{
    const current_user = JSON.parse(localStorage.getItem('current_user'))
    return (
    <Fragment>
        <Helmet><title>Home - Quiz App</title></Helmet>
        <Navbar />
        <div id="home">
            <section>
                <div style={{ textAlign: 'center' }}>
                    <span className="mdi mdi-cube-outline cube"></span>
                </div>
                {current_user && <h5>Hello! {current_user.name} Welcome to</h5>}
                <h1>Quiz App</h1>
                <div className="play-button-container">
                    <ul>
                        <li><Link className="play-button" to="/play/instructions">Play</Link></li>
                    </ul>
                </div>
            </section>
        </div>
    </Fragment>
);
}
export default Quiz;