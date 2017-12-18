import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as CryptoJS from 'crypto-js';
import * as Models from "../Model";

interface userState{
    userEmail: string;
    userPassword: string;
    user : Models.User | '';
}       

export class Login extends React.Component<{location : string}, userState> {
    constructor(){
        super();

        this.state = {userEmail: '', userPassword:  '', user : ''};

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleEmailChange(event: any){
        this.setState({
            userEmail: event.target.value
        })
    }

    handlePasswordChange(event: any){
        this.setState({
            userPassword: event.target.value
        })

    }
    handleSubmit(event : any){
        event.preventDefault();
        fetch('api/User/Login',{
            method : 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email : this.state.userEmail,
                Password : CryptoJS.SHA256(this.state.userPassword).toString(),
            })
        }).then(this.errorHandler).then(response => response.json() as Promise<Models.User>)
        .then(data => {
            this.setState({ user: data });
            if(this.state.user != '')
            {
                sessionStorage.user = JSON.stringify(this.state.user)
                window.location.href = "/" + this.props.location;
            }
        });
    }
    errorHandler(response:any){
        if(response.status == 200){
            return response;
        }else{
            alert("User/Password combination could not be found");
        }
    }

    render() {
        if(sessionStorage.getItem("user")){
            window.location.href = "/";
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email address</label>
                    <input name="userEmail" type="email" className="form-control" value={this.state.userEmail } minLength={10} maxLength={64}
                        onChange={this.handleEmailChange} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$"  placeholder="Example@example.com" required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="userPassword" type="password" className="form-control" value={this.state.userPassword} 
                    onChange={this.handlePasswordChange} minLength={4} maxLength={30}  placeholder="******" required/>
                </div>
                <input type="submit" className="btn btn-default"  value="Login" />
            </form>
        )
    }
}