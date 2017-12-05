import * as React from 'react';
import { Router, Route, Switch } from 'react-router'

import { RouteComponentProps } from 'react-router';
import { NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"


// interface LoginProps{}


export default class Login extends React.Component<RouteComponentProps<{}>> {
    render() {
        return (
            <div>
                <input type="email" value="" />
                <input type="password" value="" />
                <input type="submit" value="Login" />
            </div>
        );
    }
}
