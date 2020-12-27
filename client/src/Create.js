import React, { useState } from 'react';
import axios from 'axios';
import { getUser, getToken } from './helpers';
import 'react-quill/dist/quill.bubble.css';
import { Link, useHistory } from 'react-router-dom';

const Create = () => {
    // state
    const historyUse = useHistory();
    const [state, setState] = useState({
        user: '',
        password:'',
        cpassword:'',
        history:[]
    });
    const [content, setContent] = useState('');

    // rich text editor handle change
    const handleContent = event => {
        console.log(event);
        setContent(event);
    };

    // destructure values from state
    const { user, password, cpassword, history } = state;

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .post(
                `${process.env.REACT_APP_API}/post`,
                { user, password, cpassword, history }
            )
            .then(response => {
                console.log(response);
                alert(`Registered successfully!`);

  setState({
    ...state,
    user: '',
    password:'',
    cpassword:''
  });

            })
            .catch(error => {
                console.log(error.response);
                alert(error.response);
            });
    };

    return (
        <div className="container pb-5">
            <br />
            <h1>REGISTRATION FORM</h1>
            &nbsp;
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="text-muted">USERNAME</label>
                    <input
                        onChange={handleChange('user')}
                        value={user}
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">PASSWORD</label>
                    <input
                        onChange={handleChange('password')}
                        value={password}
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">CONFIRM PASSWORD</label>
                    <input
                        onChange={handleChange('cpassword')}
                        value={cpassword}
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        required
                    />
                </div>
                <div>
                    <button className="btn btn-secondary">Submit</button>
                </div>
            </form>
            <div className="form-group">
            <h5>Already Registered ?</h5>
            <span className="nav-item ml-auto pr-3 pt-3 pb-3">
                <Link to="/login"><u>Login Here!</u></Link>
            </span>
            </div>
            <br />
        </div>
    );
};

export default Create;
