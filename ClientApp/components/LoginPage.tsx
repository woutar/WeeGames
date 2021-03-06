import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import { Login } from './Login';
import * as Models from "../Model"


export class LoginPage extends React.Component<RouteComponentProps<{}>> {
    constructor() {
        super();

    }
    public render() {
        if(sessionStorage.getItem("user")){
            return<div>Already logged in, redirecting
                {window.location.href = "/"}
            </div>
        }

        return <div className="row">
                <div className="col-lg-4 col-lg-offset-4">
                <h2>Login</h2>
                <Login location={"user"}/>
                <span>not a user yet? <a href="/register">click here to register</a></span>
                </div>
        </div>
            
    }
}