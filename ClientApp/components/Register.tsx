import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';


    export class Register extends React.Component<RouteComponentProps<{}>> {
        constructor(){
            super();
        }
    
        render() {
            return (
            <div className="row">
            <h2>Register</h2>
            <form method="post" action="/api/user/register">
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>Email address</label>
                        <input id="Email" type="email" className="form-control"  placeholder="Enter email" required/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input id="Password" type="password" className="form-control" placeholder="******" />
                    </div>
                </div>
                <div className="col-lg-2" />
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>Firstname</label>
                        <input id="Firstname" type="text" className="form-control"  placeholder="Enter Firstname"/>
                    </div>
                    <div className="form-group">
                        <label>Lastname</label>
                        <input id="Lastname" type="text" className="form-control"  placeholder="Enter Lastname"/>
                    </div>
                    <div className="form-group">
                        <label>Birthdate</label>
                        <input id="Birthdate" type="date" className="form-control"  placeholder="Enter Birthdate"/>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input id="Address" type="text" className="form-control"  placeholder="Enter Address"/>
                    </div>
                    <div className="form-group">
                        <label>Zipcode</label>
                        <input id="Zipcode" type="text" className="form-control"  placeholder="Enter Zipcode"/>
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <br/>
                        <select id="Country" className="form-control">
                            <option value="#">Select Country</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="France">France</option>
                            <option value="UK">United Kingdom</option>
                            <option value="Germany">Germany</option>
                            <option value="Belgium">Belgium</option>
                        </select>
                    </div>
                    <input type="submit" className="btn btn-default"/>
                </div>
            </form>
            </div>
        )
    }
}