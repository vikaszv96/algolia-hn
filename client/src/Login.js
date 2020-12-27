import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import { authenticate, getUser } from './helpers';

const Login = props => {
    // create a state
    const [state, setState] = useState({
        name: '',
        password: ''
    });
    const { name, password } = state; // destructure values from state

    useEffect(() => {
        getUser() && props.history.push('/');
    }, []);

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.table({ name, password });
        axios
            .post(`${process.env.REACT_APP_API}/login`, { name, password })
            .then(response => {
                console.log(response);
                // response will contain token and name
                authenticate(response, () => props.history.push('/'));
                // redirect to create page
            })
            .catch(error => {
                console.log(error);
                alert("error = " + error);
            });
    };

    return (
        <div className="container pb-5">
            <br />
            <h1>LOGIN</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">Username</label>
                    <input
                        onChange={handleChange('name')}
                        value={name}
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input
                        onChange={handleChange('password')}
                        value={password}
                        type="password"
                        className="form-control"
                        placeholder="Your Password"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-secondary">Login</button>
                </div>
                &nbsp;
                <div className="form-group">
                <span className="nav-item ml-auto pr-3 pt-3 pb-3">
                    <Link to="/create"><h5><u>Create an account</u></h5></Link>
                </span>
                </div>
            </form>
        </div>
    );
};

export default withRouter(Login);
