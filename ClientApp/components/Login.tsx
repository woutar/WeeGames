import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';


    export class Login extends React.Component<RouteComponentProps<{}>> {
        constructor(){
            super();
        }
    
        render() {
            return (
            <div className="row">
            <form method="post" action="/api/user/Login">
                <div className="col-lg-4 col-lg-offset-4">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label>Email address</label>
                        <input id="Email" type="email" className="form-control"  placeholder="Enter email" required/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input id="Password" type="password" className="form-control" placeholder="******" />
                    </div>
               
                    <input type="submit" className="btn btn-default" value="Submit"/>
                </div>
            </form>
            </div>
        )
    }
}