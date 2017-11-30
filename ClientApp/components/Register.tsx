import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Model";
import * as CryptoJS from 'crypto-js';

interface PostUserState {
    Email : string,
    Password : any,
    Firstname : string,
    Lastname : string,
    Birthdate : Date,
    Address : string,
    Zipcode : string,
    Country : string,
    Role : number
}

    export class Register extends React.Component<RouteComponentProps<{}>,PostUserState>{
        constructor(){
            super();

            this.state ={
                Email : '',
                Password : '',
                Firstname : '',
                Lastname : '',
                Birthdate : new Date(),
                Address : '',
                Zipcode : '',
                Country : 'Netherlands',
                Role : 0
            };

            this.handleInputChange = this.handleInputChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        handleInputChange(event : any){
            const target = event.target;
            const value = target.value;
            const name = target.name;

            this.setState({
                [name] : value
            });
        }

        handleSubmit(event : any){
            fetch('api/User/Post',{
                method : 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Email : this.state.Email,
                    Password : CryptoJS.SHA256(this.state.Password).toString(),
                    Firstname : this.state.Firstname,
                    Lastname : this.state.Lastname,
                    Birthdate : this.state.Birthdate,
                    Address : this.state.Address,
                    Zipcode : this.state.Zipcode,
                    Country : this.state.Country,
                    Role : this.state.Role
                })
            })
            event.preventDefault();
        }

        
        render() {
            return (
            <div className="row">
            <h2>Register</h2>
            <form method="post" onSubmit={this.handleSubmit}>
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>Email address</label>
                        <input name="Email" id="Email" type="email" className="form-control" placeholder="Enter email" required
                        onChange ={this.handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input name="Password" id="Password" type="password" className="form-control" placeholder="******" 
                        onChange ={this.handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-lg-2" />
                <div className="col-lg-4">
                    <div className="form-group">
                        <label>Firstname</label>
                        <input name="Firstname" id="Firstname" type="text" className="form-control"  placeholder="Enter Firstname"
                        onChange ={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>Lastname</label>
                        <input name="Lastname" id="Lastname" type="text" className="form-control"  placeholder="Enter Lastname"
                        onChange ={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>Birthdate</label>
                        <input name="Birthdate" id="Birthdate" type="date" className="form-control"  placeholder="Enter Birthdate"
                        onChange ={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input name="Address" id="Address" type="text" className="form-control"  placeholder="Enter Address"
                        onChange ={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>Zipcode</label>
                        <input name="Zipcode" id="Zipcode" type="text" className="form-control"  placeholder="Enter Zipcode"
                        onChange ={this.handleInputChange}/>
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <br/>
                        <select name="Country" id="Country" className="form-control" value={this.state.Country} onChange ={this.handleInputChange}>
                            <option value="Netherlands">Netherlands</option>
                            <option value="France">France</option>
                            <option value="UK">United Kingdom</option>
                            <option value="Germany">Germany</option>
                            <option value="Belgium">Belgium</option>
                        </select>
                    </div>
                    <input type="submit" className="btn btn-default" value="Submit"/>
                </div>
            </form>
            </div>
        )
    }
}