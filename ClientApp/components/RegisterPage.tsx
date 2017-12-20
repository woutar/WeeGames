import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import { Register } from './Register';
import * as Models from "../Model"


export class RegisterPage extends React.Component<RouteComponentProps<{}>> {
    constructor() {
        super();

    }
    public render() {
        return <div className="row">
        <h2>Register</h2>
            <Register location={"user"}/>
        </div>
    }
}