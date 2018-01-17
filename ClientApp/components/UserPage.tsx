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
        if(sessionStorage.getItem("user") == null){
            window.location.href = "/";
        }
        return <div className="container">
            <div className="col-md-6 col-md-offset-3 user-info-block">
            <h2 className="text-center">My Account</h2>
                <div className="row">
                    <div className="col-sm-12">
                        <hr />
                        <h4>Contact info</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="list-group info-block">
                            <div className="list-group-item list-group-item-action flex-column align-items-start">
                                <dl className="dl-horizontal">
                                    <dt>Email Address:</dt>
                                    <dd>{this.state.auth_user.email}</dd>
                                    
                                    <dt>Firstname:</dt>
                                    <dd>{this.state.auth_user.firstname}</dd>

                                    <dt>Lastname:</dt>
                                    <dd>{this.state.auth_user.lastname}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <hr />
                        <h4>Billing address</h4>
                    </div>
                    <div className="col-sm-12">
                        <div className="list-group info-block">
                            <div className="list-group-item list-group-item-action flex-column align-items-start">
                                <dl className="dl-horizontal">
                                    <dt>Address:</dt>
                                    <dd>{this.state.auth_user.address}</dd>

                                    <dt>Zipcode:</dt>
                                    <dd>{this.state.auth_user.zipcode}</dd>
                                    
                                    <dt>City:</dt>
                                    <dd>{this.state.auth_user.city}</dd>

                                    <dt>Country:</dt>
                                    <dd>{this.state.auth_user.country}</dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

            </div>   
        </div>

        {/* <div className="col-sm-12">
                <span>Email Address:</span> {this.state.auth_user.email}
            </div>
            <div className="col-sm-12">
                <span>Firstname:</span> {this.state.auth_user.firstname}
            </div>
            <div className="col-sm-12">
                <span>Lastname:</span> {this.state.auth_user.lastname}
            </div>
            <div className="col-sm-12">
                <hr />
                <h4>Billing address / Delivery Address</h4>
            </div>
            <div className="col-sm-12">
                <span>Address:</span> {this.state.auth_user.address}
            </div>
            <div className="col-sm-12">
                <div className="col-sm-2">
                    <span>City:</span>
                </div>
                <div className="col-sm-5">
                    {this.state.auth_user.city}
                </div>
            </div>
            <div className="col-sm-12">
                <div className="col-sm-2">
                    <span>Zipcode:</span>
                </div>
                <div className="col-sm-5">
                    {this.state.auth_user.zipcode}
                </div>
            </div>
            <div className="col-sm-12">
                <span>Country:</span> {this.state.auth_user.country}
            </div> */}
    }
}