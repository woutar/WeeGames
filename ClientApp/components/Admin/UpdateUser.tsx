import * as React from 'react';
import { render } from 'react-dom';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../../Model";
import * as CryptoJS from 'crypto-js';

interface UpdateUserState{
    Id: number;
    Email : string,
    Firstname : string,
    Lastname : string,
    Birthdate : Date,
    Address : string,
    Zipcode : string,
    Country : string,
    City: string,
    Role : number,
}

export class UpdateUser extends React.Component<RouteComponentProps<{id: number}>, UpdateUserState>{
    constructor(props :any){
        super(props);

        this.state ={
            Id: 0,
            Email : '',
            Firstname : '',
            Lastname : '',
            Birthdate : new Date(),
            Address : '',
            Zipcode : '',
            Country : 'Netherlands',
            City : '',
            Role : 0,
        };

        let id = this.props.match.params.id;
        fetch('api/User/GetUser/' + id)
            .then(response => response.json() as Promise<Models.User>)
            .then(data => {
                this.setState({
                     Id: data.id,
                     Email: data.email,
                     Firstname: data.firstname,
                     Lastname: data.lastname,
                     Birthdate: data.birthdate,
                     Address: data.address,
                     Zipcode: data.zipcode,
                     Country: data.country,
                     City: data.city,
                     Role: data.role,
                    });
            });

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
        fetch('api/User/UpdateFullUser',{
            method : 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: this.state.Id,
                Email : this.state.Email,
                Firstname : this.state.Firstname,
                Lastname : this.state.Lastname,
                Birthdate : this.state.Birthdate,
                Address : this.state.Address,
                Zipcode : this.state.Zipcode,
                City : this.state.City,
                Country : this.state.Country,
                Role : this.state.Role
            })
        }); 
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
                        <h2>Update user</h2>
                            <div className="form-group">
                                <label>Email address</label>
                                <input name="Email" type="email" className="form-control" placeholder="Example@example.com" required 
                                 maxLength={64} value={this.state.Email} onChange ={this.handleInputChange} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$"/>
                            </div>
        
                            <div className="form-group">
                                <label>Firstname</label>
                                <input name="Firstname" id="Firstname" type="text" className="form-control"  placeholder="Enter Firstname" required 
                                onChange ={this.handleInputChange} value={this.state.Firstname} maxLength={30}/>
                            </div>
        
                            <div className="form-group">
                                <label>Lastname</label>
                                <input name="Lastname" id="Lastname" type="text" className="form-control"  placeholder="Enter Lastname" required
                                onChange ={this.handleInputChange} value={this.state.Lastname} maxLength={30}/>
                            </div>
                            <div className="form-group">
                                <label>Birthdate</label>
                                <input name="Birthdate" id="Birthdate" type="date" className="form-control"  placeholder="Enter Birthdate" required 
                                onChange ={this.handleInputChange} value="1987-05-13" min="1917-01-01" max="2010-01-01"/>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input name="Address" id="Address" type="text" className="form-control"  placeholder="Enter Address" required
                                onChange ={this.handleInputChange} value={this.state.Address} minLength={10} maxLength={60}/>
                            </div>
                            <div className="form-group">
                                <label>Zipcode</label>
                                <input name="Zipcode" id="Zipcode" type="text" className="form-control"  placeholder="0000AA" required
                                onChange ={this.handleInputChange} value={this.state.Zipcode} pattern= "[0-9]{4}[A-Z]{2}"/>
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input name="City" id="Address" type="text" className="form-control"  placeholder="London" required
                                onChange ={this.handleInputChange} value={this.state.City} minLength={2} maxLength={50}/>
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <br/>
                                <select name="Country" id="Country" className="form-control" value={this.state.Country} onChange ={this.handleInputChange} required>
                                    <option value="">Pick a country</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="France">France</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Belgium">Belgium</option>
                                </select>
                                <br/>
                                <label>User type</label>
                                <select name="Role" id="Role" className="form-control" value={this.state.Role} onChange ={this.handleInputChange} required>
                                    <option value="">Pick a user type</option>
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