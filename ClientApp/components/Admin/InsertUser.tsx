import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../../Model";
import * as CryptoJS from 'crypto-js';


interface PostUserState {
    Email : string;
    Password : any;
    Firstname : string;
    Lastname : string;
    Birthdate : Date;
    Address : string;
    Zipcode : string;
    City: string;
    Country : string;
    Role : number;
    createdUser : Models.User | '';
    userCreated : boolean;
}

export class InsertUser extends React.Component<RouteComponentProps<{}>,PostUserState>{
    constructor(props :any){
        super(props);

        this.state ={
            Email : '',
            Password : '',
            Firstname : '',
            Lastname : '',
            Birthdate : new Date(),
            Address : '',
            Zipcode : '',
            City: '',
            Country : 'Netherlands',
            Role : 0,
            createdUser : '',
            userCreated : false
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
        event.preventDefault();
        fetch('api/User/Register',{
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
                City : this.state.City,
                Country : this.state.Country,
                Role : this.state.Role
            })
        })
        .then(response => response.json() as Promise<Models.User>)
        .then(data => {
            this.setState({ createdUser: data, userCreated : true});
            this.userCreated();
        });
    }

     userCreated(){
        window.location.href = "/admin/users";     
    }

    public render() {
        var user = sessionStorage.getItem("user")
        if( user != null){
            var user_json = JSON.parse(user);
            if(user_json.role == 1){
                return (
        <div className="row">
        <form method="post" onSubmit={this.handleSubmit}>
            <div className="col-lg-4">
                <div className="form-group">
                    <label>Email address</label>
                    <input name="Email" id="Email" type="email" className="form-control" placeholder="Example@example.com" required 
                    minLength={10} maxLength={64} onChange ={this.handleInputChange} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="Password" id="Password" type="password" className="form-control" placeholder="******" required 
                        minLength={4} maxLength={30} onChange ={this.handleInputChange}
                    />
                </div>
            </div>
            <div className="col-lg-2" />
            <div className="col-lg-4">
                <div className="form-group">
                    <label>Firstname</label>
                    <input name="Firstname" id="Firstname" type="text" className="form-control"  placeholder="Enter Firstname" required 
                    onChange ={this.handleInputChange} maxLength={30}/>
                </div>

                <div className="form-group">
                    <label>Lastname</label>
                    <input name="Lastname" id="Lastname" type="text" className="form-control"  placeholder="Enter Lastname" required
                    onChange ={this.handleInputChange} maxLength={30}/>
                </div>
                <div className="form-group">
                    <label>Birthdate</label>
                    <input name="Birthdate" id="Birthdate" type="date" className="form-control"  placeholder="Enter Birthdate" required 
                    onChange ={this.handleInputChange} min="1917-01-01" max="2010-01-01"/>
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input name="Address" id="Address" type="text" className="form-control"  placeholder="Enter Address" required
                    onChange ={this.handleInputChange} minLength={10} maxLength={50}/>
                </div>
                <div className="form-group">
                    <label>Zipcode</label>
                    <input name="Zipcode" id="Zipcode" type="text" className="form-control"  placeholder="0000AA" required
                    onChange ={this.handleInputChange} pattern= "[0-9]{4}[A-Z]{2}"/>
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input name="City" id="Address" type="text" className="form-control"  placeholder="London" required
                    onChange ={this.handleInputChange} minLength={2} maxLength={50}/>
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
                    <br/>
                    <label>User type</label>
                    <select name="Role" id="Role" className="form-control" value={this.state.Role} onChange ={this.handleInputChange}>
                        <option value="0">Regular user</option>
                        <option value="1">Admin</option>
                    </select>
                </div>
            <input type="submit" className="btn btn-default" value="Register"/>
            </div>
            </form>
        </div>
        );
            }
            return null
        }
        return null
    }

}
