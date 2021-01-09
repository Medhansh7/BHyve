import React, { useState, useEffect } from 'react'
import { Switch, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import User from './components/User';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';




export default function Routes() {

    const [auth, setAuth] = useState(false)

    return (
        <div>
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/Signin' component={SignIn} />
                <Route path='/Login' component={Login} />
                <PrivateRoute path="/User" component={User} />
            </Switch>


        </div>
    )
}
