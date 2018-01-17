import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import 'isomorphic-fetch';
import { LoginPage } from '../LoginPage';

interface AdminMenuState {
    loading: boolean;
}

export class AdminMenu extends React.Component<RouteComponentProps<{}>, AdminMenuState> {
    constructor() {
        super();
    }

    
    public render() {
        var user = sessionStorage.getItem("user")
        if( user != null){
            var user_json = JSON.parse(user);
            if(user_json.role == 1){
                let contents = AdminMenu.renderMenuItems();
                    
                 return <div className="col-md-2 sidebar">
                    { contents }
                </div>;
            }
            return <div className="row">
            <div className="col-md-10 col-md-offset-1 content">
                <div className=""><h2>You need to be an admin to go here</h2></div>
                <a href="user">Click here to go back to user details</a>
             </div>
            </div>
        }
        return <div className="row">
        <div className="col-md-10 col-md-offset-1 content">
            <div className=""><h2>You need to be authorized to go here</h2></div>
            <a href="login">Click here to login</a>
         </div>
        </div>
    }

    private static renderMenuItems(){
        return <ul className="nav nav-pills nav-stacked">
            <li>
                <a href="/admin/statistics">
                    Statistics
                </a>
            </li>
            <li>
                <a href="/admin/games">
                    Games overview
                </a>
            </li>
            <li>
                <a href="/admin/addGame">
                    Add game
                </a>
            </li>
            <li>
                <a href="/admin/users">
                    Users overview
                </a>
            </li>
            <li>
                <a href="/admin/adduser">
                    Add user
                </a>
            </li>
        </ul>;
    }
}

