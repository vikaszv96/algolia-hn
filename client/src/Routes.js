import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import './App.css';
import Create from './Create';
import Login from './Login';
import HistoryPage from './HistoryPage';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/" exact component={App} />
                <Route path="/create" exact component={Create} />
                <Route path="/login" exact component={Login} />
                <PrivateRoute path="/historypage" exact component={HistoryPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
