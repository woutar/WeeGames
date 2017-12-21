import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model"


export class UserPage extends React.Component<RouteComponentProps<{}>,{auth_user : Models.User}> {
    constructor() {
        super();

        let user_session = sessionStorage.getItem("user");
        if(user_session != null){
            let auth_user = JSON.parse(user_session);
            this.state ={auth_user : auth_user};
        }

    }
    public render() {
        if(this.state.auth_user == null){
            window.location.href = "/";
        }
        return <div className="row">
            <div className="col-lg-8">
            <h2>Welcome, {this.state.auth_user.firstname}</h2>
            <h3>Below are your user details</h3>
                <div className="row">
                    <div className="col-sm-12">
                        <h5><b>Email Address:</b> {this.state.auth_user.email}</h5>
                    </div>
                    <div className="col-sm-12">
                        <h5><b>Firstname:</b> {this.state.auth_user.firstname}</h5>
                    </div>
                    <div className="col-sm-12">
                        <h5><b>Lastname:</b> {this.state.auth_user.lastname}</h5>
                    </div>
                    <div className="col-sm-12">
                        <h5><b>Address:</b> {this.state.auth_user.address}</h5>
                    </div>
                    <div className="col-sm-12">
                        <h5><b>City:</b> {this.state.auth_user.city}</h5>
                    </div>
                    <div className="col-sm-12">
                        <h5><b>Zipcode:</b> {this.state.auth_user.zipcode}</h5>
                    </div>
                    <div className="col-sm-12">
                        <h5><b>Country:</b> {this.state.auth_user.country}</h5>
                    </div>
                </div>   
            </div>
        </div>
    }
}