import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search } from './Search';
import * as Models from "../Model"

export interface LayoutProps {
    children?: React.ReactNode;
}


export class Layout extends React.Component<LayoutProps,{auth_user : Models.User | null}> {
    constructor() {
        super();
        
        let user_session = sessionStorage.getItem("user");
        if(user_session != null){
            let auth_user = JSON.parse(user_session);
            this.state ={auth_user : auth_user};
        }
    }
    public render() {

        let contents;
        if(sessionStorage.getItem("user") && this.state.auth_user != null){
            contents = Layout.renderLoggedIn(this, this.state.auth_user);
        }else{
            contents = Layout.renderNotLoggedIn();
        }

        return <div>
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#"></a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        {contents}
                    </div>
                </div>
            </nav>
            <div className="container main-container">
                { this.props.children } 
            </div>
        </div>
            
    }

    logOut(){
        sessionStorage.removeItem("user");
    }

    private static renderLoggedIn(self : any, user : Models.User){
        return <ul className="nav navbar-nav navbar-right">
            <li>
                <Search/>
            </li>   
            <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                    My account
                    <span className="caret"></span></a>
                    <ul className="dropdown-menu" role="menu">
                        <li className="dropdown-header">Logged in as: <br />{user.email}</li>          
                        <li className=""><a href="user">Account details</a></li>
                        <li className=""><a href="#">Wishlist</a></li>
                        <li className=""><a href="#">Order history</a></li>
                        <li className=""><a href="admin">Adminpanel</a></li>
                        <li className="divider"></li>
                        <li><a href="" onClick={() => self.logOut()}>Logout</a></li>
                    </ul>
            </li>
            <li>
                <a className="cart-btn" href="/shoppingcart"></a>
            </li>
        </ul>
    }

    private static renderNotLoggedIn(){
        return <ul className="nav navbar-nav navbar-right">
        <li>
            <Search/>
        </li>   
        <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                My account
                <span className="caret"></span></a>
                <ul className="dropdown-menu" role="menu">
                    <li className="dropdown-header">Not logged in</li>
                    <li className=""><a href="admin">Adminpanel</a></li>
                    <li className="divider"></li>
                    <li><a href="Register" >Register</a></li>
                    <li><a href="Login" >Login</a></li>
                </ul>
        </li>
        <li>
            <a className="cart-btn" href="/shoppingcart"></a>
        </li>
    </ul>

    }
}
