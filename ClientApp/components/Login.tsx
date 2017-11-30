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

    export class Login extends React.Component<RouteComponentProps<{}>, userState> {
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
        handleSubmit(event: any){
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
            }).then(response => response.json() as Promise<Models.User>)
            .then(data => {
                this.setState({ user: data });
            });
            if(this.state.user != '')
            {
                alert("You are logged in");
            }else{
                alert("Something went wrong ");
            }
        }

        render() {
            return (
            <div className="row">
            <form onSubmit={this.handleSubmit}>
                <div className="col-lg-4 col-lg-offset-4">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label>Email address</label>
                        <input name="userEmail" type="email" className="form-control" value={this.state.userEmail}
                         onChange={this.handleEmailChange}  placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input name="userPassword" type="password" className="form-control" value={this.state.userPassword} 
                        onChange={this.handlePasswordChange}  placeholder="******" />
                    </div>
               
                    <input type="submit" className="btn btn-default"  value="Submit"/>
                </div>
            </form>
            </div>
        )
    }
}